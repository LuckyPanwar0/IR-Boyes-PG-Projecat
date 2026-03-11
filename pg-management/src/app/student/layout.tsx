import Link from "next/link";
import { SignOutButton } from "@/app/admin/SignOutButton"; // Reuse the signout button
import { LayoutDashboard, CreditCard, MessageSquare, Bell, User as UserIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  // Fetch some quick profile info if needed for sidebar
  const user = session?.user?.id ? await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { studentProfile: { include: { room: true } } }
  }) : null;

  const navItems = [
    { name: "My Dashboard", href: "/student/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Rent & Payments", href: "/student/dashboard/payments", icon: <CreditCard size={20} /> },
    { name: "My Complaints", href: "/student/dashboard/complaints", icon: <MessageSquare size={20} /> },
    { name: "Notices", href: "/student/dashboard/notices", icon: <Bell size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="font-bold text-lg text-primary font-outfit truncate flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">IR</span>
            Student Portal
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1.5 px-4 mt-2">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Menu</p>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-50 hover:text-primary transition-all"
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0) || "S"}
             </div>
             <div className="overflow-hidden">
                <p className="font-bold text-slate-800 text-sm truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">RM: {user?.studentProfile?.room?.roomNumber || "Unassigned"}</p>
             </div>
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 md:hidden">
          <h1 className="text-xl font-bold font-outfit text-primary">Student Portal</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
