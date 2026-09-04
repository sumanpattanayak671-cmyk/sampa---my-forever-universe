import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Share2, Tag, Copy, Check, MessageCircle, Twitter, Facebook, ExternalLink, Heart } from 'lucide-react';
import { Memory, SiteSettings, Photo } from '../types';

interface MemoryDetailViewProps {
  slug: string;
  memories: Memory[];
  settings: SiteSettings;
  navigate: (path: string) => void;
  onOpenLightbox: (photos: Photo[], index: number) => void;
}

export const MemoryDetailView: React.FC<MemoryDetailViewProps> = ({
  slug,
  memories,
  settings,
  navigate,
  onOpenLightbox,
}) => {
  const [copied, setCopied] = useState(false);

  const memory = memories.find((m) => m.slug === slug || m.id === slug);

  if (!memory) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center px-4">
        <h2 className="font-serif-romantic text-2xl font-bold text-white">Memory Not Found</h2>
        <p className="mt-2 text-sm text-slate-400">
          This chapter may have shifted across parallel dimensions.
        </p>
        <button
          onClick={() => navigate('/memories')}
          className="mt-6 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-semibold text-white"
        >
          Return to Memories Archive
        </button>
      </div>
    );
  }

  const memoryUrl = `${window.location.origin}/memory/${memory.slug}`;
  const shareTitle = `${memory.title} — Written for Sampa`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memoryUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: memory.summary,
          url: memoryUrl,
        });
      } catch (err) {
        console.log('Share canceled', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${memory.summary}\n${memoryUrl}`)}`,
      '_blank'
    );
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memoryUrl)}`, '_blank');
  };

  const handleX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(memoryUrl)}`,
      '_blank'
    );
  };

  // Prepare photos for lightbox
  const photoObjects: Photo[] = (memory.photoUrls || []).map((url, i) => ({
    id: `mem-photo-${i}`,
    title: memory.title,
    url,
    caption: memory.summary,
    date: memory.date,
    category: memory.category,
    album: 'Memory Gallery',
    isFavorite: true,
    order: i,
  }));

  return (
    <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-10">
      {/* Back Button & Share Top Bar */}
      <div className="flex items-center justify-between border-b border-[#DED4C1] pb-4">
        <button
          onClick={() => navigate('/memories')}
          className="flex items-center gap-2 text-xs font-sans font-semibold text-[#6B5B4A] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>All Memories</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B5B4A] font-medium hidden sm:inline font-sans">
            Share chapter with Sampa:
          </span>
          <button
            onClick={handleWhatsApp}
            title="Share on WhatsApp"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DED4C1] bg-white text-[#6B5B4A] hover:bg-[#EBE4D8] transition-all"
          >
            <MessageCircle className="h-4 w-4" />
          </button>
          <button
            onClick={handleFacebook}
            title="Share on Facebook"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DED4C1] bg-white text-[#6B5B4A] hover:bg-[#EBE4D8] transition-all"
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button
            onClick={handleX}
            title="Share on X"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DED4C1] bg-white text-[#6B5B4A] hover:bg-[#EBE4D8] transition-all"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy Direct Link"
            className="flex items-center gap-1.5 rounded-full border border-[#DED4C1] bg-white px-3 py-1.5 text-xs text-[#1A1A1A] hover:bg-[#EBE4D8] transition-all font-sans"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-[#6B5B4A]" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <header className="space-y-4 text-center">
        <div className="inline-block bg-[#EBE4D8] border border-[#DED4C1] text-[#6B5B4A] px-3.5 py-1 rounded-full text-[9px] font-sans uppercase tracking-widest font-semibold">
          <span>{memory.category}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1A1A]">
          {memory.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#6B5B4A]">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            {memory.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {memory.location}
          </span>
        </div>
      </header>

      {/* Photo Gallery Grid for this Memory */}
      {photoObjects.length > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {photoObjects.map((p, idx) => (
              <div
                key={idx}
                onClick={() => onOpenLightbox(photoObjects, idx)}
                className="group relative h-72 sm:h-80 cursor-pointer overflow-hidden rounded-[28px] border border-[#DED4C1] bg-white natural-card-shadow"
              >
                <img
                  src={p.url}
                  alt={memory.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="rounded-full bg-white/90 border border-[#DED4C1] px-4 py-2 text-xs font-sans font-semibold text-[#1A1A1A] backdrop-blur-sm">
                    Click to Enlarge
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Narrative Body */}
      <div className="rounded-[32px] border border-[#DED4C1] bg-white p-6 sm:p-10 space-y-6 natural-card-shadow">
        <div className="border-l-2 border-[#6B5B4A] pl-4 font-serif text-lg sm:text-xl italic text-[#1A1A1A] leading-relaxed">
          “{memory.summary}”
        </div>

        <div className="font-sans text-sm sm:text-base leading-relaxed text-[#1A1A1A]/80 whitespace-pre-line space-y-4">
          {memory.description}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 border-t border-[#E0D8CC] pt-6">
          <span className="text-xs text-[#6B5B4A] font-sans">Tags:</span>
          {memory.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#DED4C1] bg-[#F5F2ED] px-3 py-1 text-xs text-[#6B5B4A] font-sans"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Share memory footer bar */}
      <div className="rounded-[28px] border border-[#DED4C1] bg-[#FAF7F2] p-6 text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-[#1A1A1A] font-serif font-normal text-base">
          <Heart className="h-4 w-4 fill-[#6B5B4A] text-[#6B5B4A]" />
          <span>Share this memory with {settings.partnerName}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 rounded-full bg-[#1A1A1A] px-5 py-2.5 text-xs font-sans font-semibold text-[#F5F2ED] hover:bg-[#333333]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Send via WhatsApp</span>
          </button>
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-2 rounded-full bg-[#6B5B4A] px-5 py-2.5 text-xs font-sans font-semibold text-[#F5F2ED] hover:bg-[#584a3c]"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Anywhere</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-full border border-[#DED4C1] bg-white px-5 py-2.5 text-xs font-sans font-semibold text-[#1A1A1A] hover:bg-[#EBE4D8]"
          >
            {copied ? <Check className="h-4 w-4 text-[#6B5B4A]" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy Direct Link'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
