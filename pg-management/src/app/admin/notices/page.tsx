import prisma from "@/lib/prisma";
import { addNotice, toggleNoticeStatus, deleteNotice } from "./actions";
import { Bell, FileText, Trash2, Power } from "lucide-react";

export default async function AdminNoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-outfit">Notice Board</h2>
          <p className="text-slate-500 mt-1">Broadcast announcements to all registered students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Post Notice Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-outfit flex items-center gap-2"><FileText size={20} className="text-primary"/> New Announcement</h3>
          
          <form action={addNotice} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
              <input 
                name="title" 
                required 
                placeholder="e.g. WiFi Maintenance Schedule" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Content / Message *</label>
              <textarea 
                name="content"
                required 
                rows={5}
                placeholder="Type the full announcement here..." 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none resize-none"
              />
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6 shadow-lg shadow-primary/30">
              Broadcast Message
            </button>
          </form>
        </div>

        {/* Notices Timeline */}
        <div className="xl:col-span-2 space-y-4">
          {notices.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
              <Bell size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No notices broadcasted yet</h3>
              <p className="text-slate-500 mt-1">Create an announcement to see it appear on the student dashboard.</p>
            </div>
          ) : (
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {notices.map((notice) => (
                <div key={notice.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-4 h-4 rounded-full border-4 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${notice.isActive ? "bg-green-500 border-green-100" : "bg-slate-400 border-slate-100"}`}></div>
                  <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-5 rounded-2xl shadow-sm border ${notice.isActive ? "border-slate-200" : "border-slate-100 opacity-60"} relative`}>
                     <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${notice.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                          {notice.isActive ? "Active" : "Archived"}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{new Date(notice.createdAt).toLocaleDateString()}</span>
                     </div>
                     <h4 className="text-lg font-bold text-slate-800 mb-2 font-outfit">{notice.title}</h4>
                     <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">{notice.content}</p>
                     
                     <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                        <form action={async () => {
                          "use server";
                          await toggleNoticeStatus(notice.id, notice.isActive);
                        }}>
                          <button type="submit" className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${notice.isActive ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}>
                            <Power size={14} /> {notice.isActive ? "Archive" : "Re-activate"}
                          </button>
                        </form>
                        <form action={async () => {
                          "use server";
                          await deleteNotice(notice.id);
                        }}>
                           <button type="submit" className="text-xs font-semibold flex items-center gap-1.5 text-slate-500 px-3 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
                            <Trash2 size={14} /> Delete
                          </button>
                        </form>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
