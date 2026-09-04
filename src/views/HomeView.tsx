import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Clock, MapPin, ArrowRight, Share2, Compass, Lock, Image as ImageIcon, Music } from 'lucide-react';
import { UniverseData, Memory, Photo } from '../types';

interface HomeViewProps {
  data: UniverseData;
  navigate: (path: string) => void;
  onOpenLightbox: (photos: Photo[], index: number) => void;
  onOpenShare: (memory: Memory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  navigate,
  onOpenLightbox,
  onOpenShare,
}) => {
  const { settings, memories, photos, letters, reasons } = data;

  // Live relationship timer
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(settings.anniversaryDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, now - anniversary);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [settings.anniversaryDate]);

  const featuredMemory = memories.find((m) => m.featured) || memories[0];
  const favoritePhotos = photos.filter((p) => p.isFavorite).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[36px] border border-[#DED4C1] bg-[#EBE4D8]/50 px-6 py-16 text-center sm:px-12 sm:py-24 natural-card-shadow">
        <div className="relative z-10 mx-auto max-w-4xl space-y-6">
          <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
            <span>Archive Entry #001 // Dedicated to {settings.partnerName}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.15] tracking-tight text-[#1A1A1A]">
            A sanctuary designed <br className="hidden sm:inline" />
            <span className="italic font-serif text-[#6B5B4A]">{settings.partnerName.toUpperCase()}</span>
          </h1>

          <p className="mx-auto max-w-2xl font-serif text-lg sm:text-2xl font-normal italic text-[#1A1A1A]/85 leading-relaxed">
            “{settings.heroTagline}”
          </p>

          <p className="mx-auto max-w-xl text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
            {settings.heroSubtext}
          </p>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => navigate('/our-story')}
              className="flex items-center gap-2 rounded-full bg-[#1A1A1A] text-[#F5F2ED] px-7 py-3.5 text-xs font-sans uppercase tracking-widest font-bold hover:bg-[#333333] active:scale-95 transition-all shadow-sm"
            >
              <span>Explore Our Story</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigate('/gallery')}
              className="flex items-center gap-2 rounded-full border border-[#DED4C1] bg-white/90 px-6 py-3.5 text-xs font-sans uppercase tracking-widest font-semibold text-[#6B5B4A] hover:bg-[#EBE4D8] transition-all"
            >
              <ImageIcon className="h-4 w-4 text-[#6B5B4A]" />
              <span>Photo Archive</span>
            </button>

            <button
              onClick={() => navigate('/secret-room')}
              className="flex items-center gap-2 rounded-full border border-[#DED4C1] bg-[#EBE4D8] px-5 py-3.5 text-xs font-sans uppercase tracking-widest font-semibold text-[#6B5B4A] hover:bg-[#DED4C1] transition-all"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Secret Room</span>
            </button>
          </div>
        </div>

        {/* Live Together Counter Banner */}
        <div className="relative z-10 mx-auto mt-14 max-w-3xl rounded-[32px] border border-[#DED4C1] bg-white/80 p-6 sm:p-8 backdrop-blur-sm natural-card-shadow">
          <div className="mb-4 text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] text-[#6B5B4A] uppercase">
              <Heart className="h-3.5 w-3.5 fill-[#6B5B4A] text-[#6B5B4A]" />
              <span>Loving Each Other For</span>
              <Heart className="h-3.5 w-3.5 fill-[#6B5B4A] text-[#6B5B4A]" />
            </div>
            <div className="font-serif text-sm italic text-[#1A1A1A]/80">
              Loving each other from 1 October 2022
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-[#E0D8CC] bg-[#F9F7F4] p-4 text-center">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                {timeTogether.days}
              </div>
              <div className="mt-1 text-[10px] font-sans font-medium tracking-widest text-[#6B5B4A] uppercase">Days</div>
            </div>

            <div className="rounded-2xl border border-[#E0D8CC] bg-[#F9F7F4] p-4 text-center">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                {timeTogether.hours}
              </div>
              <div className="mt-1 text-[10px] font-sans font-medium tracking-widest text-[#6B5B4A] uppercase">Hours</div>
            </div>

            <div className="rounded-2xl border border-[#E0D8CC] bg-[#F9F7F4] p-4 text-center">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                {timeTogether.minutes}
              </div>
              <div className="mt-1 text-[10px] font-sans font-medium tracking-widest text-[#6B5B4A] uppercase">Minutes</div>
            </div>

            <div className="rounded-2xl border border-[#E0D8CC] bg-[#F9F7F4] p-4 text-center">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#6B5B4A]">
                {timeTogether.seconds}
              </div>
              <div className="mt-1 text-[10px] font-sans font-medium tracking-widest text-[#6B5B4A] uppercase">Seconds</div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs font-sans text-[#6B5B4A]">
            Every second, sunrise, and heartbeat counted since October 1, 2022
          </div>
        </div>
      </section>

      {/* Featured Memory Spotlight */}
      {featuredMemory && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-sans font-semibold tracking-widest text-[#6B5B4A] uppercase">
                Chapter Highlight
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                Special Memory Spotlight
              </h2>
            </div>
            <button
              onClick={() => navigate('/memories')}
              className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
            >
              <span>View All Memories ({memories.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white natural-card-shadow md:grid md:grid-cols-2">
            <div className="relative min-h-[300px] overflow-hidden bg-[#EBE4D8]">
              <img
                src={featuredMemory.photoUrls[0] || 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200'}
                alt={featuredMemory.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 left-4 rounded-full bg-white/90 border border-[#E0D8CC] px-3 py-1 text-[10px] font-sans uppercase tracking-wider font-semibold text-[#6B5B4A] backdrop-blur-md">
                {featuredMemory.category}
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-10">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B5B4A]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {featuredMemory.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {featuredMemory.location}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                  {featuredMemory.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#1A1A1A]/75 font-serif italic">
                  “{featuredMemory.summary}”
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {featuredMemory.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#E0D8CC] bg-[#F5F2ED] px-2.5 py-0.5 text-[10px] font-sans text-[#6B5B4A]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#E0D8CC] pt-6">
                <button
                  onClick={() => navigate(`/memory/${featuredMemory.slug}`)}
                  className="flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-xs font-sans uppercase tracking-widest font-bold text-[#F5F2ED] hover:bg-[#333333] transition-colors shadow-sm"
                >
                  <span>Read Full Chapter</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => onOpenShare(featuredMemory)}
                  className="flex items-center gap-1.5 rounded-full border border-[#DED4C1] bg-[#F5F2ED] px-4 py-2.5 text-xs font-sans font-medium text-[#6B5B4A] hover:bg-[#EBE4D8] transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Favorite Photos Grid Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="text-[10px] font-sans font-semibold tracking-widest text-[#6B5B4A] uppercase">
              Photo Archive
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
              Moments Frozen in Stardust
            </h2>
          </div>
          <button
            onClick={() => navigate('/gallery')}
            className="flex items-center gap-1.5 text-xs font-sans font-medium text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
          >
            <span>Explore Full Gallery ({photos.length})</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {favoritePhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(favoritePhotos, idx)}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-[#DED4C1] bg-white transition-all hover:shadow-lg hover:border-[#6B5B4A]"
            >
              <img
                src={photo.thumbnailUrl || photo.url}
                alt={photo.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-3">
                <div className="text-[11px] font-semibold text-white truncate">{photo.title}</div>
                <div className="text-[10px] text-[#EBE4D8] truncate">{photo.album}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Love Letters & Reasons Portal Bento */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Letters Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-6 sm:p-8 flex flex-col justify-between natural-card-shadow">
            <div className="space-y-4">
              <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
                <span>SEALED ENVELOPES</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                Love Letters for Sampa
              </h3>
              <p className="text-xs leading-relaxed text-[#1A1A1A]/70">
                Intimate digital letters penned from my deepest thoughts, including scheduled time capsules set to unlock on our future milestones.
              </p>
              <div className="space-y-2 pt-2">
                {letters.slice(0, 2).map((letter) => (
                  <div
                    key={letter.id}
                    onClick={() => navigate('/love-letters')}
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] p-3 hover:border-[#6B5B4A]/40 transition-colors"
                  >
                    <div className="truncate pr-2">
                      <div className="truncate text-xs font-semibold text-[#1A1A1A]">{letter.title}</div>
                      <div className="text-[10px] text-[#6B5B4A]">{letter.date}</div>
                    </div>
                    {letter.isLocked ? (
                      <span className="flex items-center gap-1 rounded-full bg-[#EBE4D8] px-2.5 py-0.5 text-[10px] text-[#6B5B4A] border border-[#DED4C1] whitespace-nowrap font-medium">
                        <Lock className="h-2.5 w-2.5" /> Locked
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#1A1A1A] text-white px-2.5 py-0.5 text-[10px] font-sans uppercase tracking-wider font-semibold whitespace-nowrap">
                        Read
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/love-letters')}
              className="mt-6 flex items-center justify-center gap-2 rounded-full border border-[#DED4C1] bg-[#EBE4D8] py-2.5 text-xs font-sans uppercase tracking-widest font-semibold text-[#6B5B4A] hover:bg-[#DED4C1] transition-colors"
            >
              <span>Open Letter Vault</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Reasons Card */}
          <div className="relative overflow-hidden rounded-[32px] border border-[#DED4C1] bg-white p-6 sm:p-8 flex flex-col justify-between natural-card-shadow">
            <div className="space-y-4">
              <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
                <span>ENDLESS AFFECTION</span>
              </div>
              <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                Reasons Why I Love You
              </h3>
              <p className="text-xs leading-relaxed text-[#1A1A1A]/70">
                From your radiant laugh to how our hands fit together without slipping. Each reason cataloged for you to read anytime.
              </p>
              <div className="space-y-2 pt-2">
                {reasons.slice(0, 2).map((reason) => (
                  <div
                    key={reason.id}
                    onClick={() => navigate('/reasons')}
                    className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#E0D8CC] bg-[#FAF7F2] p-3 hover:border-[#6B5B4A]/40 transition-colors"
                  >
                    <div className="truncate pr-2">
                      <div className="truncate text-xs font-semibold text-[#1A1A1A]">
                        #{reason.number} {reason.title}
                      </div>
                      <div className="text-[10px] text-[#6B5B4A]">{reason.category}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B5B4A] font-medium">
                      <Heart className="h-3 w-3 fill-[#6B5B4A]" />
                      <span>{reason.heartCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate('/reasons')}
              className="mt-6 flex items-center justify-center gap-2 rounded-full border border-[#DED4C1] bg-[#EBE4D8] py-2.5 text-xs font-sans uppercase tracking-widest font-semibold text-[#6B5B4A] hover:bg-[#DED4C1] transition-colors"
            >
              <span>Explore All Reasons</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
