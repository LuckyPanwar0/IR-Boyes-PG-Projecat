import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createComplaint } from "./actions";
import { AlertCircle, Clock, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { redirect } from "next/navigation";

export default async function StudentComplaintsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) redirect("/student/login");

  const profile = await prisma.studentProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return <div>Profile not found</div>;

  const complaints = await prisma.complaint.findMany({
    where: { studentId: profile.id },
    orderBy: { createdAt: "desc" }
  });

  const boundSubmitAction = createComplaint.bind(null, profile.id);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-outfit">My Complaints</h2>
        <p className="text-slate-500 mt-1">Raise room maintenance or facility issues here.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Raise Complaint Form */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-outfit flex items-center gap-2">
            <MessageSquarePlus size={20} className="text-primary"/> New Complaint
          </h3>
          
          <form action={boundSubmitAction} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Issue Title *</label>
              <input 
                name="title" 
                required 
                placeholder="e.g. AC not cooling" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Detailed Description *</label>
              <textarea 
                name="description"
                required 
                rows={4}
                placeholder="Please describe the issue in detail..." 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all"
              />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-colors mt-6 shadow-lg">
              Submit Complaint
            </button>
            <p className="text-xs text-center text-slate-500 mt-4">
              Our support staff reviews complaints daily from 9 AM - 6 PM.
            </p>
          </form>
        </div>

        {/* Complaints History */}
        <div className="xl:col-span-2 space-y-4">
           {complaints.length === 0 ? (
             <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-slate-100">
               <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4 opacity-50" />
               <h3 className="text-lg font-bold text-slate-800 mb-2">No past complaints!</h3>
               <p className="text-slate-500">If you experience any issues, let us know using the form.</p>
             </div>
           ) : (
             <div className="space-y-4">
                {complaints.map(complaint => (
                  <div key={complaint.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                     <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                       <div>
                         <h4 className="text-lg font-bold text-slate-900 font-outfit mb-1">{complaint.title}</h4>
                         <span className="text-xs font-semibold text-slate-400">{new Date(complaint.createdAt).toLocaleDateString()} at {new Date(complaint.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                       </div>
                       <div className="shrink-0">
                         {complaint.status === "OPEN" && <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 text-xs font-bold rounded-lg"><AlertCircle size={14}/> Open</span>}
                         {complaint.status === "IN_PROGRESS" && <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg"><Clock size={14}/> In Progress</span>}
                         {complaint.status === "RESOLVED" && <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg"><CheckCircle2 size={14}/> Resolved</span>}
                       </div>
                     </div>
                     <p className="text-slate-600 text-sm leading-relaxed p-4 bg-slate-50 rounded-2xl border border-slate-100">
                       {complaint.description}
                     </p>
                  </div>
                ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
