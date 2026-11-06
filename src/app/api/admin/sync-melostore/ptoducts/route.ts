
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { prisma } from "@/lib/prisma";

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token || !process.env.SESSION_SECRET) return false;

  try {
    const secret = new TextEncoder().encode(
      process.env.SESSION_SECRET
    );

    const { payload } = await jwtVerify(token, secret);
    return payload.role === "ADMIN";
  } catch {
    return false;
  }
}

// TAMBAH PRODUK
export async function POST(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const price = Number(body.price);

    if (
      !name ||
      !category ||
      !Number.isSafeInteger(price) ||
      price < 0
    ) {
      return NextResponse.json(
        { message: "Data produk tidak valid." },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        category,
        supplier: "MANUAL",
        supplierPrice: 0,
        price,
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Produk berhasil ditambahkan.",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    return NextResponse.json(
      { message: "Gagal menambahkan produk." },
      { status: 500 }
    );
  }
}

// EDIT HARGA DAN STATUS PRODUK
export async function PATCH(request: Request) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { message: "Akses ditolak." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const id = Number(body.id);

    if (!Number.isSafeInteger(id) || id <= 0) {
      return NextResponse.json(
        { message: "ID produk tidak valid." },
        { status: 400 }
      );
    }

    const data: {
      price?: number;
      isActive?: boolean;
    } = {};

    if (body.price !== undefined) {
      const price = Number(body.price);

      if (!Number.isSafeInteger(price) || price < 0) {
        return NextResponse.json(
          { message: "Harga jual tidak valid." },
          { status: 400 }
        );
      }

      data.price = price;
    }

    if (body.isActive !== undefined) {
      if (typeof body.isActive !== "boolean") {
        return NextResponse.json(
          { message: "Status produk tidak valid." },
          { status: 400 }
        );
      }

      data.isActive = body.isActive;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "Tidak ada perubahan data." },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      message: "Produk berhasil diperbarui.",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui produk." },
      { status: 500 }
    );
  }
}
