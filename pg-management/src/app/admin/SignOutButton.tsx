"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/student/login" })}
      className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
    >
      <LogOut size={20} />
      <span className="font-medium text-sm">Logout</span>
    </button>
  );
}
