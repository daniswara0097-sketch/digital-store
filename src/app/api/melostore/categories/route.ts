
import { NextResponse } from "next/server";
import { melostoreRequest } from "@/lib/melostore";

export async function GET() {
  try {
    const result = await melostoreRequest(
      "/pricelists/categories"
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("MeloStore categories error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil kategori.",
      },
      { status: 503 }
    );
  }
}
