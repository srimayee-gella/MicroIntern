import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { PayoutModal } from './PayoutModal';

export const StudentEarnings = () => {
  const { currentUser, transactions, applications } = useApp();
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // Prompt values:
  // Total Earnings: ₹8,500
  // Pending: ₹2,000
  // Completed: ₹6,500
  const totalEarnings = currentUser?.totalEarnings || 8500;
  const pendingEarnings = currentUser?.pendingEarnings !== undefined ? currentUser.pendingEarnings : 2000;
  const completedEarnings = totalEarnings - pendingEarnings;

  const userTransactions = transactions.filter(
    (tx) => tx.studentId === currentUser?.id || true // fallback show sample transactions
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Earnings & Escrow Payouts
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your verified micro-internship stipends and request instant UPI withdrawals.
          </p>
        </div>

        <button
          onClick={() => setIsPayoutModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition self-start sm:self-auto"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span>Withdraw to UPI</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Earnings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
            <IndianRupee className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-slate-500 block mb-1">
            Total Project Value
          </span>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            ₹{totalEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Sum of all completed & in-progress contracts
          </p>
        </div>

        {/* Completed Earnings */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200/80 shadow-sm relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/20">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-emerald-800 block mb-1">
            Completed & Cleared
          </span>
          <div className="text-3xl font-black text-emerald-600 tracking-tight">
            ₹{completedEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-2">
            ✓ Available for immediate withdrawal
          </p>
        </div>

        {/* Pending Escrow */}
        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-sm relative overflow-hidden bg-gradient-to-b from-white to-amber-50/20">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
            <Clock className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold text-amber-800 block mb-1">
            Pending in Escrow
          </span>
          <div className="text-3xl font-black text-amber-600 tracking-tight">
            ₹{pendingEarnings.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-amber-700 font-medium mt-2">
            Locked in MicroIntern Escrow until signoff
          </p>
        </div>
      </div>

      {/* UPI / Bank Details Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
            <CreditCard className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">Linked UPI ID:</span>
              <span className="font-mono text-sm font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-lg border border-brand-200">
                {currentUser?.upiId || 'ananya@oksbi'}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct transfer via NPCI Unified Payments Interface with 0% platform deductions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPayoutModalOpen(true)}
          className="text-xs font-bold text-brand-600 hover:text-brand-700 border border-slate-200 hover:border-brand-300 px-4 py-2 rounded-xl transition"
        >
          Change UPI ID
        </button>
      </div>

      {/* Transaction History Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Transaction History</h3>
            <p className="text-xs text-slate-500">Record of project disbursements and escrow holds</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="pb-3 pl-2">Project / Milestone</th>
                <th className="pb-3">Business</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Method</th>
                <th className="pb-3 text-right">Amount (₹)</th>
                <th className="pb-3 pr-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userTransactions.map((tx) => {
                const isCompleted = tx.status === 'Completed';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-4 pl-2 font-bold text-slate-900">
                      {tx.projectTitle}
                    </td>
                    <td className="py-4 text-slate-600 font-medium">
                      {tx.businessName}
                    </td>
                    <td className="py-4 text-slate-500 font-mono text-xs">
                      {tx.date}
                    </td>
                    <td className="py-4 text-slate-500 text-xs">
                      {tx.method}
                    </td>
                    <td className="py-4 text-right font-black text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 pr-2 text-right">
                      {isCompleted ? (
                        <Badge variant="success" size="xs">Completed</Badge>
                      ) : (
                        <Badge variant="warning" size="xs">In Escrow (Pending)</Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout Modal */}
      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableAmount={completedEarnings}
      />
    </div>
  );
};
