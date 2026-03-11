import prisma from "@/lib/prisma";
import { addPaymentRecord, markAsPaid } from "./actions";
import { CheckCircle2, CloudLightning, CreditCard } from "lucide-react";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    include: {
      student: {
        include: { user: true, room: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const students = await prisma.studentProfile.findMany({
    include: { user: true, room: true },
    orderBy: { user: { name: "asc" } }
  });

  // Calculate some basic stats
  const totalCollected = payments.filter(p => p.status === "PAID").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === "PENDING").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 font-outfit">Payment Tracking</h2>
          <p className="text-slate-500 mt-1">Manage rent, dues, and transaction histories.</p>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Total Collected</p>
            <h3 className="text-3xl font-bold text-slate-900 font-outfit">₹{totalCollected.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Pending Rent</p>
            <h3 className="text-3xl font-bold text-slate-900 font-outfit">₹{pendingAmount.toLocaleString()}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
            <CloudLightning size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-4">
        
        {/* Record Payment Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-6 font-outfit">Generate Invoice</h3>
          
          <form action={addPaymentRecord} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Select Student *</label>
              <select name="studentId" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-primary/50">
                <option value="">-- Choose Student --</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.user.name} (RM: {s.room?.roomNumber || "None"})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Amount (₹) *</label>
                <input 
                  name="amount" 
                  type="number"
                  required 
                  placeholder="e.g. 8500" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Month *</label>
                <input 
                  name="month" 
                  type="month"
                  required 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
              <select name="status" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                <option value="PENDING">Pending (Due)</option>
                <option value="PAID">Already Paid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Transaction ID (Optional)</label>
              <input 
                name="transactionId" 
                placeholder="UPI Ref No." 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-6">
              Create Record
            </button>
          </form>
        </div>

        {/* Payments List */}
        <div className="xl:col-span-2">
          {payments.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-100 flex flex-col items-center">
              <CreditCard size={48} className="text-slate-300 mb-4" />
              <h3 className="text-lg font-bold text-slate-800">No payment records</h3>
              <p className="text-slate-500 mt-1">Generate a manual invoice or record a payment to see it here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 rounded-tl-2xl">Bill To</th>
                      <th className="px-6 py-4">Month/Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right rounded-tr-2xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-800">{payment.student.user.name}</p>
                          <p className="text-xs text-slate-500">Room: {payment.student.room?.roomNumber || "N/A"}</p>
                        </td>
                        <td className="px-6 py-4">
                           <p className="font-bold text-slate-800">₹{payment.amount}</p>
                           <p className="text-xs text-slate-500">For {payment.month}</p>
                        </td>
                        <td className="px-6 py-4">
                          {payment.status === "PAID" ? (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">
                              <CheckCircle2 size={12} /> Paid
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold">
                              <CloudLightning size={12} /> Pending
                            </div>
                          )}
                          {payment.transactionId && (
                            <p className="text-[10px] text-slate-400 mt-1 font-mono">{payment.transactionId}</p>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
                          {payment.status === "PENDING" && (
                            <form action={async () => {
                              "use server";
                              await markAsPaid(payment.id);
                            }}>
                              <button type="submit" className="text-xs font-semibold bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                                Mark as Paid
                              </button>
                            </form>
                          )}
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
