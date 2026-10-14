import React from 'react';
import { X, Image, Sparkles, Sliders, Check } from 'lucide-react';
import { WALLPAPERS } from '../../data/mockData';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeWallpaperId: string;
  onSelectWallpaper: (id: string) => void;
  glassOpacity: number;
  onChangeGlassOpacity: (val: number) => void;
  blurStrength: number;
  onChangeBlurStrength: (val: number) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  activeWallpaperId,
  onSelectWallpaper,
  glassOpacity,
  onChangeGlassOpacity,
  blurStrength,
  onChangeBlurStrength,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-[24px] bg-[#12141A]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.16)] p-5 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-[#E85D68]" />
            <h3 className="text-sm font-semibold text-[#F3F4F6]">
              Theme & Glass Atmosphere
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#9CA3AF] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wallpaper Grid */}
        <div className="mb-5">
          <label className="text-xs font-medium text-[#9CA3AF] mb-2.5 block">
            Select Atmospheric Wallpaper
          </label>
          <div className="grid grid-cols-2 gap-3">
            {WALLPAPERS.map((wp) => {
              const isSelected = activeWallpaperId === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => onSelectWallpaper(wp.id)}
                  className={`p-3 rounded-[16px] text-left transition-all border cursor-pointer ${
                    isSelected
                      ? 'border-[#E85D68] bg-[#E85D68]/10 shadow-[0_0_15px_rgba(232,93,104,0.25)]'
                      : 'border-white/[0.06] bg-[#1A1D24]/75 hover:bg-[#232732]/90 hover:border-white/[0.12]'
                  }`}
                >
                  <div
                    className="w-full h-16 rounded-[10px] mb-2 border border-white/[0.08] flex items-center justify-center relative overflow-hidden"
                    style={{ background: wp.gradient }}
                  >
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#E85D68] text-white flex items-center justify-center shadow-md">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#F3F4F6] truncate">
                    {wp.name}
                  </div>
                  <div className="text-[10px] text-[#6B7280] truncate">
                    {wp.tone}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Glass Settings */}
        <div className="space-y-4 rounded-[16px] bg-[#1A1D24]/50 border border-white/[0.05] p-3.5">
          <div>
            <div className="flex justify-between text-xs text-[#9CA3AF] mb-1.5">
              <span>Card Glass Opacity</span>
              <span className="font-mono text-[#F3F4F6]">{Math.round(glassOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={glassOpacity}
              onChange={(e) => onChangeGlassOpacity(parseFloat(e.target.value))}
              className="w-full accent-[#E85D68] h-1.5 bg-[#08090C] rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-[#9CA3AF] mb-1.5">
              <span>Backdrop Blur Filter</span>
              <span className="font-mono text-[#F3F4F6]">{blurStrength}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="36"
              step="2"
              value={blurStrength}
              onChange={(e) => onChangeBlurStrength(parseInt(e.target.value, 10))}
              className="w-full accent-[#E85D68] h-1.5 bg-[#08090C] rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#E85D68] hover:brightness-110 shadow-[0_0_15px_rgba(232,93,104,0.3)] transition-all cursor-pointer"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
