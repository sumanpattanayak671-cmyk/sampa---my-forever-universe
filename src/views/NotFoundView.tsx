import React from 'react';
import { Compass, Sparkles, Heart } from 'lucide-react';

interface NotFoundViewProps {
  navigate: (path: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ navigate }) => {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#DED4C1] bg-white p-4 natural-card-shadow">
        <Compass className="h-12 w-12 text-[#6B5B4A] animate-spin" style={{ animationDuration: '20s' }} />
        <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-[#6B5B4A]" />
      </div>

      <span className="text-xs font-sans font-semibold tracking-widest uppercase text-[#6B5B4A]">
        Error 404 • Lost in Between
      </span>

      <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] max-w-xl">
        “You wandered into a path that hasn't been written yet.”
      </h1>

      <p className="mt-4 max-w-md text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
        The coordinate you reached isn't here, but our true home and memories are always waiting for you.
      </p>

      <button
        id="return-to-universe-btn"
        onClick={() => navigate('/')}
        className="mt-8 flex items-center gap-2 rounded-full bg-[#1A1A1A] px-8 py-3.5 text-xs font-sans font-bold tracking-widest uppercase text-[#F5F2ED] shadow-sm hover:bg-[#333333] active:scale-95 transition-all"
      >
        <Heart className="h-4 w-4 fill-[#F5F2ED]" />
        <span>Return to Our Sanctuary</span>
      </button>
    </div>
  );
};
