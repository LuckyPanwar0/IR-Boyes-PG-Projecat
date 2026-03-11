import prisma from "@/lib/prisma";
import { addRoom, deleteRoom } from "./actions";
import { BedDouble, Wind, Users, Trash2 } from "lucide-react";

export default async function AdminRoomsPage() {
  const rooms = await prisma.room.findMany({
    include: {
      beds: true,
      _count: {
        select: { students: true }
      }
    },
    orderBy: { roomNumber: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-outfit">Rooms & Beds</h2>
          <p className="text-slate-500 mt-1">Manage PG accommodations and pricing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Add Room Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-outfit">Add New Room</h3>
          
          <form action={addRoom} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Room Number *</label>
              <input 
                name="roomNumber" 
                required 
                placeholder="e.g. 101" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Type *</label>
                <select name="type" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="TRIPLE">Triple</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">AC / Non-AC *</label>
                <select name="isAc" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option value="false">Non-AC</option>
                  <option value="true">AC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price Per Bed (₹) *</label>
              <input 
                name="pricePerBed" 
                type="number" 
                required 
                placeholder="e.g. 8500" 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input type="checkbox" name="addDefaultBeds" id="addDefaultBeds" defaultChecked className="rounded text-primary focus:ring-primary" />
              <label htmlFor="addDefaultBeds" className="text-sm border-slate-200 text-slate-600">Auto-create beds (A, B, C)</label>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6">
              Create Room
            </button>
          </form>
        </div>

        {/* Rooms List */}
        <div className="xl:col-span-2 space-y-4">
          {rooms.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
              <BedDouble size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No rooms added yet</h3>
              <p className="text-slate-500 mt-1">Use the form to add the first room to the system.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map(room => (
                <div key={room.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl font-outfit">
                        {room.roomNumber}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                          {room.type} <span className="text-slate-300">•</span> 
                          {room.isAc ? <span className="text-teal-600 flex items-center text-xs"><Wind size={12} className="mr-1"/> AC</span> : <span className="text-orange-500 text-xs">Non-AC</span>}
                        </h4>
                        <p className="text-sm font-semibold text-slate-500">₹{room.pricePerBed}<span className="text-xs font-normal">/bed</span></p>
                      </div>
                    </div>
                    
                    <form action={async () => {
                      "use server";
                      await deleteRoom(room.id);
                    }}>
                      <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-slate-600 font-medium">Beds Status</span>
                      <span className="text-slate-500 font-semibold">{room.beds.length} Total</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {room.beds.length > 0 ? room.beds.map(bed => (
                        <div 
                          key={bed.id} 
                          className={`px-3 py-1.5 rounded-md text-xs font-bold border ${bed.student ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 'bg-green-100 text-green-700 border-green-200'}`}
                          title={bed.student ? "Occupied" : "Available"}
                        >
                          Bed {bed.bedNumber}
                        </div>
                      )) : (
                        <span className="text-xs text-slate-400">No beds created.</span>
                      )}
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
