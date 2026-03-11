import Link from "next/link";
import { SignOutButton } from "./SignOutButton";
import { LayoutDashboard, Users, Bed, CreditCard, MessageSquare, Bell, Image as ImageIcon, CheckSquare, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Rooms & Beds", href: "/admin/rooms", icon: <Bed size={20} /> },
    { name: "Students", href: "/admin/students", icon: <Users size={20} /> },
    { name: "Payments", href: "/admin/payments", icon: <CreditCard size={20} /> },
    { name: "Complaints", href: "/admin/complaints", icon: <MessageSquare size={20} /> },
    { name: "Notices", href: "/admin/notices", icon: <Bell size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link href="/admin" className="font-bold text-lg text-white font-outfit truncate">
            IR PG Admin
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
              >
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
           <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-xl font-bold font-outfit text-slate-800 md:hidden">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
              Admin
            </span>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
