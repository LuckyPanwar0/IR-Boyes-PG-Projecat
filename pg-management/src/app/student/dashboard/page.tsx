import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User, Phone, MapPin, BedDouble, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function StudentDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return <div>Not authorized</div>;
  }

  const profile = await prisma.studentProfile.findFirst({
    where: { user: { email: session.user.email } },
    include: {
      user: true,
      room: true,
      bed: true,
      payments: {
        orderBy: { createdAt: "desc" },
        take: 3
      },
      complaints: {
        orderBy: { createdAt: "desc" },
        take: 2
      }
    }
  });

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 shadow-sm max-w-2xl mx-auto mt-10">
        <AlertCircle size={48} className="text-orange-500 mb-4 mx-auto" />
        <h3 className="text-xl font-bold text-slate-800 mb-2">Profile Not Found</h3>
        <p className="text-slate-600 mb-6">Your student profile has not been fully set up by the administrator yet.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-800 transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const pendingPayments = profile.payments.filter(p => p.status === "PENDING").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-outfit">Welcome back, {profile.user.name?.split(" ")[0]}!</h2>
        <p className="text-slate-500 mt-1">Here is the latest overview of your stay at IR Boys PG.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
           <h3 className="text-lg font-bold text-slate-800 mb-6 font-outfit relative z-10 flex items-center gap-2">
             <User size={20} className="text-primary"/> Personal Details
           </h3>
           
           <div className="space-y-4 relative z-10">
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</span>
               <span className="text-slate-800 font-medium">{profile.user.name}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</span>
               <span className="text-slate-800 font-medium">{profile.user.email}</span>
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</span>
               <span className="text-slate-800 font-medium flex items-center gap-2">
                 <Phone size={14} className="text-slate-400"/> {profile.phone || "Not provided"}
               </span>
             </div>
             <div className="flex flex-col">
               <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Parent Contact</span>
               <span className="text-slate-800 font-medium flex items-center gap-2">
                 <Phone size={14} className="text-slate-400"/> {profile.parentPhone || "Not provided"}
               </span>
             </div>
           </div>
        </div>

        {/* Room Info */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full -z-0"></div>
           <h3 className="text-lg font-bold text-slate-800 mb-6 font-outfit relative z-10 flex items-center gap-2">
             <BedDouble size={20} className="text-indigo-500"/> Room Allocation
           </h3>
           
           {profile.room && profile.bed ? (
             <div className="space-y-6 relative z-10">
               <div className="flex items-end gap-3">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-2xl font-outfit">
                   {profile.room.roomNumber}
                 </div>
                 <div className="pb-1">
                   <p className="text-sm font-semibold text-slate-500">Room Number</p>
                   <p className="text-slate-800 font-bold">{profile.room.type} {profile.room.isAc ? "(AC)" : "(Non-AC)"}</p>
                 </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Bed Identifier</span>
                    <p className="text-lg font-bold text-slate-800 font-outfit mt-1">Bed {profile.bed.bedNumber}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Rent</span>
                    <p className="text-lg font-bold text-slate-800 font-outfit mt-1">₹{profile.room.pricePerBed}</p>
                  </div>
               </div>
             </div>
           ) : (
             <div className="py-8 text-center relative z-10">
               <p className="text-slate-500 font-medium">You have not been assigned to a room yet.</p>
               <p className="text-sm text-slate-400 mt-2">Please contact the admin.</p>
             </div>
           )}
        </div>

        {/* Due Payments Snapshot */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-0"></div>
           <h3 className="text-lg font-bold text-slate-800 mb-2 font-outfit relative z-10">Action Required</h3>
           
           <div className="py-6 relative z-10 flex flex-col items-center justify-center text-center">
             <p className="text-sm font-semibold text-slate-500 mb-1">Total Outstanding Dues</p>
             <h4 className={`text-4xl font-bold font-outfit mb-4 ${pendingPayments > 0 ? "text-orange-500" : "text-green-500"}`}>
               ₹{pendingPayments}
             </h4>
             
             {pendingPayments > 0 ? (
               <Link href="/student/dashboard/payments" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-md">
                 Pay Now Target
               </Link>
             ) : (
               <div className="flex items-center gap-2 text-green-600 font-semibold text-sm bg-green-50 px-4 py-2 rounded-lg">
                 <CheckCircle2 size={16} /> All dues cleared
               </div>
             )}
           </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-800 font-outfit">Recent Payments</h3>
             <Link href="/student/dashboard/payments" className="text-sm font-semibold text-primary hover:underline">View All</Link>
           </div>
           
           <div className="space-y-4">
             {profile.payments.length === 0 ? (
               <p className="text-slate-500 text-sm py-4">No payment history available.</p>
             ) : (
               profile.payments.map(payment => (
                 <div key={payment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-3">
                   <div className="flex items-center gap-4">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${payment.status === 'PAID' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                       <Calendar size={18} />
                     </div>
                     <div>
                       <p className="font-bold text-slate-800">Rent for {payment.month}</p>
                       <p className="text-xs text-slate-500">{payment.status === 'PAID' ? `Paid on ${new Date(payment.paymentDate!).toLocaleDateString()}` : 'Payment due'}</p>
                     </div>
                   </div>
                   <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-1">
                     <span className="font-bold text-slate-800 font-outfit">₹{payment.amount}</span>
                     <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${payment.status === 'PAID' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                       {payment.status}
                     </span>
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-800 font-outfit">My Complaints</h3>
             <Link href="/student/dashboard/complaints" className="text-sm font-semibold text-primary hover:underline">Raise New</Link>
           </div>

           <div className="space-y-4">
             {profile.complaints.length === 0 ? (
               <p className="text-slate-500 text-sm py-4">You have not raised any complaints.</p>
             ) : (
               profile.complaints.map(complaint => (
                 <div key={complaint.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200">
                      {complaint.status === "OPEN" && <div className="h-full bg-red-500"></div>}
                      {complaint.status === "IN_PROGRESS" && <div className="h-full bg-yellow-500"></div>}
                      {complaint.status === "RESOLVED" && <div className="h-full bg-green-500"></div>}
                   </div>
                   <div className="pl-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-slate-800">{complaint.title}</h4>
                        <span className="text-[10px] text-slate-400 font-medium shrink-0">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">{complaint.description}</p>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                        {complaint.status === "OPEN" && <span className="text-red-600 bg-red-50 px-2 py-1 rounded">Open Review</span>}
                        {complaint.status === "IN_PROGRESS" && <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded">In Progress</span>}
                        {complaint.status === "RESOLVED" && <span className="text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1"><CheckCircle2 size={10}/> Resolved</span>}
                      </div>
                   </div>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
