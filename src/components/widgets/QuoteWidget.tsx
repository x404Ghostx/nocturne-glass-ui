import React, { useState } from 'react';
import { Quote as QuoteIcon, RefreshCw } from 'lucide-react';
import { QUOTES } from '../../data/mockData';

export const QuoteWidget: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);

  const current = QUOTES[index];

  const handleNext = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
      setIsRotating(false);
    }, 150);
  };

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[250px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Primary Accent Coral Rose Quote Icon */}
            <QuoteIcon strokeWidth={1.75} className="w-4 h-4 text-[#E85D68]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Daily Stoic
            </h2>
          </div>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next quote"
            className="p-1 rounded-full text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Quote Content */}
        <div className="rounded-[14px] bg-[#1A1D24]/50 border border-white/[0.04] p-3.5 my-1 flex flex-col justify-center">
          <p className="text-[13px] text-[#F3F4F6] font-light italic leading-relaxed tracking-wide">
            "{current.quote}"
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#E85D68]">
              — {current.author}
            </span>
            <span className="text-[10px] text-[#6B7280]">
              {current.source}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04] mt-2">
        <span>Curated Reflection</span>
        <span>{index + 1} of {QUOTES.length}</span>
      </div>
    </div>
  );
};
