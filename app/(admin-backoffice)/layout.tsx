import React from "react";
import Link from "next/link";

export default function AdminBackofficeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">EU HomePass Backoffice</h1>
        <nav className="space-x-6">
          <Link href="/admin-backoffice/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/admin-backoffice/users" className="hover:underline">Utilizadores</Link>
          <Link href="/admin-backoffice/listings" className="hover:underline">Casas</Link>
          <Link href="/admin-backoffice/complaints" className="hover:underline">Reclamações</Link>
          <Link href="/admin-backoffice/passes" className="hover:underline">Passes</Link>
          <Link href="/admin-backoffice/rewards" className="hover:underline">Recompensas</Link>
        </nav>
      </header>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
