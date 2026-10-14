/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LeftDock, DockTab } from './components/LeftDock';
import { MobileBottomNav } from './components/MobileBottomNav';
import { HeroHeader } from './components/HeroHeader';
import { BookmarksWidget } from './components/widgets/BookmarksWidget';
import { QuickAccessWidget } from './components/widgets/QuickAccessWidget';
import { ToDoWidget } from './components/widgets/ToDoWidget';
import { FocusMediaCarousel } from './components/widgets/FocusMediaCarousel';
import { NotesWidget } from './components/widgets/NotesWidget';
import { QuoteWidget } from './components/widgets/QuoteWidget';
import { RecentlyClosedWidget } from './components/widgets/RecentlyClosedWidget';

import { CommandPalette } from './components/modals/CommandPalette';
import { ThemeModal } from './components/modals/ThemeModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { QuickAddModal } from './components/modals/QuickAddModal';

import {
  INITIAL_BOOKMARKS,
  INITIAL_QUICK_APPS,
  INITIAL_TASKS,
  FOCUS_TRACKS,
  INITIAL_RECENT_TABS,
  INITIAL_WEATHER,
  WALLPAPERS,
} from './data/mockData';
import { Bookmark, QuickApp, Task, RecentTab } from './types/dashboard';

export default function App() {
  // State with LocalStorage Persistence
  const [activeTab, setActiveTab] = useState<DockTab>('dashboard');
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('nocturne_username') || 'Ghost';
  });
  const [is24h, setIs24h] = useState<boolean>(() => {
    return localStorage.getItem('nocturne_is24h') === 'true';
  });
  const [wallpaperId, setWallpaperId] = useState<string>(() => {
    return localStorage.getItem('nocturne_wallpaper') || 'wp-rain';
  });
  const [glassOpacity, setGlassOpacity] = useState<number>(() => {
    const val = localStorage.getItem('nocturne_glass_opacity');
    return val ? parseFloat(val) : 0.75;
  });
  const [blurStrength, setBlurStrength] = useState<number>(() => {
    const val = localStorage.getItem('nocturne_blur_strength');
    return val ? parseInt(val, 10) : 24;
  });
  const [soundEffects, setSoundEffects] = useState<boolean>(() => {
    return localStorage.getItem('nocturne_sound_fx') !== 'false';
  });

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Data states
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('nocturne_bookmarks');
    return saved ? JSON.parse(saved) : INITIAL_BOOKMARKS;
  });

  const [apps, setApps] = useState<QuickApp[]>(() => {
    const saved = localStorage.getItem('nocturne_apps');
    return saved ? JSON.parse(saved) : INITIAL_QUICK_APPS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('nocturne_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [recentTabs, setRecentTabs] = useState<RecentTab[]>(() => {
    const saved = localStorage.getItem('nocturne_recent_tabs');
    return saved ? JSON.parse(saved) : INITIAL_RECENT_TABS;
  });

  // Modals state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('nocturne_username', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('nocturne_is24h', String(is24h));
  }, [is24h]);

  useEffect(() => {
    localStorage.setItem('nocturne_wallpaper', wallpaperId);
  }, [wallpaperId]);

  useEffect(() => {
    localStorage.setItem('nocturne_glass_opacity', String(glassOpacity));
  }, [glassOpacity]);

  useEffect(() => {
    localStorage.setItem('nocturne_blur_strength', String(blurStrength));
  }, [blurStrength]);

  useEffect(() => {
    localStorage.setItem('nocturne_sound_fx', String(soundEffects));
  }, [soundEffects]);

  useEffect(() => {
    localStorage.setItem('nocturne_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('nocturne_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('nocturne_recent_tabs', JSON.stringify(recentTabs));
  }, [recentTabs]);

  // Global keydown handler for 1-8 Quick Launch and ⌘K
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      // Ignore if user is currently typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // Check number keys 1 - 8
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= 8) {
        const app = apps.find((a) => a.shortcut === String(num));
        if (app) {
          e.preventDefault();
          handleOpenApp(app);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [apps]);

  // Handlers
  const handleOpenApp = (app: QuickApp) => {
    window.open(app.url, '_blank', 'noopener,noreferrer');
    // Add to recently closed/visited
    const newTab: RecentTab = {
      id: `rt-${Date.now()}`,
      title: `${app.name} Dashboard`,
      url: app.url,
      domain: app.url.replace(/^https?:\/\//, ''),
      timeAgo: 'Just now',
      iconName: app.icon,
    };
    setRecentTabs((prev) => [newTab, ...prev.filter((t) => t.domain !== newTab.domain).slice(0, 6)]);
  };

  const handleOpenBookmark = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      text,
      completed: false,
      priority: 'medium',
      tag: 'Core',
      createdAt: 'Today',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDeleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleAddBookmarkComplete = (bm: Omit<Bookmark, 'id' | 'visits'>) => {
    const newBm: Bookmark = {
      ...bm,
      id: `bm-${Date.now()}`,
      visits: 1,
    };
    setBookmarks((prev) => [newBm, ...prev]);
  };

  const handleAddTaskComplete = (t: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...t,
      id: `t-${Date.now()}`,
      createdAt: 'Today',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleRestoreTab = (tab: RecentTab) => {
    window.open(tab.url, '_blank', 'noopener,noreferrer');
  };

  const handleClearTabs = () => {
    setRecentTabs([]);
  };

  const handleResetDefaults = () => {
    setBookmarks(INITIAL_BOOKMARKS);
    setTasks(INITIAL_TASKS);
    setApps(INITIAL_QUICK_APPS);
    setRecentTabs(INITIAL_RECENT_TABS);
    setWallpaperId('wp-rain');
    setGlassOpacity(0.75);
    setBlurStrength(24);
    setIs24h(false);
    setUserName('Ghost');
    setIsSettingsModalOpen(false);
  };

  const activeWallpaper =
    WALLPAPERS.find((w) => w.id === wallpaperId) || WALLPAPERS[0];

  return (
    <div className="relative min-h-screen bg-[#08090C] text-[#F3F4F6] selection:bg-[#E85D68] selection:text-white overflow-x-hidden font-sans">
      {/* Dynamic Atmospheric Canvas Background */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 ease-out z-0"
        style={{
          background: activeWallpaper.gradient,
        }}
      />

      {/* Atmospheric Vignette Overlay (bg-black/55) */}
      <div className="fixed inset-0 bg-black/55 pointer-events-none z-0 backdrop-blur-[0.5px]" />

      {/* Subtle organic noise grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Main OS Layout Shell */}
      <div className="relative z-10 flex min-h-screen p-3 md:p-6 lg:p-8 gap-5 max-w-[1560px] mx-auto">
        {/* Left Floating Dock (Desktop only) */}
        <LeftDock
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'settings') setIsSettingsModalOpen(true);
            if (tab === 'media') {
              const el = document.getElementById('focus-media-widget');
              el?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onQuickAdd={() => setIsQuickAddOpen(true)}
        />

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 pb-20 md:pb-6">
          {/* Hero Header Zone */}
          <HeroHeader
            userName={userName}
            is24h={is24h}
            isEditMode={isEditMode}
            weather={INITIAL_WEATHER}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onOpenTheme={() => setIsThemeModalOpen(true)}
            onOpenSettings={() => setIsSettingsModalOpen(true)}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onUpdateUserName={setUserName}
          />

          {/* Edit Mode Notification Banner */}
          {isEditMode && (
            <div className="mb-4 px-4 py-2.5 rounded-[16px] bg-[#E85D68]/15 border border-[#E85D68]/40 shadow-[0_0_20px_rgba(232,93,104,0.2)] flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center gap-2 text-xs text-[#F3F4F6]">
                <span className="w-2 h-2 rounded-full bg-[#E85D68] shadow-[0_0_8px_#E85D68]" />
                <span className="font-semibold">Edit Mode Enabled:</span>
                <span className="text-[#9CA3AF]">
                  Add widgets, rearrange shortcuts, or tweak dashboard tokens in real time.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="px-3 py-1 rounded-full text-xs font-medium text-white bg-[#E85D68] hover:brightness-110"
              >
                Done Editing
              </button>
            </div>
          )}

          {/* Bento Matrix (4 Columns x 2 Rows) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 flex-1">
            {/* ROW 1 */}
            {/* Bookmarks (3 cols) */}
            <div className="lg:col-span-3">
              <BookmarksWidget
                bookmarks={bookmarks}
                onAddBookmark={() => setIsQuickAddOpen(true)}
                onDeleteBookmark={handleDeleteBookmark}
              />
            </div>

            {/* Quick Access 4x2 squircle grid (3 cols) */}
            <div className="lg:col-span-3">
              <QuickAccessWidget
                apps={apps}
                onOpenApp={handleOpenApp}
                onEditApps={() => setIsCommandPaletteOpen(true)}
              />
            </div>

            {/* To Do with 4-segment progress bar (3 cols) */}
            <div className="lg:col-span-3">
              <ToDoWidget
                tasks={tasks}
                onToggleTask={handleToggleTask}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            {/* Focus Media Carousel (3 cols, spans 2 rows vertically) */}
            <div id="focus-media-widget" className="lg:col-span-3 lg:row-span-2">
              <FocusMediaCarousel tracks={FOCUS_TRACKS} />
            </div>

            {/* ROW 2 */}
            {/* Notes (3 cols) */}
            <div className="lg:col-span-3">
              <NotesWidget />
            </div>

            {/* Quote (3 cols or 2.5 cols) */}
            <div className="lg:col-span-3">
              <QuoteWidget />
            </div>

            {/* Recently Closed (3 cols or 3.5 cols) */}
            <div className="lg:col-span-3">
              <RecentlyClosedWidget
                recentTabs={recentTabs}
                onRestoreTab={handleRestoreTab}
                onClearTabs={handleClearTabs}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Floating Glass Bottom Navigation Bar (< 768px Mobile) */}
      <MobileBottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'settings') setIsSettingsModalOpen(true);
        }}
        onQuickAdd={() => setIsQuickAddOpen(true)}
      />

      {/* Modals & Dialogs */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        bookmarks={bookmarks}
        apps={apps}
        tasks={tasks}
        onSelectBookmark={handleOpenBookmark}
        onSelectApp={handleOpenApp}
        onSwitchWallpaper={setWallpaperId}
        onOpenSettings={() => {
          setIsCommandPaletteOpen(false);
          setIsSettingsModalOpen(true);
        }}
        onOpenTheme={() => {
          setIsCommandPaletteOpen(false);
          setIsThemeModalOpen(true);
        }}
        onQuickAdd={() => {
          setIsCommandPaletteOpen(false);
          setIsQuickAddOpen(true);
        }}
      />

      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        activeWallpaperId={wallpaperId}
        onSelectWallpaper={setWallpaperId}
        glassOpacity={glassOpacity}
        onChangeGlassOpacity={setGlassOpacity}
        blurStrength={blurStrength}
        onChangeBlurStrength={setBlurStrength}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        userName={userName}
        onUpdateUserName={setUserName}
        is24h={is24h}
        onToggleTimeFormat={() => setIs24h(!is24h)}
        soundEffects={soundEffects}
        onToggleSoundEffects={() => setSoundEffects(!soundEffects)}
        onResetDefaults={handleResetDefaults}
      />

      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAddTask={handleAddTaskComplete}
        onAddBookmark={handleAddBookmarkComplete}
      />
    </div>
  );
}
