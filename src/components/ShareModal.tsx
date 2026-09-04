import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Twitter, Facebook, ExternalLink } from 'lucide-react';
import { Memory, SiteSettings } from '../types';

interface ShareModalProps {
  memory: Memory;
  settings: SiteSettings;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ memory, settings, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Full shareable URL
  const origin = window.location.origin;
  const memoryUrl = `${origin}/memory/${memory.slug}`;
  const shareTitle = `${memory.title} — Sampa & My Universe`;
  const shareText = `Explore our romantic memory "${memory.title}" in our eternal universe created for Sampa.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(memoryUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: memoryUrl,
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle}\n${shareText}\n${memoryUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memoryUrl)}`;
    window.open(url, '_blank');
  };

  const handleX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(memoryUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-[#DED4C1] bg-white p-6 natural-card-shadow animate-in fade-in zoom-in-95 duration-200 text-[#1A1A1A]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#6B5B4A] hover:bg-[#EBE4D8] hover:text-[#1A1A1A] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FAF7F2] text-[#1A1A1A] border border-[#DED4C1]">
            <Share2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">Share This Memory</h3>
            <p className="text-xs text-[#6B5B4A] font-sans">Send this chapter of our story to Sampa</p>
          </div>
        </div>

        {/* Memory Preview Card */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-[#DED4C1] bg-[#FAF7F2]">
          {memory.photoUrls && memory.photoUrls[0] && (
            <div className="h-32 w-full overflow-hidden">
              <img
                src={memory.photoUrls[0]}
                alt={memory.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="p-3.5">
            <div className="text-[11px] font-medium text-[#6B5B4A] font-sans">{memory.date} • {memory.location}</div>
            <div className="font-serif text-sm font-normal text-[#1A1A1A] truncate">{memory.title}</div>
            <p className="mt-1 line-clamp-2 text-xs text-[#1A1A1A]/70 font-sans">{memory.summary}</p>
          </div>
        </div>

        {/* Social Share Grid */}
        <div className="mb-6 grid grid-cols-4 gap-2.5">
          <button
            onClick={handleWhatsApp}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-2.5 text-[#1A1A1A] hover:bg-[#EBE4D8] hover:scale-105 transition-all"
          >
            <MessageCircle className="h-5 w-5 text-emerald-700" />
            <span className="text-[10px] font-medium font-sans">WhatsApp</span>
          </button>

          <button
            onClick={handleFacebook}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-2.5 text-[#1A1A1A] hover:bg-[#EBE4D8] hover:scale-105 transition-all"
          >
            <Facebook className="h-5 w-5 text-blue-700" />
            <span className="text-[10px] font-medium font-sans">Facebook</span>
          </button>

          <button
            onClick={handleX}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-2.5 text-[#1A1A1A] hover:bg-[#EBE4D8] hover:scale-105 transition-all"
          >
            <Twitter className="h-5 w-5 text-[#1A1A1A]" />
            <span className="text-[10px] font-medium font-sans">X</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-2.5 text-[#1A1A1A] hover:bg-[#EBE4D8] hover:scale-105 transition-all"
          >
            <ExternalLink className="h-5 w-5 text-[#6B5B4A]" />
            <span className="text-[10px] font-medium font-sans">Native</span>
          </button>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-[#6B5B4A] font-sans">Direct Shareable Link</label>
          <div className="flex items-center gap-2 rounded-xl border border-[#DED4C1] bg-[#FAF7F2] p-1.5 pl-3">
            <span className="flex-1 truncate font-mono text-xs text-[#1A1A1A]">{memoryUrl}</span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-sans font-semibold transition-all ${
                copied
                  ? 'bg-emerald-700 text-[#F5F2ED]'
                  : 'bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#333333] active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
