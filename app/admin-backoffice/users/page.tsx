
"use client";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name?: string;
  email: string;
  isAdmin: boolean;
  blocked?: boolean;
  createdAt?: string;
  passes?: Pass[];
}

interface Pass {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  pricePaid: number;
  renewed: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then(async (data) => {
        // Para cada usuário, buscar passes
        const usersWithPasses = await Promise.all(
          data.map(async (user: User) => {
            const passesRes = await fetch(`/api/admin/passes?userId=${user.id}`);
            const passes = passesRes.ok ? await passesRes.json() : [];
            return { ...user, passes };
          })
        );
        setUsers(usersWithPasses);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar utilizadores.");
        setLoading(false);
      });
  }, []);

  const handleToggleAdmin = async (id: string, isAdmin: boolean) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data: { isAdmin: !isAdmin } }),
    });
    setUsers((prev) => prev.map(u => u.id === id ? { ...u, isAdmin: !isAdmin } : u));
  };

  const handleBlock = async (id: string, blocked: boolean) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, data: { blocked: !blocked } }),
    });
    setUsers((prev) => prev.map(u => u.id === id ? { ...u, blocked: !blocked } : u));
  };


  const handleResetPassword = async (id: string) => {
    const newPassword = prompt("Nova password para este utilizador:");
    if (!newPassword || newPassword.length < 8) {
      alert("A password deve ter pelo menos 8 caracteres.");
      return;
    }
    const res = await fetch("/api/admin/users/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newPassword }),
    });
    if (res.ok) {
      alert("Password redefinida com sucesso!");
    } else {
      alert("Erro ao redefinir password.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Gestão de Utilizadores</h2>
      {loading ? (
        <p>A carregar...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Admin</th>
              <th className="px-4 py-2 border">Bloqueado</th>
              <th className="px-4 py-2 border">Data de Admissão</th>
              <th className="px-4 py-2 border">Data de Pagamento</th>
              <th className="px-4 py-2 border">Pagamento ativo até</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              // Pega o passe mais recente
              const latestPass = user.passes && user.passes.length > 0
                ? user.passes.reduce((a, b) => new Date(a.endDate) > new Date(b.endDate) ? a : b)
                : null;
              return (
                <tr key={user.id}>
                  <td className="px-4 py-2 border">{user.name || "-"}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.isAdmin ? "Sim" : "Não"}</td>
                  <td className="px-4 py-2 border">{user.blocked ? "Sim" : "Não"}</td>
                  <td className="px-4 py-2 border">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 border">{latestPass ? new Date(latestPass.startDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 border">{latestPass ? new Date(latestPass.endDate).toLocaleDateString() : "-"}</td>
                  <td className="px-4 py-2 border space-x-2">
                    <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleToggleAdmin(user.id, user.isAdmin)}>
                      {user.isAdmin ? "Remover Admin" : "Definir Admin"}
                    </button>
                    <button className="bg-yellow-600 text-white px-2 py-1 rounded" onClick={() => handleBlock(user.id, !!user.blocked)}>
                      {user.blocked ? "Desbloquear" : "Bloquear"}
                    </button>
                    <button className="bg-amber-600 text-white px-2 py-1 rounded" onClick={() => handleResetPassword(user.id)}>
                      Reset Password
                    </button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(user.id)}>
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
