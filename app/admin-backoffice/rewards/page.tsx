"use client";
import React, { useEffect, useState } from "react";

interface Reward {
  id: string;
  type: string;
  points: number;
  user?: { name?: string; email: string };
}

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newReward, setNewReward] = useState({ userId: "", type: "", points: 0 });

  useEffect(() => {
    fetch("/api/admin/rewards")
      .then((res) => res.json())
      .then((data) => {
        setRewards(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar recompensas.");
        setLoading(false);
      });
  }, []);

  const handleAssign = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/rewards", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: newReward.userId, data: { type: newReward.type, points: newReward.points } }),
    });
    setNewReward({ userId: "", type: "", points: 0 });
    // Recarregar lista
    const res = await fetch("/api/admin/rewards");
    setRewards(await res.json());
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestão de Recompensas</h2>
      <form className="mb-6" onSubmit={handleAssign}>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="ID do Utilizador"
            value={newReward.userId}
            onChange={e => setNewReward(r => ({ ...r, userId: e.target.value }))}
            className="border px-2 py-1 rounded"
            required
          />
          <input
            type="text"
            placeholder="Tipo de recompensa"
            value={newReward.type}
            onChange={e => setNewReward(r => ({ ...r, type: e.target.value }))}
            className="border px-2 py-1 rounded"
            required
          />
          <input
            type="number"
            placeholder="Pontos"
            value={newReward.points}
            onChange={e => setNewReward(r => ({ ...r, points: Number(e.target.value) }))}
            className="border px-2 py-1 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Atribuir</button>
        </div>
      </form>
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
              <th className="px-4 py-2 border">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward) => (
              <tr key={reward.id}>
                <td className="px-4 py-2 border">{reward.user?.name || reward.user?.email || "-"}</td>
                <td className="px-4 py-2 border">{reward.type}</td>
                <td className="px-4 py-2 border">{reward.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
