"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateComplaintStatus(id: string, status: string) {
  try {
    await prisma.complaint.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin/complaints");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update complaint status." };
  }
}

export async function deleteComplaint(id: string) {
  try {
    await prisma.complaint.delete({
      where: { id }
    });
    revalidatePath("/admin/complaints");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete complaint." };
  }
}
