
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./logoutbutton";

export const instant = false;

export default async function ProfilePage() {
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

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      balance: true,
    },
  });

  if (!user) redirect("/login");

  const menus = [
    {
      name: "Top Up Game",
      description: "Mobile Legends, Free Fire, PUBG",
      icon: "🎮",
      href: "/topup",
      active: true,
    },
    {
      name: "Pulsa & Paket Data",
      description: "Isi pulsa dan internet",
      icon: "📱",
      href: "#",
      active: false,
    },
    {
      name: "Token PLN",
      description: "Pembelian token listrik",
      icon: "⚡",
      href: "#",
      active: false,
    },
    {
      name: "Voucher Digital",
      description: "Berbagai voucher digital",
      icon: "🎁",
      href: "#",
      active: false,
    },
    {
  name: "Riwayat Transaksi",
  description: "Lihat pesanan kamu",
  icon: "🧾",
  href: "/profile/transactions",
  active: true,
    },
    {
      name: "Pengaturan Profil",
      description: "Informasi akun kamu",
      icon: "👤",
      href: "#",
      active: false,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="text-xl font-black text-blue-600">
            DIGITAL STORE.
          </a>
          <span className="text-sm font-semibold text-slate-500">
            Dashboard Pelanggan
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <div>
          <p className="text-sm text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            Halo, {user.name}! 👋
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Selamat datang kembali di DIGITAL STORE.
          </p>
        </div>

        <section className="mt-7 rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
          <p className="text-sm text-blue-100">Saldo akun kamu</p>
          <h2 className="mt-2 text-3xl font-black">
            Rp {Number(user.balance).toLocaleString("id-ID")}
          </h2>
          <p className="mt-3 text-sm text-blue-100">
            {user.email}
          </p>
        </section>

        <section className="mt-9">
          <h2 className="text-lg font-bold text-slate-900">
            Layanan Digital
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menus.map((menu) => (
              <div
                key={menu.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-3xl">{menu.icon}</div>
                <h3 className="mt-4 font-bold text-slate-900">
                  {menu.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {menu.description}
                </p>

                {menu.active ? (
                  <a
                    href={menu.href}
                    className="mt-5 block rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                  >
                    Buka Layanan
                  </a>
                ) : (
                  <div className="mt-5 rounded-xl bg-slate-100 py-3 text-center text-sm font-semibold text-slate-400">
                    Segera Hadir
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-5">
          <h2 className="font-bold text-slate-900">Informasi Akun</h2>
          <p className="mt-2 text-sm text-slate-500">
            Nama: {user.name}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Email: {user.email}
          </p>
          <LogoutButton />
        </section>
      </div>
    </main>
  );
}
