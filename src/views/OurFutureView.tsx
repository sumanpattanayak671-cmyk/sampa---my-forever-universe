import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, Circle, Calendar, Plane, Home, Award } from 'lucide-react';
import { FuturePlan } from '../types';

interface OurFutureViewProps {
  plans: FuturePlan[];
}

export const OurFutureView: React.FC<OurFutureViewProps> = ({ plans }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'travel', 'home', 'milestone', 'adventures'];

  const filteredPlans = plans.filter(
    (p) => selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory
  );

  const completedCount = plans.filter((p) => p.isCompleted).length;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'travel':
        return <Plane className="h-4 w-4 text-emerald-400" />;
      case 'home':
        return <Home className="h-4 w-4 text-amber-400" />;
      case 'milestone':
        return <Award className="h-4 w-4 text-purple-400" />;
      default:
        return <Compass className="h-4 w-4 text-rose-400" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Our Shared Horizons // Bucket List</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Our Future Dreams & Bucket List
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          Horizons we haven't reached yet, but will walk toward hand-in-hand.
        </p>

        {/* Progress pill */}
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DED4C1] bg-white px-4 py-1.5 text-xs font-sans text-[#6B5B4A]">
            <span>Completed Dreams:</span>
            <span className="font-bold text-[#1A1A1A]">
              {completedCount} of {plans.length}
            </span>
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-[#DED4C1] pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-sans font-medium tracking-wide transition-all capitalize ${
              selectedCategory === cat
                ? 'bg-[#1A1A1A] text-[#F5F2ED] shadow-sm'
                : 'border border-[#DED4C1] bg-white/80 text-[#6B5B4A] hover:bg-[#EBE4D8]'
            }`}
          >
            {cat === 'all' ? 'All Dreams' : cat}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] border p-6 natural-card-shadow transition-all duration-300 ${
              plan.isCompleted
                ? 'border-[#DED4C1] bg-[#FAF7F2]'
                : 'border-[#DED4C1] bg-white hover:border-[#6B5B4A]/60'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-[#F5F2ED] border border-[#E0D8CC] p-1.5">{getCategoryIcon(plan.category)}</div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#6B5B4A] capitalize font-sans">
                    {plan.category}
                  </span>
                </div>

                {plan.isCompleted ? (
                  <span className="flex items-center gap-1 rounded-full bg-[#EBE4D8] border border-[#DED4C1] px-2.5 py-0.5 text-[10px] text-[#6B5B4A] font-semibold font-sans">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Realized</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-full bg-[#F5F2ED] border border-[#E0D8CC] px-2.5 py-0.5 text-[10px] text-[#6B5B4A] font-sans">
                    <Circle className="h-3 w-3" />
                    <span>In Progress</span>
                  </span>
                )}
              </div>

              <h3 className="font-serif text-xl font-normal text-[#1A1A1A]">
                {plan.title}
              </h3>

              {plan.notes && (
                <p className="text-xs leading-relaxed text-[#1A1A1A]/70">
                  {plan.notes}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E0D8CC] pt-4 text-xs text-[#6B5B4A] font-sans">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                <span>Target: {plan.targetDate || 'Soon'}</span>
              </span>
              <span className="text-[11px] text-[#6B5B4A]/80">Together Forever</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
