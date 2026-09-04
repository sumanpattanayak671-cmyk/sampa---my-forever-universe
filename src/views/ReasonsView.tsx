import React, { useState } from 'react';
import { Sparkles, Heart, Search, Filter } from 'lucide-react';
import { Reason } from '../types';

interface ReasonsViewProps {
  reasons: Reason[];
  onHeartReason: (id: string) => void;
}

export const ReasonsView: React.FC<ReasonsViewProps> = ({ reasons, onHeartReason }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(reasons.map((r) => r.category)))];

  const filteredReasons = reasons.filter((r) => {
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.category.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Infinite Devotion // Why I Love You</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Reasons Why I Love Sampa
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          A living, growing compendium of reasons. Tap any heart to send a romantic reaction to this thought.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#DED4C1] pb-6">
        <div className="flex flex-wrap items-center gap-2">
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
              {cat === 'all' ? 'All Reasons' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5B4A]" />
          <input
            type="text"
            placeholder="Search reasons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-[#DED4C1] bg-white py-2 pl-10 pr-4 text-xs text-[#1A1A1A] placeholder-[#6B5B4A]/60 focus:border-[#6B5B4A] focus:outline-none"
          />
        </div>
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReasons.map((reason) => (
          <div
            key={reason.id}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#DED4C1] bg-white p-6 natural-card-shadow transition-all duration-300 hover:border-[#6B5B4A]/60"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-serif text-xs font-bold text-[#6B5B4A] tracking-wider">
                  #{reason.number}
                </span>
                <span className="rounded-full bg-[#F5F2ED] border border-[#E0D8CC] px-2.5 py-0.5 text-[10px] font-sans text-[#6B5B4A]">
                  {reason.category}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-lg font-normal text-[#1A1A1A] group-hover:text-[#6B5B4A] transition-colors">
                {reason.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#1A1A1A]/75">
                {reason.description}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E0D8CC] pt-4">
              <span className="text-[11px] text-[#6B5B4A] font-sans">Cherished forever</span>

              <button
                onClick={() => onHeartReason(reason.id)}
                className="flex items-center gap-1.5 rounded-full border border-[#DED4C1] bg-[#FAF7F2] px-3 py-1 text-xs font-sans font-semibold text-[#6B5B4A] hover:bg-[#EBE4D8] active:scale-95 transition-all"
                title="Send heart reaction"
              >
                <Heart className="h-3.5 w-3.5 fill-[#6B5B4A] text-[#6B5B4A] group-hover:scale-110 transition-transform" />
                <span>{reason.heartCount}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
