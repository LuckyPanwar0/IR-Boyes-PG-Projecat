"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addRoom(formData: FormData) {
  const roomNumber = formData.get("roomNumber") as string;
  const type = formData.get("type") as string;
  const isAc = formData.get("isAc") === "true";
  const pricePerBed = parseFloat(formData.get("pricePerBed") as string);
  const addDefaultBeds = formData.get("addDefaultBeds") === "on";

  if (!roomNumber || !type || isNaN(pricePerBed)) {
    return { error: "Missing required fields" };
  }

  try {
    const room = await prisma.room.create({
      data: {
        roomNumber,
        type,
        isAc,
        pricePerBed,
      }
    });

    if (addDefaultBeds) {
      const bedsCount = type === "SINGLE" ? 1 : type === "DOUBLE" ? 2 : 3;
      const bedNames = ["A", "B", "C"];
      
      const bedsData = Array.from({ length: bedsCount }).map((_, i) => ({
        bedNumber: bedNames[i],
        roomId: room.id,
      }));

      await prisma.bed.createMany({
        data: bedsData,
      });
    }

    revalidatePath("/admin/rooms");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create room. Room number might already exist." };
  }
}

export async function deleteRoom(id: string) {
  try {
    await prisma.room.delete({
      where: { id }
    });
    revalidatePath("/admin/rooms");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete room." };
  }
}
