
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Game");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menambahkan produk.");
      }

      setMessage("Produk berhasil ditambahkan.");
      setName("");
      setPrice("");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-5 text-lg font-bold">
        Tambah Produk Manual
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nama produk"
          required
          className="rounded-lg border p-3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="Game">Game</option>
          <option value="Pulsa">Pulsa</option>
          <option value="Data">Paket Data</option>
          <option value="PLN">Token PLN</option>
          <option value="Voucher">Voucher</option>
          <option value="Lainnya">Lainnya</option>
        </select>

        <input
          type="number"
          min="0"
          step="1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Harga jual (Rp)"
          required
          className="rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Tambah Produk"}
      </button>

      {message && (
        <p className="mt-3 text-sm">{message}</p>
      )}
    </form>
  );
}
