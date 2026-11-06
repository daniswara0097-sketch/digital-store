
import { NextResponse } from "next/server";
import { melostoreRequest } from "@/lib/melostore";

export async function GET() {
  try {
    const profile = await melostoreRequest("/profile");

    return NextResponse.json({
      success: true,
      message: "Koneksi MeloStore berhasil.",
      data: profile,
    });
  } catch (error) {
    console.error("MeloStore profile error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal menghubungi MeloStore.",
      },
      { status: 503 }
    );
  }
}
