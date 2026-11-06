"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductActions({
  id,
  price,
  isActive,
}: {
  id: number;
  price: number;
  isActive: boolean;
}) {
  const router = useRouter();

  const [newPrice, setNewPrice] = useState(String(price));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function updateProduct(data: Record<string, unknown>) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...data }),
      });

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Respons server bukan JSON (HTTP ${response.status}). Periksa API produk.`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Gagal memperbarui produk."
        );
      }

      setMessage("Berhasil diperbarui.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-w-36 flex-col gap-2">
      <input
        type="number"
        min="0"
        step="1"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        className="w-32 rounded-lg border p-2"
      />

      <button
        disabled={loading}
        onClick={() => {
          const value = Number(newPrice);

          if (!Number.isSafeInteger(value) || value < 0) {
            setMessage("Harga tidak valid.");
            return;
          }

          updateProduct({ price: value });
        }}
        className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Simpan Harga"}
      </button>

      <button
        disabled={loading}
        onClick={() => updateProduct({ isActive: !isActive })}
        className="rounded-lg border px-3 py-2 text-xs font-semibold disabled:opacity-50"
      >
        {isActive ? "Nonaktifkan" : "Aktifkan"}
      </button>

      {message && (
        <p className="max-w-48 text-xs text-slate-600">
          {message}
        </p>
      )}
    </div>
  );
}