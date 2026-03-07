"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const INITIAL_FORM = {
  code: "",
  type: "percentage",
  value: "",
  usageLimit: "0",
  minOrderAmount: "0",
  validFrom: "",
  validUntil: "",
};

export default function PromoDashboardPage() {
  const router = useRouter();
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;

  const fetchPromos = useCallback(async () => {
    if (!token) {
      router.push("/admin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/promo", {
        headers: { "x-admin-token": token },
      });
      const data = await response.json();

      if (!data.success && response.status === 401) {
        sessionStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      setPromos(data.promos || []);
    } finally {
      setLoading(false);
    }
  }, [router, token]);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  const onCreate = async (event) => {
    event.preventDefault();
    await fetch("/api/promo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify(formData),
    });
    setFormData(INITIAL_FORM);
    fetchPromos();
  };

  const onToggle = async (id, active) => {
    await fetch("/api/promo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ id, active: !active }),
    });
    fetchPromos();
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this promo code?")) return;
    await fetch("/api/promo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token,
      },
      body: JSON.stringify({ id }),
    });
    fetchPromos();
  };

  const onLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <header className="border-b border-[#232327] bg-[#131317] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Promo Codes</h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin/dashboard" className="text-gray-300">Appointments</Link>
          <Link href="/admin/dashboard/promo" className="text-[#d4af37]">Promo Codes</Link>
          <button onClick={onLogout} className="text-red-400">Logout</button>
        </div>
      </header>

      <section className="p-6 space-y-6">
        <form onSubmit={onCreate} className="rounded-xl border border-[#2f2f36] bg-[#15151a] p-4">
          <h2 className="text-lg font-semibold mb-3">Create Promo</h2>
          <div className="grid gap-3 md:grid-cols-4">
            <input
              required
              placeholder="Code"
              value={formData.code}
              onChange={(event) => setFormData({ ...formData, code: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <select
              value={formData.type}
              onChange={(event) => setFormData({ ...formData, type: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
            <input
              type="number"
              required
              placeholder="Value"
              value={formData.value}
              onChange={(event) => setFormData({ ...formData, value: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <input
              type="number"
              placeholder="Usage Limit"
              value={formData.usageLimit}
              onChange={(event) => setFormData({ ...formData, usageLimit: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <input
              type="number"
              placeholder="Min Amount"
              value={formData.minOrderAmount}
              onChange={(event) =>
                setFormData({ ...formData, minOrderAmount: event.target.value })
              }
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <input
              type="date"
              value={formData.validFrom}
              onChange={(event) => setFormData({ ...formData, validFrom: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <input
              type="date"
              value={formData.validUntil}
              onChange={(event) => setFormData({ ...formData, validUntil: event.target.value })}
              className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#d4af37] px-4 py-2 font-semibold text-black"
            >
              Save Promo
            </button>
          </div>
        </form>

        <div className="overflow-x-auto rounded-xl border border-[#2f2f36]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#15151a] text-gray-300">
              <tr>
                <th className="px-3 py-3 text-left">Code</th>
                <th className="px-3 py-3 text-left">Type</th>
                <th className="px-3 py-3 text-left">Value</th>
                <th className="px-3 py-3 text-left">Used</th>
                <th className="px-3 py-3 text-left">Active</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                    Loading promo codes...
                  </td>
                </tr>
              )}
              {!loading && promos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-3 py-8 text-center text-gray-400">
                    No promo codes yet.
                  </td>
                </tr>
              )}
              {!loading &&
                promos.map((promo) => (
                  <tr key={promo.id} className="border-t border-[#25252b]">
                    <td className="px-3 py-3 font-semibold">{promo.code}</td>
                    <td className="px-3 py-3">{promo.type}</td>
                    <td className="px-3 py-3">
                      {promo.type === "percentage" ? `${promo.value}%` : `RM ${promo.value}`}
                    </td>
                    <td className="px-3 py-3">
                      {(promo.usedCount || 0)}/{promo.usageLimit || "inf"}
                    </td>
                    <td className="px-3 py-3">{promo.active ? "Yes" : "No"}</td>
                    <td className="px-3 py-3 text-right">
                      <button
                        onClick={() => onToggle(promo.id, promo.active)}
                        className="mr-3 text-yellow-300"
                      >
                        {promo.active ? "Disable" : "Enable"}
                      </button>
                      <button onClick={() => onDelete(promo.id)} className="text-red-400">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
