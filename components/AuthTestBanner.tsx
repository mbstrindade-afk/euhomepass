'use client';

import Link from 'next/link';

export default function AuthTestBanner() {
  return (
    <div className="bg-blue-900 py-3 px-6 text-center">
      <Link 
        href="/auth-test" 
        className="inline-block bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded font-medium text-white"
      >
        Testar Sistema de Autenticação
      </Link>
    </div>
  );
}