import React, { useState } from 'react';
import { Sparkles, Lock, KeyRound, Unlock, Heart, Music, AlertCircle, Eye, EyeOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UniverseData, Photo } from '../types';

interface SecretRoomViewProps {
  data: UniverseData;
  onOpenLightbox: (photos: Photo[], index: number) => void;
}

interface SecretUnlockedContent {
  title: string;
  secretLetter: string;
  secretPhotos: string[];
  specialAudioUrl?: string;
}

export const SecretRoomView: React.FC<SecretRoomViewProps> = ({ data, onOpenLightbox }) => {
  const { secretRoom, settings } = data;
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [unlockedData, setUnlockedData] = useState<SecretUnlockedContent | null>(null);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter our secret password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/secret-room/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || 'That is not the secret phrase, my love.');
      } else {
        setUnlockedData({
          title: json.title,
          secretLetter: json.secretLetter,
          secretPhotos: json.secretPhotos || [],
          specialAudioUrl: json.specialAudioUrl,
        });

        // Trigger romantic celebration confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#fb7185', '#fda4af', '#fbbf24'],
        });
      }
    } catch (err: any) {
      setError('Connection interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const secretPhotoObjects: Photo[] = (unlockedData?.secretPhotos || []).map((url, idx) => ({
    id: `secret-photo-${idx}`,
    title: 'Secret Sanctuary Photo',
    url,
    date: 'Forever',
    category: 'Secret Room',
    album: 'Secret Vault',
    isFavorite: true,
    order: idx,
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>Inner Sanctuary // Private Chamber</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          The Secret Room
        </h1>
        <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
          A deeply private chamber dedicated exclusively to Sampa. Only those who know the sacred phrase may enter.
        </p>
      </div>

      {!unlockedData ? (
        /* Locked Door View */
        <div className="mx-auto max-w-md overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-8 natural-card-shadow text-center space-y-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-[#DED4C1] bg-[#FAF7F2] text-[#6B5B4A] shadow-inner">
            <Lock className="h-10 w-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-xl font-normal text-[#1A1A1A]">
              Chamber Seal Active
            </h3>
            <p className="text-xs text-[#1A1A1A]/70 font-sans">
              Enter our secret keyword or phrase to open the chamber.
            </p>
          </div>

          {/* Clue Box */}
          {secretRoom?.hint && (
            <div className="rounded-2xl border border-[#DED4C1] bg-[#F5F2ED] p-4 text-xs text-[#6B5B4A] font-sans">
              <span className="font-semibold text-[#1A1A1A]">Sacred Clue: </span>
              “{secretRoom.hint}”
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-[#FDF2F2] border border-[#F8D7DA] p-3 text-xs text-[#721C24] text-left font-sans">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5B4A]" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter secret word..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[#DED4C1] bg-white py-3 pl-10 pr-10 text-sm text-[#1A1A1A] placeholder-[#6B5B4A]/60 focus:border-[#6B5B4A] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B5B4A] hover:text-[#1A1A1A]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#1A1A1A] py-3.5 text-xs font-sans uppercase tracking-widest font-bold text-[#F5F2ED] shadow-sm hover:bg-[#333333] active:scale-95 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span>Unlocking Chamber...</span>
              ) : (
                <>
                  <Unlock className="h-4 w-4" />
                  <span>Unlock Our Sanctuary</span>
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* Unlocked Content View */
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="rounded-[32px] border border-[#DED4C1] bg-white p-8 sm:p-12 natural-card-shadow text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF7F2] text-[#6B5B4A] border border-[#DED4C1]">
              <Heart className="h-8 w-8 fill-[#6B5B4A]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#6B5B4A] font-semibold font-sans">
                Sanctuary Revealed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                {unlockedData.title}
              </h2>
            </div>

            {/* Secret Letter Narrative */}
            <div className="mx-auto max-w-2xl rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] p-6 sm:p-8 text-left font-serif text-lg sm:text-xl leading-relaxed text-[#1A1A1A] whitespace-pre-line shadow-inner">
              {unlockedData.secretLetter}
            </div>

            {/* Secret Photos Gallery */}
            {secretPhotoObjects.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="font-serif text-xl font-normal text-[#1A1A1A]">
                  Our Private Constellation Photos
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {secretPhotoObjects.map((photo, idx) => (
                    <div
                      key={idx}
                      onClick={() => onOpenLightbox(secretPhotoObjects, idx)}
                      className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-[#DED4C1] bg-white natural-card-shadow"
                    >
                      <img
                        src={photo.url}
                        alt="Secret Sanctuary Photo"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-[#1A1A1A] px-3 py-1 text-xs font-semibold text-white">
                          Enlarge
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setUnlockedData(null);
                setPassword('');
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#DED4C1] bg-white px-6 py-2.5 text-xs font-sans font-semibold text-[#6B5B4A] hover:bg-[#EBE4D8]"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Lock Sanctuary Door</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
