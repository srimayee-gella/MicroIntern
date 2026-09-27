import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { X, Star, Send } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const RateBusinessModal = ({ application, isOpen, onClose }) => {
  const { rateBusiness } = useApp();
  const { showToast } = useToast();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  if (!isOpen || !application) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = rateBusiness(application.id, rating, review);
    if (result.success) {
      showToast(result.message, 'success');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Rate Business Partner</h3>
            <p className="text-xs text-slate-500">Your feedback helps fellow students choose projects</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-center py-2">
            <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              {application.businessName}
            </p>
            <div className="flex justify-center mb-1">
              <StarRating
                rating={rating}
                interactive={true}
                size={32}
                onRate={(r) => setRating(r)}
              />
            </div>
            <span className="text-sm font-bold text-amber-500">{rating} out of 5 Stars</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Review & Experience
            </label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="How was the communication? Were requirements clear and prompt?"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
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
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Rating</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
