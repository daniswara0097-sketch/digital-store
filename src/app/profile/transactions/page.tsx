
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function TransactionsPage() {
  const token = (await cookies()).get("session")?.value;

  if (!token) redirect("/login");

  const secretValue = process.env.SESSION_SECRET;

  if (!secretValue || secretValue.length < 32) {
    redirect("/login");
  }

  let userId: number | null = null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretValue)
    );

    const id = Number(payload.userId);

    if (Number.isInteger(id) && id > 0) {
      userId = id;
    }
  } catch {
    userId = null;
  }

  if (!userId) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const transactions = await prisma.walletTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <a href="/profile" className="font-black text-blue-600">
          ← DIGITAL STORE
        </a>

        <h1 className="mt-8 text-2xl font-black text-slate-900">
          Riwayat Transaksi
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Semua pesanan dan aktivitas saldo akun kamu.
        </p>

        <section className="mt-8">
          <h2 className="mb-4 text-lg font-bold">
            Riwayat Pesanan
          </h2>

          {orders.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-center text-slate-500">
              Belum ada pesanan.
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border bg-white p-5"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-bold">{order.product.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {order.invoice}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {order.createdAt.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-blue-600">
                        Rp {Number(order.totalPrice).toLocaleString("id-ID")}
                      </p>
                      <p className="mt-2 text-xs font-semibold">
                        {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-9">
          <h2 className="mb-4 text-lg font-bold">
            Aktivitas Saldo
          </h2>

          {transactions.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-center text-slate-500">
              Belum ada aktivitas saldo.
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-2xl border bg-white p-5"
                >
                  <p className="font-bold">{transaction.type}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {transaction.note || "Aktivitas saldo"}
                  </p>
                  <p className="mt-2 font-bold text-blue-600">
                    Rp {Number(transaction.amount).toLocaleString("id-ID")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
