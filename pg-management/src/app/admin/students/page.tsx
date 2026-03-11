import prisma from "@/lib/prisma";
import { addStudent, removeStudent } from "./actions";
import { User, Phone, Trash2, Bed as BedIcon } from "lucide-react";

export default async function AdminStudentsPage() {
  const students = await prisma.studentProfile.findMany({
    include: {
      user: true,
      room: true,
      bed: true
    },
    orderBy: { joinedAt: "desc" }
  });

  const availableBeds = await prisma.bed.findMany({
    where: { student: null },
    include: { room: true },
    orderBy: { room: { roomNumber: "asc" } }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-outfit">Students Directory</h2>
          <p className="text-slate-500 mt-1">Manage tenant profiles and room assignments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Add Student Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-outfit">Onboard Student</h3>
          
          <form action={addStudent} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name *</label>
              <input 
                name="name" 
                required 
                placeholder="John Doe" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address *</label>
              <input 
                name="email" 
                type="email"
                required 
                placeholder="john@example.com" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">Default password will be "student123"</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                <input 
                  name="phone" 
                  placeholder="Student's Phone" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Parent Phone</label>
                <input 
                  name="parentPhone" 
                  placeholder="Emergency Contact" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Assign Bed</label>
              <select name="bedId" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                <option value="unassigned">-- Do not assign yet --</option>
                {availableBeds.map(bed => (
                  <option key={bed.id} value={bed.id}>
                    Room {bed.room.roomNumber} - Bed {bed.bedNumber} (₹{bed.room.pricePerBed})
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6">
              Add Student
            </button>
          </form>
        </div>

        {/* Students List */}
        <div className="xl:col-span-2">
          {students.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
              <User size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No students onboarded</h3>
              <p className="text-slate-500 mt-1">Add your first student to see them here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-2xl">Student Details</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Room & Bed</th>
                      <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((profile) => (
                      <tr key={profile.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 flex items-center justify-center font-bold text-lg">
                              {profile.user.name?.charAt(0) || "S"}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{profile.user.name}</p>
                              <p className="text-xs text-slate-500">{profile.user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <p className="flex items-center gap-1.5 text-slate-600">
                              <Phone size={14} className="text-slate-400" /> {profile.phone || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500">Parent: {profile.parentPhone || "N/A"}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {profile.room && profile.bed ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg font-semibold text-xs">
                              <BedIcon size={14} /> RM {profile.room.roomNumber} - {profile.bed.bedNumber}
                            </div>
                          ) : (
                            <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-md border border-slate-200">Unassigned</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <form action={async () => {
                            "use server";
                            await removeStudent(profile.user.id);
                          }}>
                            <button type="submit" className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Remove Student">
                              <Trash2 size={18} />
                            </button>
                          </form>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
