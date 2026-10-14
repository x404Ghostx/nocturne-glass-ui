import React, { useState, useEffect, useRef } from 'react';
import { Search, Globe, CheckSquare, Sparkles, Image, Settings, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Bookmark, QuickApp, Task } from '../../types/dashboard';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  apps: QuickApp[];
  tasks: Task[];
  onSelectBookmark: (url: string) => void;
  onSelectApp: (app: QuickApp) => void;
  onSwitchWallpaper: (id: string) => void;
  onOpenSettings: () => void;
  onOpenTheme: () => void;
  onQuickAdd: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  bookmarks,
  apps,
  tasks,
  onSelectBookmark,
  onSelectApp,
  onSwitchWallpaper,
  onOpenSettings,
  onOpenTheme,
  onQuickAdd,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Compile search items
  interface SearchItem {
    id: string;
    title: string;
    subtitle: string;
    category: 'Bookmarks' | 'Apps' | 'Commands' | 'Wallpapers';
    icon: React.ElementType;
    action: () => void;
  }

  const items: SearchItem[] = [
    // Standard system actions
    {
      id: 'cmd-create',
      title: 'Create New Item / Task / Bookmark',
      subtitle: 'Open quick creation modal',
      category: 'Commands',
      icon: CheckSquare,
      action: onQuickAdd,
    },
    {
      id: 'cmd-theme',
      title: 'Switch Wallpaper & Glass Theme',
      subtitle: 'Customize obsidian background and opacity',
      category: 'Commands',
      icon: Image,
      action: onOpenTheme,
    },
    {
      id: 'cmd-settings',
      title: 'Open Nocturne OS Settings',
      subtitle: 'Adjust clock format, sounds, and display',
      category: 'Commands',
      icon: Settings,
      action: onOpenSettings,
    },
    // Apps
    ...apps.map((app) => ({
      id: `app-${app.id}`,
      title: `Launch ${app.name}`,
      subtitle: app.category,
      category: 'Apps' as const,
      icon: Globe,
      action: () => onSelectApp(app),
    })),
    // Bookmarks
    ...bookmarks.map((bm) => ({
      id: `bm-${bm.id}`,
      title: bm.title,
      subtitle: `${bm.category} · ${bm.url}`,
      category: 'Bookmarks' as const,
      icon: Sparkles,
      action: () => onSelectBookmark(bm.url),
    })),
  ];

  const filteredItems = items.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl rounded-[24px] bg-[#12141A]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.16)] overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08] gap-3">
          <Search className="w-5 h-5 text-[#9CA3AF] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands, apps, or bookmarks..."
            className="w-full bg-transparent text-[14px] text-[#F3F4F6] placeholder-[#6B7280] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#9CA3AF] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6B7280]">
              No matches found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[14px] transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E85D68]/15 border border-[#E85D68]/40 text-white'
                      : 'hover:bg-white/[0.05] border border-transparent text-[#9CA3AF]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-[9px] flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#E85D68] text-white' : 'bg-white/[0.05] text-[#9CA3AF]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={`text-[13px] font-medium truncate ${
                          isSelected ? 'text-[#F3F4F6]' : 'text-[#D1D5DB]'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[11px] text-[#6B7280] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#6B7280] uppercase">
                      {item.category}
                    </span>
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-[#E85D68]" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[11px] text-[#6B7280]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#9CA3AF]">Nocturne Glass OS</span>
        </div>
      </div>
    </div>
  );
};
