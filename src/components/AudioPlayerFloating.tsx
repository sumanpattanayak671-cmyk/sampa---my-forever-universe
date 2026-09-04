import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Disc, ChevronDown, ChevronUp } from 'lucide-react';
import { MusicTrack } from '../types';

interface AudioPlayerFloatingProps {
  tracks: MusicTrack[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSelectTrack: (index: number) => void;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSelectTrack,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = tracks[currentTrackIndex] || tracks[0];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Audio autoplay prevented or error:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!track) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNextTrack}
      />

      <div
        id="floating-music-dock"
        className={`fixed bottom-4 right-4 z-40 transition-all duration-300 ${
          isMinimized ? 'w-auto' : 'w-[90vw] max-w-sm'
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-[#DED4C1] bg-white/95 p-3.5 natural-card-shadow backdrop-blur-xl">
          {/* Header row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 truncate">
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl overflow-hidden border border-[#DED4C1] bg-[#FAF7F2]">
                {track.albumCover ? (
                  <img
                    src={track.albumCover}
                    alt={track.title}
                    className={`h-full w-full object-cover ${isPlaying ? 'scale-105' : ''}`}
                  />
                ) : (
                  <Disc className={`h-5 w-5 text-[#6B5B4A] ${isPlaying ? 'animate-spin' : ''}`} />
                )}
                {isPlaying && (
                  <span className="absolute bottom-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B5B4A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B5B4A]"></span>
                  </span>
                )}
              </div>

              <div className="truncate">
                <div className="truncate text-xs font-semibold text-[#1A1A1A] font-sans">{track.title}</div>
                <div className="truncate text-[11px] text-[#6B5B4A] font-sans">{track.artist}</div>
              </div>
            </div>

            {/* Minimize / expand toggle */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="rounded-lg p-1 text-[#6B5B4A] hover:bg-[#EBE4D8] hover:text-[#1A1A1A] transition-colors"
                title={isMinimized ? 'Expand Player' : 'Minimize Player'}
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Full Player Controls (when not minimized) */}
          {!isMinimized && (
            <div className="mt-3 space-y-2.5 border-t border-[#E0D8CC] pt-2.5">
              {/* Progress Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="h-1 w-full cursor-pointer appearance-none rounded-lg bg-[#EBE4D8] accent-[#6B5B4A]"
                />
                <div className="flex justify-between text-[10px] text-[#6B5B4A] font-sans">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Player buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={onPrevTrack}
                    className="rounded-full p-1.5 text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                    title="Previous Song"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    id="audio-play-pause-btn"
                    onClick={onTogglePlay}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A] text-[#F5F2ED] shadow-sm hover:bg-[#333333] active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>

                  <button
                    onClick={onNextTrack}
                    className="rounded-full p-1.5 text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                    title="Next Song"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>

                {/* Volume & Mood badge */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-3.5 w-3.5 text-[#6B5B4A]" /> : <Volume2 className="h-3.5 w-3.5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="h-1 w-16 cursor-pointer appearance-none rounded-lg bg-[#EBE4D8] accent-[#6B5B4A]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
