import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorRetryBannerProps {
  onRetry: () => void;
  message?: string;
}

export const ErrorRetryBanner: React.FC<ErrorRetryBannerProps> = ({ onRetry, message }) => {
  return (
    <div className="mx-auto my-6 max-w-2xl rounded-2xl border border-[#DED4C1] bg-white p-4 text-[#1A1A1A] natural-card-shadow">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="rounded-full bg-[#FAF7F2] border border-[#DED4C1] p-2 text-[#6B5B4A]">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="font-serif font-normal text-[#1A1A1A]">
              “Something interrupted our universe.”
            </div>
            <div className="text-xs text-[#6B5B4A] font-sans">
              {message || 'A momentary celestial network disruption occurred.'}
            </div>
          </div>
        </div>

        <button
          onClick={onRetry}
          className="flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-4 py-2 text-xs font-sans uppercase tracking-wider font-bold text-[#F5F2ED] hover:bg-[#333333] active:scale-95 transition-all whitespace-nowrap"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>TRY AGAIN</span>
        </button>
      </div>
    </div>
  );
};
