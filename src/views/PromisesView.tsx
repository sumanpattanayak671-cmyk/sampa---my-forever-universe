import React from 'react';
import { Sparkles, Shield, Heart, Calendar } from 'lucide-react';
import { PromiseItem } from '../types';

interface PromisesViewProps {
  promises: PromiseItem[];
}

export const PromisesView: React.FC<PromisesViewProps> = ({ promises }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Eternal Vows // Commitments to You</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Promises Given to Sampa
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          These are not fleeting words; they are unbreakable pillars etched into my heart and soul for all of our days.
        </p>
      </div>

      {/* Promises Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {promises.map((promise) => (
          <div
            key={promise.id}
            className="relative flex flex-col justify-between overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-7 natural-card-shadow transition-all duration-300 hover:border-[#6B5B4A]/60"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#F5F2ED] border border-[#E0D8CC] px-3 py-1 text-xs font-sans font-semibold text-[#6B5B4A]">
                  {promise.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-[#6B5B4A] font-sans font-medium">
                  <Shield className="h-3.5 w-3.5" />
                  <span className="capitalize">{promise.status}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl font-normal text-[#1A1A1A] leading-snug">
                {promise.title}
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-[#1A1A1A]/75">
                {promise.description}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#E0D8CC] pt-4 text-xs text-[#6B5B4A] font-sans">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Vowed: {promise.dateGiven}</span>
              </span>

              <div className="flex items-center gap-1 font-serif italic text-[#6B5B4A]">
                <Heart className="h-3 w-3 fill-[#6B5B4A] text-[#6B5B4A]" />
                <span>Sacred</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
