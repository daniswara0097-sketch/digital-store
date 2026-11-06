
import ProductActions from "./product-actions";
import AddProduct from "./add-product";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Product } from "@prisma/client";

export const instant = false;

export default async function ProductsPage() {
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

  const products: Product[] = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Kembali ke Admin Dashboard
        </Link>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Manajemen Produk
            </h1>
            <p className="mt-1 text-slate-500">
              Kelola produk DIGITAL STORE.
            </p>
          </div>

          <span className="rounded-lg bg-blue-100 px-4 py-2 font-semibold text-blue-700">
            {products.length} Produk
          </span>
        </div>

        <AddProduct />

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
          {products.length === 0 ? (
            <div className="p-10 text-center">
              <div className="text-4xl">📦</div>
              <h2 className="mt-3 text-lg font-bold">
                Belum Ada Produk
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Produk dari MeloStore dan Dwigital akan
                ditampilkan di sini setelah disinkronkan.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="p-4">Nama Produk</th>
                    <th className="p-4">Supplier</th>
                    <th className="p-4">Harga Modal</th>
                    <th className="p-4">Harga Jual</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product: Product) => (
                    <tr
                      key={product.id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 font-medium">
                        {product.name}
                      </td>

                      <td className="p-4">
                        {product.supplier}
                      </td>

                      <td className="p-4">
                        {formatRupiah(Number(product.supplierPrice))}
                      </td>

                      <td className="p-4 font-semibold">
                        {formatRupiah(Number(product.price))}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>

                      <td className="p-4">
                        <ProductActions
                          id={product.id}
                          price={Number(product.price)}
                          isActive={product.isActive}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
