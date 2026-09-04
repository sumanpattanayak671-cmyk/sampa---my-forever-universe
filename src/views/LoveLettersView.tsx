import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Lock, Calendar, Clock, BookOpen } from 'lucide-react';
import { LoveLetter } from '../types';

interface LoveLettersViewProps {
  letters: LoveLetter[];
  onOpenLetter: (letter: LoveLetter) => void;
}

export const LoveLettersView: React.FC<LoveLettersViewProps> = ({ letters, onOpenLetter }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (targetIso: string) => {
    const diff = new Date(targetIso).getTime() - now;
    if (diff <= 0) return 'Unlocked';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Time-Locked Digital Parchment // Letters & Capsules</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Love Letters for Sampa
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          Each letter is sealed with an eternal digital wax emblem. Some can be opened right now, while time capsules tick down toward our upcoming milestones.
        </p>
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {letters.map((letter) => {
          const isLocked = letter.isLocked ?? (letter.unlockDate ? new Date(letter.unlockDate).getTime() > now : false);

          return (
            <div
              key={letter.id}
              onClick={() => onOpenLetter(letter)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[32px] border p-7 transition-all duration-300 cursor-pointer natural-card-shadow ${
                isLocked
                  ? 'border-[#DED4C1] bg-[#F9F7F4] hover:border-[#6B5B4A]/60'
                  : 'border-[#DED4C1] bg-white hover:border-[#6B5B4A] hover:-translate-y-1'
              }`}
            >
              {/* Envelope flap / Wax seal decoration */}
              <div className="flex items-center justify-between border-b border-[#E0D8CC] pb-4">
                <div className="flex items-center gap-2 text-xs text-[#6B5B4A]">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{letter.date}</span>
                </div>

                {/* Wax Seal Badge */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full shadow-sm border border-white/40 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: isLocked ? '#6B5B4A' : (letter.sealColor || '#8B5E3C') }}
                >
                  {isLocked ? (
                    <Lock className="h-4 w-4 text-white" />
                  ) : (
                    <Heart className="h-4 w-4 fill-white text-white" />
                  )}
                </div>
              </div>

              {/* Letter Content preview */}
              <div className="my-6 space-y-3">
                <h3 className="font-serif text-xl font-normal text-[#1A1A1A] group-hover:text-[#6B5B4A] transition-colors">
                  {letter.title}
                </h3>

                <p className="font-serif text-base italic text-[#1A1A1A]/80 line-clamp-3">
                  “{letter.excerpt || letter.content}”
                </p>
              </div>

              {/* Status footer */}
              <div className="border-t border-[#E0D8CC] pt-4">
                {isLocked ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#6B5B4A] font-sans font-semibold">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Unlocks in:</span>
                      </span>
                      <span>{letter.unlockDate ? formatCountdown(letter.unlockDate) : 'Locked'}</span>
                    </div>
                    <div className="text-[10px] text-[#1A1A1A]/60 font-sans">
                      Scheduled date: {letter.unlockDate ? new Date(letter.unlockDate).toLocaleDateString() : ''}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs text-[#1A1A1A] font-sans font-semibold">
                    <span className="flex items-center gap-1.5 hover:text-[#6B5B4A] transition-colors">
                      <BookOpen className="h-3.5 w-3.5 text-[#6B5B4A]" />
                      <span>Break Wax Seal & Read</span>
                    </span>
                    <span className="text-[#6B5B4A] font-serif italic text-[11px]">
                      {letter.signature}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
