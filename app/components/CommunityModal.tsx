"use client";

import { useEffect, type ReactNode } from "react";
import Image from "next/image";
import { CommunityItem } from "../types";

interface CommunityModalProps {
  item: CommunityItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommunityModal({ item, isOpen, onClose }: CommunityModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Image 
              src={item.icon} 
              alt={item.title} 
              width={40} 
              height={40} 
              className="w-10 h-10"
            />
            <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">{item.text}</p>
          
          {/* Metric */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm font-medium text-gray-500 mb-1">Estatística atual</div>
            <div className="text-lg font-bold text-gray-900">{item.metric}</div>
          </div>

          {/* Additional Details based on item */}
          {getAdditionalDetails(item.title)}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              // Aqui pode adicionar lógica para ação específica do item
              onClose();
            }}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Saber mais
          </button>
        </div>
      </div>
    </div>
  );
}

function getAdditionalDetails(title: string) {
  const details: Record<string, ReactNode> = {
    "Confiança": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Processo de Verificação</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>Verificação de identidade com documentos oficiais</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>Confirmação de residência na UE</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 mt-1">✓</span>
            <span>Validação de propriedade ou arrendamento</span>
          </li>
        </ul>
      </div>
    ),
    "Comunidade": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Rede Europeia</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded">🇵🇹 Portugal</div>
          <div className="bg-blue-50 p-2 rounded">🇪🇸 Espanha</div>
          <div className="bg-blue-50 p-2 rounded">🇫🇷 França</div>
          <div className="bg-blue-50 p-2 rounded">🇩🇪 Alemanha</div>
          <div className="bg-blue-50 p-2 rounded">🇮🇹 Itália</div>
          <div className="bg-blue-50 p-2 rounded">🇳🇱 Holanda</div>
        </div>
      </div>
    ),
    "Fundo/Seguro": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Cobertura Incluída</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Danos físicos</span>
            <span className="font-medium">até €1.000</span>
          </div>
          <div className="flex justify-between">
            <span>Consumos anormais</span>
            <span className="font-medium">análise caso a caso</span>
          </div>
          <div className="flex justify-between">
            <span>Processo</span>
            <span className="font-medium">24-48h</span>
          </div>
        </div>
      </div>
    ),
    "Económico": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Poupança Estimada</h3>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-700">€500-800</div>
          <div className="text-sm text-green-600">poupança média por mês vs. alojamento tradicional</div>
        </div>
      </div>
    ),
    "Feedback": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Avaliações da Comunidade</h3>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <span className="text-lg font-bold">4.8/5</span>
          <span className="text-sm text-gray-500">(1,247 avaliações)</span>
        </div>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between">
            <span>NPS Score</span>
            <span className="font-medium text-green-600">+62</span>
          </div>
        </div>
      </div>
    ),
    "Transparência": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Preços Fixos</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Quarterly Pass</span>
            <span className="text-lg font-bold text-emerald-600">€90</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium">Annual Pass</span>
            <span className="text-lg font-bold text-emerald-600">€270</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Sem comissões ocultas ou taxas adicionais</p>
      </div>
    ),
    "Privacidade RGPD": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Conformidade RGPD</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">🔒</span>
            <span>Dados armazenados exclusivamente na UE</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">🔒</span>
            <span>Encriptação end-to-end</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">🔒</span>
            <span>Zero incidentes de segurança</span>
          </li>
        </ul>
      </div>
    ),
    "Reciprocidade": (
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Sistema de Equilíbrio</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">1:1</div>
            <div className="text-sm text-blue-600">Rácio médio da comunidade</div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Mantém um equilíbrio justo entre meses disponibilizados e usufruídos 
          numa janela móvel de 12 meses.
        </p>
      </div>
    ),
  };

  return details[title] || null;
}
