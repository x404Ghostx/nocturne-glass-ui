import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, ExternalLink, Plus, Trash2, Globe, Github, Figma, Layers, Terminal } from 'lucide-react';
import { Bookmark } from '../../types/dashboard';

interface BookmarksWidgetProps {
  bookmarks: Bookmark[];
  onAddBookmark: () => void;
  onDeleteBookmark: (id: string) => void;
}

export const BookmarksWidget: React.FC<BookmarksWidgetProps> = ({
  bookmarks,
  onAddBookmark,
  onDeleteBookmark,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Dev', 'Design', 'Productivity', 'Reading'];

  const filteredBookmarks = selectedCategory === 'All'
    ? bookmarks
    : bookmarks.filter((b) => b.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />;
      case 'figma':
        return <Figma className="w-4 h-4 text-[#F24E1E]" />;
      case 'layers':
        return <Layers className="w-4 h-4 text-[#5E6AD2]" />;
      case 'terminal':
        return <Terminal className="w-4 h-4 text-[#10B981]" />;
      default:
        return <Globe className="w-4 h-4 text-[#9CA3AF] group-hover:text-white transition-colors" />;
    }
  };

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[310px]">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookmarkIcon strokeWidth={1.75} className="w-4 h-4 text-[#E85D68]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Bookmarks
            </h2>
            <span className="text-[11px] text-[#6B7280] font-mono">
              ({bookmarks.length})
            </span>
          </div>
          <button
            type="button"
            onClick={onAddBookmark}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>

        {/* Category Filter Controls */}
        <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-0.5 rounded-[10px] text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/[0.12] text-[#F3F4F6] border border-white/[0.12]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] bg-transparent border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bookmark List (Recessed Inner Rows) */}
        <div className="space-y-2 max-h-[200px] overflow-y-auto pr-0.5">
          {filteredBookmarks.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B7280]">
              No bookmarks in {selectedCategory}
            </div>
          ) : (
            filteredBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group flex items-center justify-between px-3.5 py-2.5 rounded-[14px] bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
                onClick={() => window.open(bookmark.url, '_blank', 'noopener,noreferrer')}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-7 h-7 rounded-[9px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    {getIcon(bookmark.icon)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#F3F4F6] truncate group-hover:text-white transition-colors">
                      {bookmark.title}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
                      <span className="truncate">{bookmark.url.replace(/^https?:\/\//, '')}</span>
                      <span>·</span>
                      <span className="shrink-0">{bookmark.category}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBookmark(bookmark.id);
                    }}
                    title="Delete bookmark"
                    aria-label={`Delete ${bookmark.title}`}
                    className="p-1 rounded-md text-[#6B7280] hover:text-[#E85D68] hover:bg-white/[0.06] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-white" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04]">
        <span>Quick jump: 1-Click Launch</span>
        <span>{filteredBookmarks.length} displayed</span>
      </div>
    </div>
  );
};
