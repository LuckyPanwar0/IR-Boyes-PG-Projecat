import prisma from "@/lib/prisma";
import { Bell, Info, Calendar } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function StudentNoticesPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) redirect("/student/login");

  // Only fetch active notices for students
  const notices = await prisma.notice.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 font-outfit">Notice Board</h2>
        <p className="text-slate-500 mt-1">Important announcements and updates from the administration.</p>
      </div>

      <div className="space-y-4 pt-4">
        {notices.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 md:p-16 text-center border border-slate-100 shadow-sm">
            <Bell size={48} className="text-slate-300 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No active announcements</h3>
            <p className="text-slate-500">Check back later for updates from the PG management.</p>
          </div>
        ) : (
          notices.map((notice) => (
            <div key={notice.id} className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              
              <div className="flex items-center gap-3 mb-4 text-sm font-semibold text-slate-500">
                 <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Calendar size={14} className="text-primary"/>
                    {new Date(notice.createdAt).toLocaleDateString()}
                 </div>
                 <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100">
                    <Info size={14} /> Official Update
                 </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit">{notice.title}</h3>
              
              <div className="prose prose-slate prose-sm max-w-none">
                <p className="whitespace-pre-wrap leading-relaxed text-slate-600 text-[15px]">
                  {notice.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
