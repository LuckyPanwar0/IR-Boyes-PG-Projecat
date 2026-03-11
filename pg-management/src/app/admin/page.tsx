import prisma from "@/lib/prisma";
import { Users, Bed, CreditCard, MessageSquare } from "lucide-react";

export default async function AdminDashboard() {
  const studentsCount = await prisma.studentProfile.count();
  const roomsCount = await prisma.room.count();
  const bedsCount = await prisma.bed.count();
  const pendingPayments = await prisma.payment.count({ where: { status: "PENDING" } });
  const openComplaints = await prisma.complaint.count({ where: { status: "OPEN" } });

  const stats = [
    { title: "Total Students", value: studentsCount, icon: <Users size={24} />, color: "bg-blue-500" },
    { title: "Total Rooms", value: roomsCount, icon: <Bed size={24} />, color: "bg-purple-500" },
    { title: "Pending Rent", value: pendingPayments, icon: <CreditCard size={24} />, color: "bg-orange-500" },
    { title: "Open Complaints", value: openComplaints, icon: <MessageSquare size={24} />, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-outfit">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 font-outfit">Recent Complaints</h3>
          {openComplaints === 0 ? (
            <p className="text-slate-500 text-sm">No open complaints right now.</p>
          ) : (
            <p className="text-slate-500 text-sm">Complaints will appear here.</p>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 font-outfit">Recent Payments</h3>
          {pendingPayments === 0 ? (
            <p className="text-slate-500 text-sm">All payments are up to date.</p>
          ) : (
             <p className="text-slate-500 text-sm">Pending payments tracking will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
