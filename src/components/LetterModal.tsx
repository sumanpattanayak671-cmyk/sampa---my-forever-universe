import React from 'react';
import { X, Calendar, Lock, Heart, Sparkles } from 'lucide-react';
import { LoveLetter } from '../types';

interface LetterModalProps {
  letter: LoveLetter;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ letter, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-[#DED4C1] bg-[#FAF7F2] p-6 sm:p-10 natural-card-shadow text-[#1A1A1A]"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-[#6B5B4A] hover:bg-[#EBE4D8] hover:text-[#1A1A1A] transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Wax Seal Motif */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#1A1A1A] text-[#F5F2ED] shadow-sm border-2 border-[#DED4C1]">
          <Heart className="h-7 w-7 fill-[#F5F2ED]" />
        </div>

        {/* Header */}
        <div className="mb-6 text-center space-y-2 border-b border-[#E0D8CC] pb-6">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#6B5B4A] font-sans font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Digital Sealed Letter</span>
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
            {letter.title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-xs text-[#6B5B4A] font-sans">
            <Calendar className="h-3.5 w-3.5 text-[#6B5B4A]" />
            <span>Written: {letter.date}</span>
          </div>
        </div>

        {/* Letter Body */}
        {letter.isLocked ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 rounded-2xl border border-[#DED4C1] bg-[#F5F2ED] p-6">
            <Lock className="h-10 w-10 text-[#6B5B4A]" />
            <h3 className="font-serif text-lg font-normal text-[#1A1A1A]">
              Time-Locked Letter
            </h3>
            <p className="max-w-md text-sm text-[#1A1A1A]/70 font-sans leading-relaxed">
              This letter is sealed in a cosmic time capsule. It will automatically unlock on{' '}
              <span className="font-semibold text-[#1A1A1A]">
                {letter.unlockDate ? new Date(letter.unlockDate).toLocaleDateString() : 'its scheduled date'}
              </span>
              .
            </p>
          </div>
        ) : (
          <div className="font-serif text-lg sm:text-xl leading-relaxed text-[#1A1A1A] whitespace-pre-line space-y-4 px-2 sm:px-6">
            {letter.content}
          </div>
        )}

        {/* Signature */}
        {!letter.isLocked && (
          <div className="mt-8 border-t border-[#E0D8CC] pt-6 text-right font-serif italic text-[#6B5B4A] text-lg">
            {letter.signature || 'Forever Yours ❤️'}
          </div>
        )}
      </div>
    </div>
  );
};
