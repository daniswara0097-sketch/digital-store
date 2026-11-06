
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token || !process.env.SESSION_SECRET) {
    redirect("/login");
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.SESSION_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      redirect("/profile");
    }
  } catch {
    redirect("/login");
  }

  const [users, products, orders] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.order.count(),
  ]);

  const revenue = await prisma.order.aggregate({
    where: { status: "SUCCESS" },
    _sum: { totalPrice: true },
  });

  const menu = [
    { name: "Manajemen Produk", href: "/admin/products" },
    { name: "Pesanan", href: "/admin/orders" },
    { name: "Supplier API", href: "/admin/suppliers" },
    { name: "Pengguna", href: "/admin/users" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          DIGITAL STORE - Panel Pengelolaan
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Total Pengguna", value: users },
            { title: "Total Produk", value: products },
            { title: "Total Pesanan", value: orders },
            {
              title: "Omzet Pesanan Berhasil",
              value: `Rp ${Number(
                revenue._sum.totalPrice || 0
              ).toLocaleString("id-ID")}`,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">
                {item.title}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900">
                {item.value}
              </h2>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">
            Menu Administrasi
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 p-4 font-medium text-blue-700 hover:bg-blue-50"
              >
                {item.name} →
              </Link>
            ))}
          </div>
        </section>

        <Link
          href="/profile"
          className="mt-6 inline-block text-sm text-slate-600 hover:text-blue-700"
        >
          ← Kembali ke Dashboard Pengguna
        </Link>
      </div>
    </main>
  );
}
