
const products = [
  {
    name: "Mobile Legends",
    description: "Top up Diamond MLBB",
    icon: "💎",
    price: "Mulai Rp20.000",
  },
  {
    name: "Free Fire",
    description: "Top up Diamond FF",
    icon: "🔥",
    price: "Mulai Rp15.000",
  },
  {
    name: "PUBG Mobile",
    description: "Top up UC PUBG",
    icon: "🎯",
    price: "Mulai Rp16.000",
  },
  {
    name: "Pulsa",
    description: "Pulsa semua operator",
    icon: "📱",
    price: "Berbagai nominal",
  },
  {
    name: "Paket Data",
    description: "Internet semua operator",
    icon: "🌐",
    price: "Berbagai pilihan",
  },
  {
    name: "Token PLN",
    description: "Token listrik prabayar",
    icon: "⚡",
    price: "Berbagai nominal",
  },
];

const categories = [
  ["🎮", "Top Up Game"],
  ["📱", "Pulsa"],
  ["🌐", "Paket Data"],
  ["⚡", "Token PLN"],
  ["🎟️", "Voucher"],
  ["📦", "Produk Digital"],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="text-2xl font-black text-blue-600">
            DIGITAL<span className="text-slate-900">STORE.</span>
          </a>

          <nav className="hidden gap-7 text-sm font-semibold md:flex">
            <a href="/" className="text-blue-600">Beranda</a>
            <a href="#kategori" className="hover:text-blue-600">Kategori</a>
            <a href="#produk" className="hover:text-blue-600">Produk</a>
            <a href="/topup" className="hover:text-blue-600">Top Up</a>
          </nav>

          <div className="flex gap-2">
            <a href="/login" className="rounded-xl border border-blue-600 px-4 py-2 text-sm font-bold text-blue-600">
              Masuk
            </a>
            <a href="/register" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white">
              Daftar
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-xs font-bold text-blue-700">
            ⚡ PLATFORM PRODUK DIGITAL
          </span>

          <h1 className="mt-7 text-4xl font-black leading-tight md:text-6xl">
            Semua Kebutuhan Digital
            <span className="text-blue-600"> Ada di Sini.</span>
          </h1>

          <p className="mt-5 max-w-lg leading-7 text-slate-500">
            Top up game, pulsa, paket data, token listrik dan berbagai
            kebutuhan digital lainnya dengan mudah.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#produk" className="rounded-xl bg-blue-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700">
              Mulai Belanja →
            </a>
            <a href="/topup" className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 font-bold hover:border-blue-500">
              Top Up Game
            </a>
          </div>

          <div className="mt-10 flex gap-8">
            <div>
              <p className="text-2xl font-black text-blue-600">24/7</p>
              <p className="text-xs text-slate-500">Akses online</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">Mudah</p>
              <p className="text-xs text-slate-500">Proses pemesanan</p>
            </div>
            <div>
              <p className="text-2xl font-black text-blue-600">Digital</p>
              <p className="text-xs text-slate-500">Semua kebutuhan</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 p-8 text-white shadow-2xl md:p-12">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <p className="relative text-sm font-bold tracking-widest text-blue-200">
            DIGITAL STORE
          </p>
          <h2 className="relative mt-6 text-3xl font-black md:text-5xl">
            Belanja Digital Jadi Lebih Praktis.
          </h2>
          <p className="relative mt-4 leading-7 text-blue-100">
            Temukan produk favoritmu dalam satu platform.
          </p>
          <div className="relative mt-10 grid grid-cols-4 gap-3 text-center text-3xl">
            {["🎮", "💎", "⚡", "📱"].map((icon) => (
              <div key={icon} className="rounded-2xl bg-white/10 p-4">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KATEGORI */}
      <section id="kategori" className="mx-auto max-w-7xl px-5 py-12">
        <h2 className="text-2xl font-black">Kategori</h2>
        <p className="mt-2 text-sm text-slate-500">
          Pilih kategori produk yang kamu butuhkan.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(([icon, name]) => (
            <a
              key={name}
              href="/topup"
              className="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg"
            >
              <div className="text-3xl">{icon}</div>
              <p className="mt-4 text-sm font-bold">{name}</p>
              <p className="mt-2 text-xs text-blue-600">Lihat produk →</p>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="mx-auto max-w-7xl px-5 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-black">Produk Pilihan</h2>
            <p className="mt-2 text-sm text-slate-500">
              Temukan produk digital favoritmu.
            </p>
          </div>
          <a href="/topup" className="text-sm font-bold text-blue-600">
            Lihat semua →
          </a>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-6"
            >
              <div className="flex h-24 items-center justify-center rounded-xl bg-blue-50 text-5xl">
                {product.icon}
              </div>

              <h3 className="mt-5 font-black">{product.name}</h3>
              <p className="mt-1 text-xs text-slate-500">
                {product.description}
              </p>

              <p className="mt-4 font-bold text-blue-600">
                {product.price}
              </p>

              <a
                href="/topup"
                className="mt-5 block rounded-xl bg-blue-600 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
              >
                Beli Sekarang
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* BANTUAN */}
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-3xl bg-blue-50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-black">Butuh Bantuan?</h2>
          <p className="mt-3 text-sm text-slate-500">
            Periksa status pesanan atau hubungi layanan pelanggan.
          </p>
          <a href="/topup" className="mt-6 inline-block rounded-xl bg-blue-600 px-7 py-3 font-bold text-white">
            Mulai Pesanan
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 DIGITAL STORE. All rights reserved.</p>
          <p>Platform produk digital.</p>
        </div>
      </footer>
    </main>
  );
}
