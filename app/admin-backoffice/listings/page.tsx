"use client";
import React, { useEffect, useState } from "react";

interface Listing {
  id: string;
  title: string;
  address?: string;
  approved?: boolean;
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar casas.");
        setLoading(false);
      });
  }, []);

  const handleApprove = async (id: string, approved: boolean) => {
    await fetch("/api/admin/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data: { approved: !approved } }),
    });
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, approved: !approved } : l))
    );
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/listings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestão de Casas</h2>
      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Título</th>
              <th className="px-4 py-2 border">Endereço</th>
              <th className="px-4 py-2 border">Aprovada</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td className="px-4 py-2 border">{listing.title}</td>
                <td className="px-4 py-2 border">{listing.address || "-"}</td>
                <td className="px-4 py-2 border">
                  {listing.approved ? "Sim" : "Não"}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() =>
                      handleApprove(listing.id, !!listing.approved)
                    }
                  >
                    {listing.approved ? "Desaprovar" : "Aprovar"}
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(listing.id)}
                  >
                    Remover
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
