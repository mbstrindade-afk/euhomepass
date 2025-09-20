"use client";
import { useTranslation } from "react-i18next";

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const toggle = () => {
    i18n.changeLanguage(i18n.language === "pt" ? "en" : "pt");
  };
  return (
    <button
      onClick={toggle}
      className="ml-2 px-2 py-1 rounded text-xs border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring"
      aria-label={i18n.language === "pt" ? "Mudar para inglês" : "Switch to Portuguese"}
    >
      {i18n.language === "pt" ? "EN" : "PT"}
    </button>
  );
}
