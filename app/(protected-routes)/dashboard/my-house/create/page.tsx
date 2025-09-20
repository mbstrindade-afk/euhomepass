'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../../../../../components/Header';

export default function CreateListing() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para armazenar detalhes da casa
  const [listingData, setListingData] = useState({
    title: '',
    description: '',
    type: 'apartment', // apartment, house, duplex, studio
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    city: '',
    country: '',
    price: {
      amount: 0,
      currency: '€',
      period: 'night' as 'night' | 'month' | 'day',
    },
    amenities: {
      wifi: {
        available: false,
        speed: 0
      },
      washingMachine: false,
      balcony: false,
      lift: false,
      desk: false,
      publicTransport: false,
    },
    entireHome: true,
    hostPresent: false,
    euOnly: false,
    insuranceIncluded: false,
    utilities: {
      feeIncluded: false,
      maxMonthlyFee: 0
    }
  });

  // Estado para armazenar as imagens selecionadas
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Manipulador para seleção de imagens
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limitando a 10 imagens
      const filesToAdd = filesArray.slice(0, 10 - selectedImages.length);
      
      setSelectedImages(prev => [...prev, ...filesToAdd]);
      
      // Criando URLs para preview
      const newPreviewUrls = filesToAdd.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  // Remover imagem da seleção
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    
    // Liberar URL do objeto
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Manipulador para alterações nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      // Manipular campos aninhados (como price.amount)
      const [parent, child] = name.split('.');
      setListingData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      // Campos simples
      setListingData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  // Manipulador para amenities
  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === 'wifi') {
      setListingData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          wifi: {
            ...prev.amenities.wifi,
            available: checked
          }
        }
      }));
    } else {
      setListingData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked
        }
      }));
    }
  };

  // Manipulador para wifi speed
  const handleWifiSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    setListingData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        wifi: {
          ...prev.amenities.wifi,
          speed
        }
      }
    }));
  };

  // Manipulador para checkboxes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setListingData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Manipulador para utilities
  const handleUtilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    
    if (name === 'utilities.feeIncluded') {
      setListingData(prev => ({
        ...prev,
        utilities: {
          ...prev.utilities,
          feeIncluded: checked
        }
      }));
    } else if (name === 'utilities.maxMonthlyFee') {
      setListingData(prev => ({
        ...prev,
        utilities: {
          ...prev.utilities,
          maxMonthlyFee: Number(value)
        }
      }));
    }
  };

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Aqui seria implementada a lógica real de upload das imagens e dados para API
      // Simulando uma operação assíncrona
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Listing data:', listingData);
      console.log('Images to upload:', selectedImages);
      
      // Redirecionamento após sucesso
      router.push('/dashboard/my-house');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Nova Casa</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção de Fotos */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Fotos da Casa</h2>
              <p className="text-sm text-gray-500">Adicione até 10 fotos de qualidade da sua casa. Fotos boas atraem mais interesse!</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200">
                      <Image 
                        src={url} 
                        alt={`Casa preview ${index + 1}`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                {/* Botão para adicionar fotos */}
                {selectedImages.length < 10 && (
                  <div 
                    onClick={() => fileInputRef.current?.click()} 
                    className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="mt-1 text-sm text-gray-500">Adicionar</span>
                    </div>
                  </div>
                )}
              </div>
              
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
            </section>
            
            {/* Informações Básicas */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Informações Básicas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título*</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={listingData.title}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Apartamento aconchegante no centro"
                  />
                </div>
                
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Propriedade*</label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={listingData.type}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="apartment">Apartamento</option>
                    <option value="house">Casa</option>
                    <option value="duplex">Duplex</option>
                    <option value="studio">Estúdio</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">Quartos*</label>
                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="0"
                    required
                    value={listingData.bedrooms}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">Banheiros*</label>
                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="0"
                    step="0.5"
                    required
                    value={listingData.bathrooms}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Área (m²)*</label>
                  <input
                    id="area"
                    name="area"
                    type="number"
                    min="0"
                    required
                    value={listingData.area}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição*</label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={listingData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva sua propriedade com detalhes"
                />
              </div>
            </section>
            
            {/* Localização */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Localização</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Cidade*</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={listingData.city}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">País*</label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    required
                    value={listingData.country}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </section>
            
            {/* Preço */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Preço e Disponibilidade</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="price.amount" className="block text-sm font-medium text-gray-700 mb-1">Valor*</label>
                  <input
                    id="price.amount"
                    name="price.amount"
                    type="number"
                    min="0"
                    required
                    value={listingData.price.amount}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="price.currency" className="block text-sm font-medium text-gray-700 mb-1">Moeda*</label>
                  <select
                    id="price.currency"
                    name="price.currency"
                    required
                    value={listingData.price.currency}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="€">Euro (€)</option>
                    <option value="$">Dólar ($)</option>
                    <option value="£">Libra (£)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="price.period" className="block text-sm font-medium text-gray-700 mb-1">Período*</label>
                  <select
                    id="price.period"
                    name="price.period"
                    required
                    value={listingData.price.period}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="night">Por noite</option>
                    <option value="day">Por dia</option>
                    <option value="month">Por mês</option>
                  </select>
                </div>
              </div>
            </section>
            
            {/* Comodidades */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Comodidades</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <input
                    id="wifi"
                    name="wifi"
                    type="checkbox"
                    checked={listingData.amenities.wifi.available}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="wifi" className="ml-2 block text-sm text-gray-700">Wi-Fi</label>
                </div>
                
                {listingData.amenities.wifi.available && (
                  <div>
                    <label htmlFor="wifiSpeed" className="block text-sm font-medium text-gray-700 mb-1">Velocidade do Wi-Fi (Mbps)</label>
                    <input
                      id="wifiSpeed"
                      name="wifiSpeed"
                      type="number"
                      min="0"
                      value={listingData.amenities.wifi.speed}
                      onChange={handleWifiSpeedChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                
                <div className="flex items-center">
                  <input
                    id="washingMachine"
                    name="washingMachine"
                    type="checkbox"
                    checked={listingData.amenities.washingMachine}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="washingMachine" className="ml-2 block text-sm text-gray-700">Máquina de Lavar</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="balcony"
                    name="balcony"
                    type="checkbox"
                    checked={listingData.amenities.balcony}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="balcony" className="ml-2 block text-sm text-gray-700">Varanda</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="lift"
                    name="lift"
                    type="checkbox"
                    checked={listingData.amenities.lift}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="lift" className="ml-2 block text-sm text-gray-700">Elevador</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="desk"
                    name="desk"
                    type="checkbox"
                    checked={listingData.amenities.desk}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="desk" className="ml-2 block text-sm text-gray-700">Mesa de trabalho</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="publicTransport"
                    name="publicTransport"
                    type="checkbox"
                    checked={listingData.amenities.publicTransport}
                    onChange={handleAmenityChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="publicTransport" className="ml-2 block text-sm text-gray-700">Transporte Público Próximo</label>
                </div>
              </div>
            </section>
            
            {/* Detalhes Adicionais */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700">Detalhes Adicionais</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    id="entireHome"
                    name="entireHome"
                    type="checkbox"
                    checked={listingData.entireHome}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="entireHome" className="ml-2 block text-sm text-gray-700">Casa inteira</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="hostPresent"
                    name="hostPresent"
                    type="checkbox"
                    checked={listingData.hostPresent}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hostPresent" className="ml-2 block text-sm text-gray-700">Anfitrião presente no imóvel</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="euOnly"
                    name="euOnly"
                    type="checkbox"
                    checked={listingData.euOnly}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="euOnly" className="ml-2 block text-sm text-gray-700">Apenas para residentes da UE</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="insuranceIncluded"
                    name="insuranceIncluded"
                    type="checkbox"
                    checked={listingData.insuranceIncluded}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="insuranceIncluded" className="ml-2 block text-sm text-gray-700">Seguro incluído</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="utilities.feeIncluded"
                    name="utilities.feeIncluded"
                    type="checkbox"
                    checked={listingData.utilities.feeIncluded}
                    onChange={handleUtilitiesChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="utilities.feeIncluded" className="ml-2 block text-sm text-gray-700">Contas incluídas no preço</label>
                </div>
                
                {listingData.utilities.feeIncluded && (
                  <div>
                    <label htmlFor="utilities.maxMonthlyFee" className="block text-sm font-medium text-gray-700 mb-1">Limite máximo mensal (% do aluguel)</label>
                    <input
                      id="utilities.maxMonthlyFee"
                      name="utilities.maxMonthlyFee"
                      type="number"
                      min="0"
                      value={listingData.utilities.maxMonthlyFee}
                      onChange={handleUtilitiesChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </section>
            
            {/* Botões de ação */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-blue-600 text-white font-medium rounded-md ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                } transition-colors shadow`}
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Casa'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}