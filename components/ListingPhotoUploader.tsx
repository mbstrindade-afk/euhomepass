"use client";

import React, { useCallback, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase, isSupabaseConfigured } from '../utils/supabaseClient';

interface UploadedPhoto {
  file: File;
  preview: string; // object URL
  uploading: boolean;
  progress: number;
  error?: string;
  publicUrl?: string;
}

interface ListingPhotoUploaderProps {
  value: File[]; // raw files in parent state
  onChange: (files: File[]) => void;
  onUploaded?: (urls: string[]) => void; // callback with public URLs once uploaded
  maxPhotos?: number;
  minPhotos?: number;
}

// Accessible drag & drop area + previews + Supabase upload
const ListingPhotoUploader: React.FC<ListingPhotoUploaderProps> = ({ value, onChange, onUploaded, maxPhotos = 15, minPhotos = 8 }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  // sync internal photo previews if parent already has files (e.g., user navigated back to step)
  useEffect(() => {
    // only add previews for files not yet represented
    if (!value) return;
    setPhotos(prev => {
      if (prev.length === value.length) return prev; // assume in sync
      const mapped: UploadedPhoto[] = value.map(f => ({ file: f, preview: URL.createObjectURL(f), uploading: false, progress: 0 }));
      // revoke old previews
      prev.forEach(p => URL.revokeObjectURL(p.preview));
      return mapped;
    });
  }, [value]);

  const [uploadingAll, setUploadingAll] = useState(false);

  const remaining = maxPhotos - photos.length;
  const hasMinimum = photos.length >= minPhotos;
  const atMax = remaining <= 0;

  const revokePreviews = () => {
    photos.forEach(p => URL.revokeObjectURL(p.preview));
  };

  const handleFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    if (atMax) return; // ignore if already at max
    const files = Array.from(fileList).filter(f => f.type.startsWith('image/'));
    const limited = files.slice(0, Math.max(0, remaining));
    if (!limited.length) return;
    const mapped: UploadedPhoto[] = limited.map(f => ({ file: f, preview: URL.createObjectURL(f), uploading: false, progress: 0 }));
    setPhotos(prev => [...prev, ...mapped]);
    onChange([...(value || []), ...limited]);
  }, [onChange, remaining, value, atMax]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      inputRef.current?.click();
    }
  };

  const removePhoto = (idx: number) => {
    const toRemove = photos[idx];
    URL.revokeObjectURL(toRemove.preview);
    setPhotos(p => p.filter((_, i) => i !== idx));
    const newParent = value.filter((_, i) => i !== idx);
    onChange(newParent);
  };

  const movePhoto = (from: number, to: number) => {
    setPhotos(prev => {
      const copy = [...prev];
      const [spliced] = copy.splice(from, 1);
      copy.splice(to, 0, spliced);
      return copy;
    });
    // Parent value reordering
    const newParent = [...value];
    const [p] = newParent.splice(from, 1);
    newParent.splice(to, 0, p);
    onChange(newParent);
  };

  const uploadAll = async () => {
    if (!photos.length || !isSupabaseConfigured()) return;
    setUploadingAll(true);
    const uploadedUrls: string[] = [];
    for (let i = 0; i < photos.length; i++) {
      setPhotos(prev => prev.map((p, idx) => idx === i ? { ...p, uploading: true, progress: 5 } : p));
      const photo = photos[i];
      // Unique path using timestamp + random
      const ext = photo.file.name.split('.').pop();
      const path = `listing-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { data, error } = await supabase!.storage.from('listing-photos').upload(path, photo.file, {
        upsert: false,
        cacheControl: '3600'
      });
      if (error) {
        setPhotos(prev => prev.map((p, idx) => idx === i ? { ...p, uploading: false, error: error.message } : p));
        continue;
      }
      // Get public URL
      const { data: pub } = supabase!.storage.from('listing-photos').getPublicUrl(data.path);
      uploadedUrls.push(pub.publicUrl);
      setPhotos(prev => prev.map((p, idx) => idx === i ? { ...p, uploading: false, progress: 100, publicUrl: pub.publicUrl } : p));
    }
    setUploadingAll(false);
    if (onUploaded) onUploaded(uploadedUrls);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDrop={onDrop}
        tabIndex={0}
        role="button"
        onKeyDown={onKeyPress}
  className="relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sky-300 bg-sky-50/40 px-6 py-10 text-center outline-none transition focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
  aria-label="Drag and drop photos of your home or click to select"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 15V9a5 5 0 0110 0v6M5 15h14" /></svg>
        <p className="text-sm font-medium text-sky-700">Drag & drop or <button type="button" className="underline" onClick={() => inputRef.current?.click()}>click to upload</button></p>
        <p className="text-xs text-sky-600">Supported formats: JPG, PNG, WEBP. Min {minPhotos}, max {maxPhotos} photos. Prioritize: exterior, living room, kitchen, bedroom, bathroom, workspace.</p>
        {atMax && (
          <p className="mt-2 rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700" role="status">Já atingiu o máximo de {maxPhotos} fotos.</p>
        )}
        {!isSupabaseConfigured() && (
          <p className="mt-2 rounded bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Storage configuration not found. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable upload.</p>
        )}
      </div>

      {photos.length > 0 && (
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className={`text-sm font-medium ${hasMinimum ? 'text-emerald-700' : 'text-amber-700'}`}>
              Preview ({photos.length}/{maxPhotos}) 
              {!hasMinimum && <span className="ml-2 text-xs text-amber-600">- Need {minPhotos - photos.length} more</span>}
              {hasMinimum && <span className="ml-2 text-xs text-emerald-600">✓ Minimum reached</span>}
            </h4>
            <div className="flex gap-2">
              <button type="button" onClick={uploadAll} disabled={uploadingAll || !isSupabaseConfigured()} className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed">{uploadingAll ? 'Uploading...' : 'Upload all'}</button>
              <button type="button" onClick={() => { revokePreviews(); setPhotos([]); onChange([]); }} className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Clear</button>
            </div>
          </div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" aria-label="Uploaded photos list">
            {photos.map((p, idx) => (
              <li key={idx} className="group relative rounded-lg border bg-white p-1 shadow-sm">
                <div className="relative aspect-square w-full overflow-hidden rounded">
                  <Image src={p.preview} alt={`Photo ${idx + 1}`} fill className="object-cover" />
                  {p.uploading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-xs">
                      <span>{p.progress}%</span>
                    </div>
                  )}
                  {p.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-600/70 p-1 text-center text-[10px] font-medium text-white">{p.error}</div>
                  )}
                </div>
                <div className="mt-1 flex items-center justify-between gap-1">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => removePhoto(idx)} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-red-100 hover:text-red-600" aria-label={`Remove photo ${idx + 1}`}>Rm</button>
                    {idx > 0 && (
                      <button type="button" onClick={() => movePhoto(idx, idx - 1)} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200" aria-label={`Move photo ${idx + 1} backward`}>◀</button>
                    )}
                    {idx < photos.length - 1 && (
                      <button type="button" onClick={() => movePhoto(idx, idx + 1)} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200" aria-label={`Move photo ${idx + 1} forward`}>▶</button>
                    )}
                  </div>
                  {p.publicUrl && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">OK</span>}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-[11px] text-gray-500">Tip: Use natural light and keep the lens clean. Recommended order: façade, entry, living room, kitchen, workspace, bedroom(s), bathroom(s), balcony/garden.</p>
        </div>
      )}

      <div className="rounded-md bg-amber-50 p-3 text-xs text-amber-800">
        Photos only become public after review. Avoid showing valuables or personal documents.
      </div>
    </div>
  );
};

export default ListingPhotoUploader;
