import React, { useState, useEffect } from 'react';
import { Search, Moon, CloudMoon, Edit3, Palette, Settings, Check, ChevronRight } from 'lucide-react';
import { WeatherInfo } from '../types/dashboard';

interface HeroHeaderProps {
  userName: string;
  is24h: boolean;
  isEditMode: boolean;
  weather: WeatherInfo;
  onToggleEditMode: () => void;
  onOpenTheme: () => void;
  onOpenSettings: () => void;
  onOpenCommandPalette: () => void;
  onUpdateUserName: (name: string) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  userName,
  is24h,
  isEditMode,
  weather,
  onToggleEditMode,
  onOpenTheme,
  onOpenSettings,
  onOpenCommandPalette,
  onUpdateUserName,
}) => {
  const [time, setTime] = useState<Date>(new Date());
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(userName);
  const [showWeatherDetail, setShowWeatherDetail] = useState(false);
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');

  useEffect(() => {
    setNameDraft(userName);
  }, [userName]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) return 'Good morning';
    if (hours >= 12 && hours < 17) return 'Good afternoon';
    if (hours >= 17 && hours < 22) return 'Good evening';
    return 'Night focus';
  };

  const handleNameSave = () => {
    if (nameDraft.trim()) {
      onUpdateUserName(nameDraft.trim());
    } else {
      setNameDraft(userName);
    }
    setIsEditingName(false);
  };

  // Clock format
  const hoursRaw = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  let hoursDisplay: string;
  let amPmSuffix = '';

  if (is24h) {
    hoursDisplay = String(hoursRaw).padStart(2, '0');
  } else {
    const h12 = hoursRaw % 12 || 12;
    hoursDisplay = String(h12);
    amPmSuffix = hoursRaw >= 12 ? 'PM' : 'AM';
  }

  const dateString = time.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="relative w-full mb-6">
      {/* Top Bar Navigation Row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Top-Left Pill: Greeting Pill */}
        <div className="flex items-center">
          <div className="px-4 py-1.5 rounded-full bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] flex items-center gap-2">
            <span className="text-[13px] font-medium text-[#9CA3AF] tracking-tight">
              {getGreeting()},
            </span>
            {isEditingName ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNameSave();
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onBlur={handleNameSave}
                  autoFocus
                  maxLength={18}
                  className="bg-[#1A1D24] text-[#F3F4F6] text-[13px] font-semibold px-2 py-0.5 rounded-md border border-[#E85D68]/40 focus:outline-none w-28"
                />
                <button
                  type="submit"
                  aria-label="Confirm name"
                  className="text-[#E85D68] hover:text-white p-0.5"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingName(true)}
                title="Click to edit name"
                className="text-[13px] font-semibold text-[#F3F4F6] hover:text-[#E85D68] transition-colors cursor-pointer group flex items-center gap-1"
              >
                <span>{userName}</span>
                <span className="text-[14px]">👋</span>
              </button>
            )}
          </div>
        </div>

        {/* Top-Right Utility Pill: Segmented 3-button bar */}
        <div className="flex items-center p-1 rounded-full bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14)] gap-0.5">
          {/* Edit mode toggle */}
          <button
            type="button"
            onClick={onToggleEditMode}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              isEditMode
                ? 'bg-[#E85D68]/20 text-[#E85D68] border border-[#E85D68]/40 shadow-[0_0_10px_rgba(232,93,104,0.2)]'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/[0.05]'
            }`}
          >
            <Edit3 strokeWidth={1.75} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Edit</span>
          </button>

          {/* Theme customizer */}
          <button
            type="button"
            onClick={onOpenTheme}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/[0.05] flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <Palette strokeWidth={1.75} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Theme</span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/[0.05] flex items-center gap-1.5 transition-all duration-200 cursor-pointer"
          >
            <Settings strokeWidth={1.75} className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Hero Row: Center Stack + Floating Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Center Stack: Clock + Date + ⌘K Search */}
        <div className="lg:col-span-9 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Hero Clock Display */}
          <div className="flex items-baseline">
            <h1 className="text-6xl md:text-[76px] font-extralight tracking-[-0.04em] text-[#F3F4F6] tabular-nums leading-none select-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {hoursDisplay}:{minutes}
              <span className="text-2xl md:text-3xl text-white/40 ml-1 font-light">
                :{seconds}
              </span>
            </h1>
            {!is24h && (
              <span className="text-lg md:text-xl font-normal text-[#9CA3AF] ml-2 tracking-normal uppercase">
                {amPmSuffix}
              </span>
            )}
          </div>

          {/* Date Indicator */}
          <p className="text-sm font-medium text-[#9CA3AF] mt-2 mb-4 tracking-normal">
            {dateString}
          </p>

          {/* ⌘K Search Bar (max-w-[460px]) */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="w-full max-w-[460px] flex items-center justify-between px-4 py-2.5 rounded-[16px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_12px_30px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:border-white/[0.18] transition-all duration-200 group text-left cursor-pointer"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Search strokeWidth={1.75} className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#F3F4F6] transition-colors shrink-0" />
              <span className="text-xs text-[#9CA3AF] group-hover:text-[#F3F4F6] transition-colors truncate">
                Search bookmarks, apps, or commands...
              </span>
            </div>
            <kbd className="px-2 py-0.5 rounded-[6px] bg-[#1A1D24] border border-white/[0.08] text-[10px] font-mono text-[#9CA3AF] group-hover:text-[#F3F4F6] transition-colors shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Floating Weather Card: Positioned top-right (w-[215px] rounded-[22px]) */}
        <div className="lg:col-span-3 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[215px]">
            <div
              onClick={() => setShowWeatherDetail(!showWeatherDetail)}
              className="w-full rounded-[22px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-3.5 cursor-pointer hover:border-white/[0.15] transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-medium text-[#9CA3AF] truncate max-w-[120px]">
                  {weather.location}
                </span>
                {/* Secondary Accent Moon indicator (text-[#6384FF]) */}
                <Moon strokeWidth={1.75} className="w-4 h-4 text-[#6384FF] drop-shadow-[0_0_8px_rgba(99,132,255,0.4)]" />
              </div>

              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline">
                  <span className="text-3xl font-light tracking-tight text-[#F3F4F6] tabular-nums">
                    {tempUnit === 'F' ? weather.tempF : weather.tempC}
                  </span>
                  <span className="text-sm font-light text-[#9CA3AF] ml-0.5">
                    °{tempUnit}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTempUnit(tempUnit === 'F' ? 'C' : 'F');
                  }}
                  className="text-[10px] text-[#6B7280] hover:text-[#9CA3AF] underline ml-2"
                >
                  {tempUnit === 'F' ? 'to °C' : 'to °F'}
                </button>
              </div>

              <div className="flex items-center justify-between mt-1 text-[11px] text-[#9CA3AF]">
                <span className="truncate">{weather.condition}</span>
                <span className="text-[10px] text-[#6B7280]">
                  H:{weather.high}° L:{weather.low}°
                </span>
              </div>
            </div>

            {/* Weather Hourly Flyout Preview */}
            {showWeatherDetail && (
              <div className="absolute top-full right-0 mt-2 w-64 z-40 rounded-[18px] bg-[#12141A]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2 pb-1.5 border-b border-white/[0.06]">
                  <span className="font-medium text-[#F3F4F6]">Night Outlook</span>
                  <span className="text-[10px]">Humidity {weather.humidity}%</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 text-center">
                  {weather.hourly.slice(0, 4).map((h, i) => (
                    <div key={i} className="p-1.5 rounded-lg bg-white/[0.03]">
                      <div className="text-[10px] text-[#9CA3AF]">{h.time}</div>
                      <CloudMoon className="w-3.5 h-3.5 mx-auto my-1 text-[#6384FF]" />
                      <div className="text-xs font-medium text-[#F3F4F6]">{h.temp}°</div>
                    </div>
                  ))}
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#9CA3AF]">
                  <span>Lunar Cycle</span>
                  <span className="text-[#6384FF] font-medium">{weather.moonIllumination} lit</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
