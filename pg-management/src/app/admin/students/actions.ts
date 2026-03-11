"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function addStudent(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const parentPhone = formData.get("parentPhone") as string;
  const bedId = formData.get("bedId") as string;

  if (!name || !email) {
    return { error: "Name and Email are required" };
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "A user with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash("student123", 10);

    // Create User and StudentProfile
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STUDENT",
        studentProfile: {
          create: {
            phone,
            parentPhone,
            ...(bedId && bedId !== "unassigned" ? { bedId } : {})
          }
        }
      }
    });

    // If bed is assigned, we also need to update the roomId in the profile
    if (bedId && bedId !== "unassigned") {
      const bed = await prisma.bed.findUnique({ where: { id: bedId } });
      if (bed) {
         await prisma.studentProfile.update({
           where: { userId: user.id },
           data: { roomId: bed.roomId }
         });
      }
    }

    revalidatePath("/admin/students");
    revalidatePath("/admin/rooms"); // update room availability
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add student." };
  }
}

export async function removeStudent(id: string) {
  try {
    // Delete user (cascade will delete profile)
    await prisma.user.delete({
      where: { id }
    });
    revalidatePath("/admin/students");
    revalidatePath("/admin/rooms");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to remove student." };
  }
}
