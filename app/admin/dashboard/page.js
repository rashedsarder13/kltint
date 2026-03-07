"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const BRANCH_OPTIONS = [
  "all",
  "Kota Damansara",
  "Maluri Cheras",
  "Setia Alam",
  "Puchong",
];

const STATUS_OPTIONS = ["all", "confirmed", "completed", "cancelled"];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState("all");
  const [status, setStatus] = useState("all");

  const token = typeof window !== "undefined" ? sessionStorage.getItem("adminToken") : null;

  const fetchAppointments = useCallback(async () => {
    if (!token) {
      router.push("/admin");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({ branch, status });
      const response = await fetch(`/api/appointments?${params.toString()}`, {
        headers: { "x-admin-token": token },
      });
      const data = await response.json();

      if (!data.success && response.status === 401) {
        sessionStorage.removeItem("adminToken");
        router.push("/admin");
        return;
      }

      setAppointments(data.appointments || []);
    } finally {
      setLoading(false);
    }
  }, [branch, status, token, router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const stats = useMemo(() => {
    return {
      total: appointments.length,
      confirmed: appointments.filter((item) => item.status === "confirmed").length,
      completed: appointments.filter((item) => item.status === "completed").length,
      cancelled: appointments.filter((item) => item.status === "cancelled").length,
    };
  }, [appointments]);

  const onLogout = () => {
    sessionStorage.removeItem("adminToken");
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <header className="border-b border-[#232327] bg-[#131317] px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Appointments Dashboard</h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin/dashboard" className="text-[#d4af37]">Appointments</Link>
          <Link href="/admin/dashboard/promo" className="text-gray-300">Promo Codes</Link>
          <button onClick={onLogout} className="text-red-400">Logout</button>
        </div>
      </header>

      <section className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={stats.total} />
          <StatCard label="Confirmed" value={stats.confirmed} />
          <StatCard label="Completed" value={stats.completed} />
          <StatCard label="Cancelled" value={stats.cancelled} />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
            className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2 text-sm"
          >
            {BRANCH_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All branches" : option}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-[#35353d] bg-[#1c1c21] px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All statuses" : option}
              </option>
            ))}
          </select>

          <button
            onClick={fetchAppointments}
            className="rounded-lg bg-[#d4af37] px-4 py-2 text-sm font-semibold text-black"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#2f2f36]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#15151a] text-gray-300">
              <tr>
                <th className="px-3 py-3 text-left">Date</th>
                <th className="px-3 py-3 text-left">Time</th>
                <th className="px-3 py-3 text-left">Branch</th>
                <th className="px-3 py-3 text-left">Customer</th>
                <th className="px-3 py-3 text-left">Service</th>
                <th className="px-3 py-3 text-left">Package</th>
                <th className="px-3 py-3 text-right">Total</th>
                <th className="px-3 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-gray-400">
                    Loading appointments...
                  </td>
                </tr>
              )}
              {!loading && appointments.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-gray-400">
                    No appointments found.
                  </td>
                </tr>
              )}
              {!loading &&
                appointments.map((item) => (
                  <tr key={item.id} className="border-t border-[#25252b]">
                    <td className="px-3 py-3">{item.date}</td>
                    <td className="px-3 py-3">{item.timeSlot}</td>
                    <td className="px-3 py-3">{item.branch}</td>
                    <td className="px-3 py-3">
                      <div>{item.customerName}</div>
                      <div className="text-xs text-gray-400">{item.customerPhone}</div>
                    </td>
                    <td className="px-3 py-3 capitalize">{item.service}</td>
                    <td className="px-3 py-3">{item.package}</td>
                    <td className="px-3 py-3 text-right text-[#d4af37] font-semibold">
                      RM {Number(item.totalPaid || item.price || 0).toFixed(2)}
                    </td>
                    <td className="px-3 py-3">
                      <span className="rounded bg-[#212127] px-2 py-1 text-xs uppercase">
                        {item.status}
                      </span>
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

function StatCard({ label, value }) {
  return (
    <article className="rounded-xl border border-[#2f2f36] bg-[#15151a] p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </article>
  );
}
