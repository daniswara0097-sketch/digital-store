
import { NextResponse } from "next/server";
import { melostoreRequest } from "@/lib/melostore";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const brandId = searchParams.get("brand_id");
    const limit = searchParams.get("limit") || "100";
    const cursor = searchParams.get("cursor");

    const params = new URLSearchParams();

    params.set("limit", limit);

    if (brandId) {
      params.set("brand_id", brandId);
    }

    if (cursor) {
      params.set("cursor", cursor);
    }

    const result = await melostoreRequest(
      `/pricelists?${params.toString()}`
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("MeloStore products error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil daftar produk.",
      },
      { status: 503 }
    );
  }
}
