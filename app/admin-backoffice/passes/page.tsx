"use client";
import React, { useEffect, useState } from "react";

interface Pass {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  renewed: boolean;
  user?: { name?: string; email: string };
}

export default function AdminPassesPage() {
  const [passes, setPasses] = useState<Pass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/passes")
      .then((res) => res.json())
      .then((data) => {
        setPasses(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar passes.");
        setLoading(false);
      });
  }, []);

  const handleRenew = async (id: string, renewed: boolean) => {
    await fetch("/api/admin/passes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data: { renewed: !renewed } }),
    });
    setPasses((prev) => prev.map(p => p.id === id ? { ...p, renewed: !renewed } : p));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestão de Passes</h2>
      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Utilizador</th>
              <th className="px-4 py-2 border">Tipo</th>
              <th className="px-4 py-2 border">Início</th>
              <th className="px-4 py-2 border">Fim</th>
              <th className="px-4 py-2 border">Renovado</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {passes.map((pass) => (
              <tr key={pass.id}>
                <td className="px-4 py-2 border">{pass.user?.name || pass.user?.email || "-"}</td>
                <td className="px-4 py-2 border">{pass.type}</td>
                <td className="px-4 py-2 border">{new Date(pass.startDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{new Date(pass.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border">{pass.renewed ? "Sim" : "Não"}</td>
                <td className="px-4 py-2 border">
                  <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => handleRenew(pass.id, pass.renewed)}>
                    {pass.renewed ? "Cancelar Renovação" : "Renovar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
