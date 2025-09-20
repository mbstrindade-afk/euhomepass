"use client";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignUpDisclaimer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation(["common", "home"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!supabase) {
      setLoading(false);
      setError('Signup is unavailable right now.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/app/dashboard");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/60" onClick={onClose} />
      <div className="relative z-10 max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-2">{t("home:disclaimer_title")}</h3>
        <form onSubmit={handleSignUp} className="flex flex-col gap-3">
          <input
            type="email"
            className="border rounded px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            className="border rounded px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-sm text-slate-600 mb-2">{t("home:disclaimer_text")}</p>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
              checked={accept}
              onChange={e => setAccept(e.target.checked)}
              required
            />
            <span><Trans i18nKey="common:accept_terms" components={[<a key="1" href="#" className="underline" />, <a key="3" href="#" className="underline" />]} /></span>
          </label>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" className="px-4 py-2 rounded-lg border" onClick={onClose}>{t("home:close")}</button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold disabled:bg-slate-200 disabled:text-slate-500"
              disabled={!accept || loading}
            >
              {loading ? t("home:create") + "..." : t("home:create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
