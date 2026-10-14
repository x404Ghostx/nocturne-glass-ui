import React, { useState } from 'react';
import { X, CheckSquare, Bookmark as BookmarkIcon, Plus } from 'lucide-react';
import { Bookmark, Task } from '../../types/dashboard';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onAddBookmark: (bm: Omit<Bookmark, 'id' | 'visits'>) => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onAddTask,
  onAddBookmark,
}) => {
  const [tab, setTab] = useState<'task' | 'bookmark'>('task');

  // Task form state
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tag, setTag] = useState('Core');

  // Bookmark form state
  const [bmTitle, setBmTitle] = useState('');
  const [bmUrl, setBmUrl] = useState('');
  const [bmCategory, setBmCategory] = useState<'Dev' | 'Design' | 'Productivity' | 'Reading'>('Dev');
  const [bmIcon, setBmIcon] = useState('Globe');

  if (!isOpen) return null;

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask({
      text: taskText.trim(),
      completed: false,
      priority,
      tag: tag || 'General',
    });
    setTaskText('');
    onClose();
  };

  const handleBookmarkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmTitle.trim() || !bmUrl.trim()) return;
    let url = bmUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    onAddBookmark({
      title: bmTitle.trim(),
      url,
      category: bmCategory,
      icon: bmIcon,
    });
    setBmTitle('');
    setBmUrl('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-[24px] bg-[#12141A]/90 backdrop-blur-2xl border border-white/[0.1] shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.16)] p-5 z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#E85D68]" />
            <h3 className="text-sm font-semibold text-[#F3F4F6]">
              Create New Item
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

        {/* Tab Selector */}
        <div className="flex p-1 rounded-full bg-[#1A1D24] mb-4 border border-white/[0.05]">
          <button
            type="button"
            onClick={() => setTab('task')}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              tab === 'task'
                ? 'bg-[#E85D68] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Task</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('bookmark')}
            className={`flex-1 py-1.5 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
              tab === 'bookmark'
                ? 'bg-[#E85D68] text-white shadow-sm'
                : 'text-[#9CA3AF] hover:text-white'
            }`}
          >
            <BookmarkIcon className="w-3.5 h-3.5" />
            <span>Bookmark</span>
          </button>
        </div>

        {tab === 'task' ? (
          <form onSubmit={handleTaskSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs text-[#9CA3AF] block mb-1">Task Description</label>
              <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="e.g. Test responsive mobile dock..."
                autoFocus
                required
                className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:border-[#E85D68]/60 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#9CA3AF] block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                  className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#9CA3AF] block mb-1">Tag / Category</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Design, UI, Dev"
                  className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:outline-none"
                >
                </input>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl text-xs text-[#9CA3AF] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-medium text-white bg-[#E85D68] hover:brightness-110 shadow-[0_0_12px_rgba(232,93,104,0.3)]"
              >
                Create Task
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleBookmarkSubmit} className="space-y-3.5">
            <div>
              <label className="text-xs text-[#9CA3AF] block mb-1">Site Title</label>
              <input
                type="text"
                value={bmTitle}
                onChange={(e) => setBmTitle(e.target.value)}
                placeholder="e.g. Tailwind v4 Docs"
                autoFocus
                required
                className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:border-[#E85D68]/60 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-[#9CA3AF] block mb-1">URL</label>
              <input
                type="text"
                value={bmUrl}
                onChange={(e) => setBmUrl(e.target.value)}
                placeholder="https://..."
                required
                className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:border-[#E85D68]/60 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#9CA3AF] block mb-1">Category</label>
                <select
                  value={bmCategory}
                  onChange={(e) => setBmCategory(e.target.value as any)}
                  className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:outline-none"
                >
                  <option value="Dev">Dev</option>
                  <option value="Design">Design</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Reading">Reading</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#9CA3AF] block mb-1">Icon Style</label>
                <select
                  value={bmIcon}
                  onChange={(e) => setBmIcon(e.target.value)}
                  className="w-full bg-[#1A1D24] px-3 py-2 rounded-[12px] text-xs text-[#F3F4F6] border border-white/[0.08] focus:outline-none"
                >
                  <option value="Globe">Globe</option>
                  <option value="Github">Github</option>
                  <option value="Figma">Figma</option>
                  <option value="Layers">Layers</option>
                  <option value="Terminal">Terminal</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl text-xs text-[#9CA3AF] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-medium text-white bg-[#E85D68] hover:brightness-110 shadow-[0_0_12px_rgba(232,93,104,0.3)]"
              >
                Add Bookmark
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
