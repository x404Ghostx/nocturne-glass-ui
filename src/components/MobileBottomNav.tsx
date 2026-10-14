import React from 'react';
import { LayoutGrid, Bookmark, CheckSquare, Music, FileText, Settings, Plus } from 'lucide-react';
import { DockTab } from './LeftDock';

interface MobileBottomNavProps {
  activeTab: DockTab;
  onSelectTab: (tab: DockTab) => void;
  onQuickAdd: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab,
  onQuickAdd,
}) => {
  const items: { id: DockTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutGrid },
    { id: 'bookmarks', label: 'Links', icon: Bookmark },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'media', label: 'Focus', icon: Music },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'settings', label: 'Prefs', icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-4 inset-x-4 h-14 rounded-full z-50 bg-[#12141A]/85 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.14)] flex items-center justify-around px-2"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelectTab(item.id)}
            aria-label={item.label}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full transition-all duration-200 ${
              isActive
                ? 'text-[#E85D68] bg-[#E85D68]/15 border border-[#E85D68]/50 shadow-[0_0_12px_rgba(232,93,104,0.25)]'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
            }`}
          >
            <Icon strokeWidth={1.75} className="w-5 h-5" />
          </button>
        );
      })}

      <button
        type="button"
        onClick={onQuickAdd}
        aria-label="Create Action"
        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#E85D68] text-white shadow-[0_0_15px_rgba(232,93,104,0.4)] hover:brightness-110 active:scale-95 transition-all"
      >
        <Plus strokeWidth={2.2} className="w-5 h-5" />
      </button>
    </nav>
  );
};
