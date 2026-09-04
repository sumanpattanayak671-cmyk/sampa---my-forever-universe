import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Heart, Calendar, Folder } from 'lucide-react';
import { Photo } from '../types';

interface LightboxModalProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photos,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const photo = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 backdrop-blur-xl animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 rounded-full bg-white/90 border border-[#DED4C1] p-2 text-[#1A1A1A] hover:bg-[#EBE4D8] transition-all"
        aria-label="Close Lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Nav Left */}
      {photos.length > 1 && (
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-6 z-50 rounded-full bg-white/90 border border-[#DED4C1] p-3 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] hover:scale-105 active:scale-95 transition-all"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Nav Right */}
      {photos.length > 1 && (
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-6 z-50 rounded-full bg-white/90 border border-[#DED4C1] p-3 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F5F2ED] hover:scale-105 active:scale-95 transition-all"
          aria-label="Next Photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div className="flex flex-col items-center max-h-[92vh] max-w-5xl w-full">
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl max-h-[75vh]">
          <img
            src={photo.url}
            alt={photo.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
            loading="eager"
          />
          {photo.isFavorite && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#1A1A1A]/90 px-3 py-1 text-xs font-semibold text-[#F5F2ED] shadow-lg backdrop-blur-sm">
              <Heart className="h-3.5 w-3.5 fill-[#F5F2ED]" />
              <span>Favorite</span>
            </div>
          )}
        </div>

        {/* Metadata Details */}
        <div className="mt-4 w-full max-w-2xl text-center space-y-1.5 px-4">
          <h3 className="font-serif text-lg sm:text-xl font-normal text-white">
            {photo.title}
          </h3>
          {photo.caption && (
            <p className="text-sm italic text-[#EBE4D8] max-w-xl mx-auto font-serif">
              “{photo.caption}”
            </p>
          )}
          <div className="flex items-center justify-center gap-4 text-xs font-sans text-[#EBE4D8]/80 pt-1">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {photo.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Folder className="h-3.5 w-3.5" />
              {photo.album || 'Archive'}
            </span>
            <span>•</span>
            <span>
              {currentIndex + 1} of {photos.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
