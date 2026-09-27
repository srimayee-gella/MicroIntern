import React from 'react';
import { Star, Quote } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "MicroIntern allowed me to earn ₹8,500 across 3 small projects without compromising my semester finals. The certificate and direct recommendation from TechStart helped me secure off-campus interviews!",
      author: "Ananya Sharma",
      role: "B.Tech CS Undergrad, IIT Roorkee",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      tag: "Student"
    },
    {
      quote: "As an organic café founder, I don't have the bandwidth to interview agency creatives. We posted an Instagram content sprint and hired a brilliant student within 3 hours. Deliverables were exceptional!",
      author: "Arjun Verma",
      role: "Founder, GreenLeaf Café",
      avatar: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
      rating: 5,
      tag: "Business"
    },
    {
      quote: "I revamped a startup's landing page in Figma over a 6-day weekend sprint. Instant UPI escrow release and genuine founder feedback made this 10x more rewarding than unpaid college internships.",
      author: "Priya Reddy",
      role: "Product Design Student, BITS Pilani",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      rating: 5,
      tag: "Student"
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold mb-3">
            Real Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Students & Startups
          </h2>
          <p className="text-base text-slate-600 mt-2">
            See how MicroIntern creates meaningful win-wins every week.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={t.rating} size={16} />
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    t.tag === 'Student' ? 'bg-brand-100 text-brand-700' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {t.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.author}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
