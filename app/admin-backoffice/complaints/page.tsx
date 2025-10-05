"use client";
import React, { useEffect, useState } from "react";

interface Complaint {
  id: string;
  title: string;
  message: string;
  status: string;
  user?: { name?: string; email: string };
}

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/complaints")
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar reclamações.");
        setLoading(false);
      });
  }, []);

  const handleStatus = async (id: string, status: string) => {
    const newStatus = status === "pending" ? "closed" : "pending";
    await fetch("/api/admin/complaints", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data: { status: newStatus } }),
    });
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestão de Reclamações</h2>
      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Título</th>
              <th className="px-4 py-2 border">Mensagem</th>
              <th className="px-4 py-2 border">Utilizador</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="px-4 py-2 border">{complaint.title}</td>
                <td className="px-4 py-2 border">{complaint.message}</td>
                <td className="px-4 py-2 border">
                  {complaint.user?.name || complaint.user?.email || "-"}
                </td>
                <td className="px-4 py-2 border">{complaint.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded"
                    onClick={() =>
                      handleStatus(complaint.id, complaint.status)
                    }
                  >
                    {complaint.status === "pending" ? "Fechar" : "Reabrir"}
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
