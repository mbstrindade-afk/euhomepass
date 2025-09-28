import React from "react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Dashboard Administrativo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold">Utilizadores</h3>
          <p>Gestão de contas, permissões e bloqueios.</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold">Casas</h3>
          <p>Aprovação, edição e remoção de listings.</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h3 className="font-semibold">Reclamações</h3>
          <p>Moderação e resposta a tickets de suporte.</p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold">Estatísticas Gerais</h3>
        <ul className="list-disc ml-6">
          <li>Total de utilizadores</li>
          <li>Total de casas</li>
          <li>Reclamações pendentes</li>
          <li>Passes ativos</li>
        </ul>
      </div>
    </div>
  );
}
