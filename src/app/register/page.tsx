
"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Pendaftaran gagal.");
        return;
      }

      setMessage("Pendaftaran berhasil! Silakan masuk.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
        <a href="/" className="text-xl font-black text-blue-600">
          DIGITAL STORE.
        </a>

        <h1 className="mt-8 text-3xl font-black">Buat Akun</h1>
        <p className="mt-2 text-sm text-slate-500">
          Daftar untuk mulai berbelanja.
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold">Nama Lengkap</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama"
              className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Konfirmasi Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi password"
              className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
            />
          </div>

          {message && (
            <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Daftar Sekarang"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <a href="/login" className="font-bold text-blue-600">
            Masuk
          </a>
        </p>

        <a href="/" className="mt-6 block text-center text-sm text-slate-400">
          ← Kembali ke Beranda
        </a>
      </div>
    </main>
  );
}
