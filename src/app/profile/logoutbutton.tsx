"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-8 w-full rounded-xl bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-600"
    >
      Keluar dari Akun
    </button>
  );
}