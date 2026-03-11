"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addPaymentRecord(formData: FormData) {
  const studentId = formData.get("studentId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const month = formData.get("month") as string;
  const status = formData.get("status") as string;
  const transactionId = formData.get("transactionId") as string;

  if (!studentId || isNaN(amount) || !month) {
    return { error: "Missing required fields" };
  }

  try {
    await prisma.payment.create({
      data: {
        studentId,
        amount,
        month,
        status,
        transactionId,
        paymentDate: status === "PAID" ? new Date() : null,
      }
    });

    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create payment record. Ensure month format is correct." };
  }
}

export async function markAsPaid(id: string) {
  try {
    await prisma.payment.update({
      where: { id },
      data: { 
        status: "PAID",
        paymentDate: new Date()
      }
    });
    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update payment status." };
  }
}
