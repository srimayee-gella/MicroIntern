import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, CheckCircle2, ArrowRight, IndianRupee } from 'lucide-react';

export const PayoutModal = ({ isOpen, onClose, availableAmount = 6500 }) => {
  const { currentUser } = useApp();
  const { showToast } = useToast();

  const [upiId, setUpiId] = useState(currentUser?.upiId || 'ananya@oksbi');
  const [amount, setAmount] = useState(availableAmount);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0 || amount > availableAmount) {
      showToast(`Invalid withdrawal amount. Max available: ₹${availableAmount.toLocaleString('en-IN')}`, 'error');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      showToast(`Payout request of ₹${Number(amount).toLocaleString('en-IN')} initiated to ${upiId}! Funds will reflect within 20 minutes.`, 'success');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Withdraw Earnings</h3>
            <p className="text-xs text-slate-500">Instant UPI transfer directly to your bank</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Cleared Balance</span>
            <span className="text-xl font-black text-emerald-700">₹{availableAmount.toLocaleString('en-IN')}</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Withdrawal Amount (₹)
            </label>
            <input
              type="number"
              max={availableAmount}
              min={100}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Beneficiary UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="e.g. yourname@okhdfcbank"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Verified name: {currentUser?.name}</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              <span>{processing ? 'Processing...' : 'Transfer to UPI'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
