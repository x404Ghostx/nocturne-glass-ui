import React from 'react';
import { X, Settings, Clock, Volume2, Shield, Info, Command, Github } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
  is24h: boolean;
  onToggleTimeFormat: () => void;
  soundEffects: boolean;
  onToggleSoundEffects: () => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userName,
  onUpdateUserName,
  is24h,
  onToggleTimeFormat,
  soundEffects,
  onToggleSoundEffects,
  onResetDefaults,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg rounded-[24px] bg-[#12141A]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.16)] p-5 z-10 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#E85D68]" />
            <h3 className="text-sm font-semibold text-[#F3F4F6]">
              Dashboard Preferences
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

        {/* Setting Items */}
        <div className="space-y-4">
          {/* User Name */}
          <div className="p-3 rounded-[16px] bg-[#1A1D24]/75 border border-white/[0.05]">
            <label className="text-xs font-medium text-[#9CA3AF] block mb-1.5">
              Profile Display Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => onUpdateUserName(e.target.value)}
              className="w-full bg-[#12141A] px-3 py-2 rounded-[12px] text-sm text-[#F3F4F6] border border-white/[0.08] focus:border-[#E85D68]/50 focus:outline-none"
              placeholder="e.g. Ghost, Alex, etc."
            />
          </div>

          {/* Clock format */}
          <div className="p-3 rounded-[16px] bg-[#1A1D24]/75 border border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#9CA3AF]" />
              <div>
                <div className="text-xs font-semibold text-[#F3F4F6]">
                  24-Hour Military Time
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Switch between standard 12h AM/PM and 24h
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleTimeFormat}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                is24h ? 'bg-[#E85D68]' : 'bg-white/[0.12]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  is24h ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Sound Effects */}
          <div className="p-3 rounded-[16px] bg-[#1A1D24]/75 border border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[#9CA3AF]" />
              <div>
                <div className="text-xs font-semibold text-[#F3F4F6]">
                  Audio Focus Generator
                </div>
                <div className="text-[11px] text-[#6B7280]">
                  Allow Web Audio API atmospheric sound synthesis
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleSoundEffects}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                soundEffects ? 'bg-[#E85D68]' : 'bg-white/[0.12]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  soundEffects ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Keyboard Shortcuts Reference */}
          <div className="p-3 rounded-[16px] bg-[#1A1D24]/50 border border-white/[0.05]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F3F4F6] mb-2">
              <Command className="w-3.5 h-3.5 text-[#E85D68]" />
              <span>Keyboard Shortcuts</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-[#9CA3AF]">Open Command Palette</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/[0.08] text-[#F3F4F6] font-mono">⌘K / Ctrl+K</kbd>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-[#9CA3AF]">Launch Quick Apps</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/[0.08] text-[#F3F4F6] font-mono">Keys 1 – 8</kbd>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#9CA3AF]">Close Modals & Drawers</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/[0.08] text-[#F3F4F6] font-mono">ESC</kbd>
              </div>
            </div>
          </div>

          {/* About Specification & Attribution */}
          <div className="p-3 rounded-[16px] bg-[#12141A] border border-white/[0.04] text-[11px] text-[#6B7280] space-y-1">
            <div className="text-xs font-medium text-[#F3F4F6] flex items-center justify-between">
              <span>👻 Nocturne Glass OS v1.0</span>
              <span className="text-[#E85D68] font-mono">DESIGN.md</span>
            </div>
            <p>
              Open-Source UI Specification by @x404ghostx. Atmospheric dark-glass design tokens with specular outer borders, top rim inner highlights, and Coral Rose accents.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between">
          <button
            type="button"
            onClick={onResetDefaults}
            className="text-xs text-[#9CA3AF] hover:text-[#E85D68] transition-colors cursor-pointer"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-white bg-[#E85D68] hover:brightness-110 shadow-[0_0_15px_rgba(232,93,104,0.3)] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
