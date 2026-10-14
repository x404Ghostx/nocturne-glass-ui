import React from 'react';
import { LayoutGrid, Bookmark as BookmarkIcon, CheckSquare, Music, FileText, Settings, Plus } from 'lucide-react';

export type DockTab = 'dashboard' | 'bookmarks' | 'tasks' | 'media' | 'notes' | 'settings';

interface LeftDockProps {
  activeTab: DockTab;
  onSelectTab: (tab: DockTab) => void;
  onQuickAdd: () => void;
}

export const LeftDock: React.FC<LeftDockProps> = ({
  activeTab,
  onSelectTab,
  onQuickAdd,
}) => {
  const navItems: { id: DockTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutGrid },
    { id: 'bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'media', label: 'Focus Audio', icon: Music },
    { id: 'notes', label: 'Scratchpad', icon: FileText },
    { id: 'settings', label: 'Preferences', icon: Settings },
  ];

  return (
    <aside
      aria-label="Sidebar Dock"
      className="hidden md:flex flex-col items-center justify-between w-[54px] py-4 rounded-[26px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] select-none shrink-0"
    >
      {/* Brand Glyph / Mini Orb */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-[#E85D68] shadow-[0_0_12px_rgba(232,93,104,0.2)] mb-3">
        <span className="text-xs font-semibold tracking-tighter">NG</span>
      </div>

      {/* Nav Icons Stack */}
      <div className="flex flex-col items-center gap-2.5 my-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-label={item.label}
                className={`w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'border border-[#E85D68]/60 bg-[#E85D68]/10 text-[#E85D68] shadow-[0_0_15px_rgba(232,93,104,0.25)]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <Icon strokeWidth={1.75} className="w-[19px] h-[19px]" />
              </button>

              {/* Floating Tooltip */}
              <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#12141A] text-[#F3F4F6] text-[11px] font-medium whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 border border-white/[0.08] shadow-lg z-50">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Quick Add Square Button */}
      <div className="relative group mt-3">
        <button
          type="button"
          onClick={onQuickAdd}
          aria-label="Quick Action"
          className="w-10 h-10 rounded-[14px] flex items-center justify-center bg-[#1A1D24]/90 hover:bg-[#E85D68] text-[#9CA3AF] hover:text-white border border-white/[0.08] hover:border-[#E85D68] shadow-sm hover:shadow-[0_0_16px_rgba(232,93,104,0.35)] transition-all duration-200 cursor-pointer"
        >
          <Plus strokeWidth={2} className="w-5 h-5" />
        </button>
        <div className="pointer-events-none absolute left-full ml-3.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#12141A] text-[#F3F4F6] text-[11px] font-medium whitespace-nowrap opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 border border-white/[0.08] shadow-lg z-50">
          Create Item
        </div>
      </div>
    </aside>
  );
};
