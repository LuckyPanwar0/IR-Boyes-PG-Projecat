"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComplaint(studentId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Please provide both title and description." };
  }

  try {
    await prisma.complaint.create({
      data: {
        studentId,
        title,
        description,
        status: "OPEN"
      }
    });

    revalidatePath("/student/dashboard/complaints");
    return { success: true };
  } catch (error) {
    return { error: "Failed to submit complaint. Please try again." };
  }
}
