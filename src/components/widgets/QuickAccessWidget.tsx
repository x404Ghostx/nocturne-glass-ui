import React from 'react';
import { Grid, Github, Palette, Compass, FileText, Headphones, Triangle, Radio, Sparkles, Plus } from 'lucide-react';
import { QuickApp } from '../../types/dashboard';

interface QuickAccessWidgetProps {
  apps: QuickApp[];
  onOpenApp: (app: QuickApp) => void;
  onEditApps: () => void;
}

export const QuickAccessWidget: React.FC<QuickAccessWidgetProps> = ({
  apps,
  onOpenApp,
  onEditApps,
}) => {
  const getAppIcon = (iconName: string, color: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5 text-white" />;
      case 'palette':
        return <Palette className="w-5 h-5" style={{ color }} />;
      case 'compass':
        return <Compass className="w-5 h-5" style={{ color }} />;
      case 'filetext':
        return <FileText className="w-5 h-5" style={{ color }} />;
      case 'headphones':
        return <Headphones className="w-5 h-5 text-[#1DB954]" />;
      case 'triangle':
        return <Triangle className="w-5 h-5 text-white fill-white/10" />;
      case 'radio':
        return <Radio className="w-5 h-5 text-[#1DA1F2]" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#D97706]" />;
      default:
        return <Grid className="w-5 h-5 text-[#9CA3AF]" />;
    }
  };

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[310px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Grid strokeWidth={1.75} className="w-4 h-4 text-[#9CA3AF]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Quick Access
            </h2>
            <span className="text-[11px] text-[#6B7280]">4×2 Grid</span>
          </div>
          <button
            type="button"
            onClick={onEditApps}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* 4x2 Squircle Grid */}
        <div className="grid grid-cols-4 gap-2.5 my-1">
          {apps.slice(0, 8).map((app) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpenApp(app)}
              className="group relative flex flex-col items-center justify-center p-2.5 rounded-[18px] bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] hover:border-white/[0.15] shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer min-h-[64px]"
            >
              {/* Shortcut tag in top right */}
              <span className="absolute top-1.5 right-1.5 text-[9px] font-mono text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
                {app.shortcut}
              </span>

              {/* Icon Container with subtle glow on hover */}
              <div className="w-8 h-8 rounded-[12px] flex items-center justify-center bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors mb-1.5">
                {getAppIcon(app.icon, app.color)}
              </div>

              {/* App Label */}
              <span className="text-[11px] font-medium text-[#9CA3AF] group-hover:text-[#F3F4F6] transition-colors truncate w-full text-center">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04]">
        <span>Tap tile to launch in new tab</span>
        <span className="font-mono text-[10px]">Press 1-8</span>
      </div>
    </div>
  );
};
