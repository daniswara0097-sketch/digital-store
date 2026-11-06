
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { melostoreRequest } from "@/lib/melostore";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Silakan login terlebih dahulu." },
        { status: 401 }
      );
    }

    const secretValue = process.env.SESSION_SECRET;

    if (!secretValue) {
      throw new Error("SESSION_SECRET belum dikonfigurasi.");
    }

    const secret = new TextEncoder().encode(secretValue);
    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Akses khusus admin." },
        { status: 403 }
      );
    }

    const result = await melostoreRequest(
      "/pricelists?limit=500"
    );

    return NextResponse.json({
      success: true,
      message: "Data produk berhasil diambil.",
      data: result,
    });
  } catch (error) {
    console.error("Sync MeloStore error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Sinkronisasi gagal.",
      },
      { status: 503 }
    );
  }
}
