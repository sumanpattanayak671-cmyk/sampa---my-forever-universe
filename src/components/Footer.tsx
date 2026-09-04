import React from 'react';
import { Heart, Sparkles, Shield, Lock, ArrowUp } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, navigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 border-t border-[#1A1A1A]/10 bg-[#EBE4D8]/30 py-14 text-[#6B5B4A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand & Dedication */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#1A1A1A]">
              <span>{settings.partnerName.toUpperCase()}</span>
              <span className="text-[#6B5B4A] opacity-40">—</span>
              <span className="text-[#6B5B4A] font-light italic text-base sm:text-lg">MY FOREVER UNIVERSE</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#1A1A1A]/70 font-serif italic">
              “{settings.heroTagline}”
            </p>
            <p className="text-xs text-[#6B5B4A]/80 font-sans uppercase tracking-widest text-[10px]">
              Handcrafted with devotion by {settings.authorName} for {settings.partnerName}.
            </p>
          </div>

          {/* Quick Portals */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] font-sans">
              Portals
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button onClick={() => navigate('/our-story')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Our Romantic Timeline
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/memories')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Shared Memories
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Photograph Archive
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/love-letters')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Time-Locked Letters
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/reasons')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Why I Love You
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/our-future')} className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors">
                  Future Dreams & Bucket List
                </button>
              </li>
            </ul>
          </div>

          {/* Secret & Admin */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] font-sans">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <button
                  onClick={() => navigate('/secret-room')}
                  className="flex items-center gap-1.5 text-[#6B5B4A] font-medium hover:text-[#1A1A1A] transition-colors"
                >
                  <Lock className="h-3 w-3" />
                  <span>The Secret Room</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/our-music')}
                  className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                >
                  Our Melody Playlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/promises')}
                  className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                >
                  Eternal Promises & Vows
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => navigate('/admin')}
                  className="flex items-center gap-1.5 text-[#6B5B4A]/70 hover:text-[#1A1A1A] transition-colors"
                >
                  <Shield className="h-3 w-3" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar from Natural Tones theme */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1A1A1A]/10 pt-6 text-[9px] font-sans uppercase tracking-[0.25em] text-[#1A1A1A]/60 sm:flex-row">
          <div>ARCHIVE CODE: 2024.11.08 // SYSTEM VERIFIED</div>
          <div className="flex items-center gap-1.5">
            <span>ETERNAL SYNC: ACTIVE</span>
            <Heart className="h-3 w-3 fill-[#6B5B4A] text-[#6B5B4A] inline" />
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-[#DED4C1] bg-white/80 px-3 py-1.5 text-[#6B5B4A] hover:bg-[#EBE4D8] hover:text-[#1A1A1A] transition-all"
          >
            <span>Top of Page</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
