import prisma from "@/lib/prisma";
import { updateComplaintStatus, deleteComplaint } from "./actions";
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";

export default async function AdminComplaintsPage() {
  const complaints = await prisma.complaint.findMany({
    include: {
      student: { include: { user: true, room: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-outfit">Resident Complaints</h2>
          <p className="text-slate-500 mt-1">Track and resolve issues reported by students.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {complaints.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <MessageSquare size={48} className="text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No complaints registered</h3>
            <p className="text-slate-500 mt-1">Everything is running smoothly!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {complaints.map((complaint) => (
              <div key={complaint.id} className="p-6 md:p-8 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row gap-6">
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {complaint.status === "OPEN" && <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full"><AlertCircle size={14}/> Open</span>}
                    {complaint.status === "IN_PROGRESS" && <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full"><Clock size={14}/> In Progress</span>}
                    {complaint.status === "RESOLVED" && <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full"><CheckCircle2 size={14}/> Resolved</span>}
                    
                    <span className="text-sm font-medium text-slate-500">
                      Reported by <span className="text-slate-800 font-bold">{complaint.student.user.name}</span> (Room {complaint.student.room?.roomNumber || "N/A"})
                    </span>
                    <span className="text-xs text-slate-400">• {new Date(complaint.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">{complaint.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-3xl">{complaint.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
                  {complaint.status !== "RESOLVED" && (
                    <form action={async () => {
                      "use server";
                      await updateComplaintStatus(complaint.id, "RESOLVED");
                    }}>
                      <button type="submit" className="w-full sm:w-auto md:w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm text-center">
                        Mark Resolved
                      </button>
                    </form>
                  )}
                  {complaint.status === "OPEN" && (
                     <form action={async () => {
                      "use server";
                      await updateComplaintStatus(complaint.id, "IN_PROGRESS");
                    }}>
                      <button type="submit" className="w-full sm:w-auto md:w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm text-center">
                        Mark In Progress
                      </button>
                     </form>
                  )}
                  
                  <form action={async () => {
                      "use server";
                      await deleteComplaint(complaint.id);
                  }}>
                    <button type="submit" className="w-full sm:w-auto md:w-full flex items-center justify-center gap-2 text-slate-500 hover:text-red-500 px-4 py-2.5 rounded-xl text-sm font-semibold border border-transparent hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 size={16} /> Delete
                    </button>
                  </form>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
