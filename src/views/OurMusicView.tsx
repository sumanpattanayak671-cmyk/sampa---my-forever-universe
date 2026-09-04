import React from 'react';
import { Sparkles, Music, Play, Pause, Disc, Heart } from 'lucide-react';
import { MusicTrack } from '../types';

interface OurMusicViewProps {
  tracks: MusicTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
  onTogglePlay: () => void;
}

export const OurMusicView: React.FC<OurMusicViewProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
}) => {
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Harmonies of Our Heart // Soundtrack</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          Our Melody Lounge
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          Melodies that play in my mind whenever I think of Sampa. You can keep this playing gently in the background while exploring the universe.
        </p>
      </div>

      {/* Featured Vinyl Showcase */}
      {currentTrack && (
        <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-6 sm:p-10 natural-card-shadow">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            {/* Rotating Album Art */}
            <div className="relative flex h-48 w-48 sm:h-56 sm:w-56 flex-shrink-0 items-center justify-center rounded-full border-4 border-[#DED4C1] bg-[#1A1A1A] shadow-lg overflow-hidden group">
              <img
                src={currentTrack.albumCover}
                alt={currentTrack.title}
                className={`h-full w-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '20s' }}
              />
              <div className="absolute h-12 w-12 rounded-full border-2 border-[#DED4C1] bg-[#F5F2ED] flex items-center justify-center shadow-inner">
                <Disc className="h-5 w-5 text-[#6B5B4A]" />
              </div>
            </div>

            {/* Track Info & Dedication */}
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="inline-block rounded-full bg-[#EBE4D8] border border-[#DED4C1] px-3 py-1 text-[10px] font-sans uppercase tracking-wider font-semibold text-[#6B5B4A]">
                <span>Currently Selected</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                {currentTrack.title}
              </h2>

              <p className="text-sm font-medium text-[#6B5B4A]">{currentTrack.artist}</p>

              {currentTrack.specialNote && (
                <div className="rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] p-4 font-serif text-base italic text-[#1A1A1A]/85">
                  “{currentTrack.specialNote}”
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                <button
                  onClick={onTogglePlay}
                  className="flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-6 py-3 text-xs font-sans uppercase tracking-widest font-bold text-[#F5F2ED] shadow-sm hover:bg-[#333333] active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause Melody</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 ml-0.5" />
                      <span>Play Melody</span>
                    </>
                  )}
                </button>

                <div className="text-xs text-[#6B5B4A] font-sans">
                  Duration: {currentTrack.duration} • Mood: {currentTrack.mood}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Playlist Table */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-normal text-[#1A1A1A] px-2">
          All Romantic Tracks ({tracks.length})
        </h3>

        <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white natural-card-shadow">
          {tracks.map((track, idx) => {
            const isThisPlaying = currentTrackIndex === idx && isPlaying;
            return (
              <div
                key={track.id}
                onClick={() => {
                  if (currentTrackIndex === idx) {
                    onTogglePlay();
                  } else {
                    onSelectTrack(idx);
                  }
                }}
                className={`flex cursor-pointer items-center justify-between p-4 px-6 border-b border-[#E0D8CC] last:border-0 transition-colors ${
                  currentTrackIndex === idx
                    ? 'bg-[#EBE4D8]/50 text-[#1A1A1A]'
                    : 'text-[#1A1A1A]/80 hover:bg-[#FAF7F2]'
                }`}
              >
                <div className="flex items-center gap-4 truncate">
                  <button className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#EBE4D8] text-[#6B5B4A] group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                    {isThisPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>

                  <div className="truncate">
                    <div className="truncate text-sm font-semibold text-[#1A1A1A]">{track.title}</div>
                    <div className="truncate text-xs text-[#6B5B4A]">{track.artist}</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-[#6B5B4A] font-sans">
                  <span className="hidden sm:inline rounded-full bg-[#F5F2ED] border border-[#E0D8CC] px-2.5 py-0.5 text-[11px] text-[#6B5B4A]">
                    {track.mood}
                  </span>
                  <span>{track.duration}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
