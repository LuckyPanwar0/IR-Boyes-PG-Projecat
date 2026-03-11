import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: "admin@irboyspg.com" }
    });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.create({
      data: {
        email: "admin@irboyspg.com",
        password: hashedPassword,
        name: "PG Admin",
        role: "ADMIN"
      }
    });

    return NextResponse.json({ message: "Admin user created successfully", adminId: admin.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed" }, { status: 500 });
  }
}
