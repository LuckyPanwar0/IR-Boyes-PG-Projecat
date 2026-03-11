"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addNotice(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return { error: "Title and Content are required" };
  }

  try {
    await prisma.notice.create({
      data: {
        title,
        content,
        isActive: true,
      }
    });

    revalidatePath("/admin/notices");
    revalidatePath("/student/dashboard");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to broadcast notice." };
  }
}

export async function toggleNoticeStatus(id: string, currentStatus: boolean) {
  try {
     await prisma.notice.update({
       where: { id },
       data: { isActive: !currentStatus }
     });
     revalidatePath("/admin/notices");
     revalidatePath("/student/dashboard");
     return { success: true };
  } catch (error) {
     return { error: "Failed to update notice." };
  }
}

export async function deleteNotice(id: string) {
  try {
    await prisma.notice.delete({ where: { id } });
    revalidatePath("/admin/notices");
    revalidatePath("/student/dashboard");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete notice." };
  }
}
