
"use client";

import { useState } from "react";

const packages = [
  { diamond: "86 Diamonds", price: 20000 },
  { diamond: "172 Diamonds", price: 39000 },
  { diamond: "257 Diamonds", price: 58000 },
  { diamond: "344 Diamonds", price: 77000 },
  { diamond: "514 Diamonds", price: 115000 },
  { diamond: "706 Diamonds", price: 155000 },
];

export default function TopupPage() {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selected, setSelected] = useState(0);
  const [payment, setPayment] = useState("QRIS");
  const [showSummary, setShowSummary] = useState(false);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="font-bold text-blue-600">
          ← Kembali ke Beranda
        </a>

        <div className="mt-7">
          <h1 className="text-3xl font-black">Top Up Mobile Legends</h1>
          <p className="mt-2 text-slate-500">
            Pilih diamond dan isi data akun game kamu.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <section className="space-y-6 md:col-span-2">
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">1. Masukkan Data Akun</h2>

              <label className="mt-5 block text-sm font-semibold">
                User ID
              </label>
              <input
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Contoh: 123456789"
                className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />

              <label className="mt-4 block text-sm font-semibold">
                Zone ID / Server ID
              </label>
              <input
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                placeholder="Contoh: 1234"
                className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">2. Pilih Nominal Diamond</h2>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {packages.map((item, index) => (
                  <button
                    key={item.diamond}
                    onClick={() => setSelected(index)}
                    className={`rounded-xl border p-4 text-left transition ${
                      selected === index
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-2xl">💎</div>
                    <p className="mt-2 font-bold">{item.diamond}</p>
                    <p className="mt-1 text-sm text-blue-600">
                      {formatPrice(item.price)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">3. Metode Pembayaran</h2>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {["QRIS", "Transfer Bank", "E-Wallet"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPayment(method)}
                    className={`rounded-xl border p-4 font-semibold ${
                      payment === method
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-slate-200"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border bg-white p-6">
            <h2 className="text-lg font-bold">Ringkasan Pesanan</h2>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Produk</span>
                <span className="font-semibold">Mobile Legends</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Nominal</span>
                <span className="font-semibold">
                  {packages[selected].diamond}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-slate-500">Pembayaran</span>
                <span className="font-semibold">{payment}</span>
              </div>
              <div className="border-t pt-4">
                <p className="text-slate-500">Total pembayaran</p>
                <p className="mt-1 text-2xl font-black text-blue-600">
                  {formatPrice(packages[selected].price)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSummary(true)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
            >
              Lanjutkan Pesanan
            </button>

            {showSummary && (
              <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm">
                {userId.trim() && serverId.trim() ? (
                  <>
                    <p className="font-bold text-blue-700">
                      Data pesanan siap!
                    </p>
                    <p className="mt-2">User ID: {userId}</p>
                    <p>Server ID: {serverId}</p>
                    <p className="mt-2 text-slate-600">
                      Ini hanya simulasi. Belum ada pembayaran atau transaksi
                      sungguhan.
                    </p>
                  </>
                ) : (
                  <p className="font-semibold text-red-600">
                    Lengkapi User ID dan Server ID terlebih dahulu.
                  </p>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
