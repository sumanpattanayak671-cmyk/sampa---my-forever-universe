import React from 'react';
import { Sparkles, Calendar, MapPin, Heart, ArrowRight, Camera } from 'lucide-react';
import { UniverseData, Memory } from '../types';

interface OurStoryViewProps {
  data: UniverseData;
  navigate: (path: string) => void;
  onOpenShare: (memory: Memory) => void;
}

export const OurStoryView: React.FC<OurStoryViewProps> = ({ data, navigate, onOpenShare }) => {
  const { memories, settings } = data;

  // Sort memories chronologically
  const sortedMemories = [...memories].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Chronology of Love // Our Milestones</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Our Romantic Timeline
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          The step-by-step voyage of how two paths crossed and created a forever sanctuary for {settings.partnerName}.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-[#DED4C1] ml-4 sm:ml-32 space-y-12 pb-8">
        {sortedMemories.map((item, idx) => (
          <div key={item.id} className="relative pl-6 sm:pl-10 group">
            {/* Timeline node icon */}
            <div className="absolute -left-[17px] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#6B5B4A] bg-[#F5F2ED] text-[#6B5B4A] shadow-sm group-hover:scale-110 transition-transform">
              <Heart className="h-3.5 w-3.5 fill-[#6B5B4A]" />
            </div>

            {/* Left date on desktop */}
            <div className="hidden sm:block absolute -left-32 top-2 w-24 text-right">
              <div className="font-serif text-xs font-semibold text-[#1A1A1A]">{item.date}</div>
              <div className="text-[10px] font-sans uppercase tracking-wider text-[#6B5B4A]">{item.category}</div>
            </div>

            {/* Card Content */}
            <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-6 sm:p-8 natural-card-shadow transition-all hover:border-[#6B5B4A]/60">
              <div className="sm:hidden mb-2 flex items-center gap-2 text-xs font-medium text-[#6B5B4A]">
                <Calendar className="h-3.5 w-3.5" />
                <span>{item.date}</span>
                <span>•</span>
                <span className="text-[#1A1A1A]/60">{item.category}</span>
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Photo Preview if available */}
                {item.photoUrls && item.photoUrls.length > 0 && (
                  <div className="md:w-1/3 overflow-hidden rounded-2xl border border-[#DED4C1] bg-[#EBE4D8] h-48 md:h-auto flex-shrink-0">
                    <img
                      src={item.photoUrls[0]}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#6B5B4A] font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="mt-1 font-serif text-2xl font-normal text-[#1A1A1A] group-hover:text-[#6B5B4A] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#1A1A1A]/75 font-serif italic">
                      “{item.summary}”
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-[#1A1A1A]/70">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E0D8CC] pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#E0D8CC] bg-[#F5F2ED] px-2.5 py-0.5 text-[10px] font-sans text-[#6B5B4A]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenShare(item)}
                        className="rounded-full border border-[#DED4C1] bg-[#F5F2ED] px-3.5 py-1.5 text-xs font-sans font-medium text-[#6B5B4A] hover:bg-[#EBE4D8] transition-colors"
                      >
                        Share
                      </button>
                      <button
                        onClick={() => navigate(`/memory/${item.slug}`)}
                        className="flex items-center gap-1.5 rounded-full bg-[#1A1A1A] px-4 py-1.5 text-xs font-sans uppercase tracking-widest font-bold text-[#F5F2ED] hover:bg-[#333333] transition-colors shadow-sm"
                      >
                        <span>View Chapter</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
