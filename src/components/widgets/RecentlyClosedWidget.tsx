import React from 'react';
import { History, RotateCcw, ExternalLink, Code, Layers, Shapes, ShieldCheck, Globe } from 'lucide-react';
import { RecentTab } from '../../types/dashboard';

interface RecentlyClosedWidgetProps {
  recentTabs: RecentTab[];
  onRestoreTab: (tab: RecentTab) => void;
  onClearTabs: () => void;
}

export const RecentlyClosedWidget: React.FC<RecentlyClosedWidgetProps> = ({
  recentTabs,
  onRestoreTab,
  onClearTabs,
}) => {
  const getTabIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'code':
        return <Code className="w-3.5 h-3.5 text-[#6384FF]" />;
      case 'layers':
        return <Layers className="w-3.5 h-3.5 text-[#E85D68]" />;
      case 'shapes':
        return <Shapes className="w-3.5 h-3.5 text-[#10B981]" />;
      case 'shieldcheck':
        return <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#9CA3AF]" />;
    }
  };

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[250px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History strokeWidth={1.75} className="w-4 h-4 text-[#9CA3AF]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Recently Closed
            </h2>
            <span className="text-[11px] text-[#6B7280]">Tabs</span>
          </div>
          <div className="flex items-center gap-1.5">
            {recentTabs.length > 0 && (
              <button
                type="button"
                onClick={() => onRestoreTab(recentTabs[0])}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restore</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClearTabs}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* List of tabs */}
        <div className="space-y-1.5 max-h-[170px] overflow-y-auto pr-0.5">
          {recentTabs.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#6B7280]">
              No recently closed tabs.
            </div>
          ) : (
            recentTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => onRestoreTab(tab)}
                className="group flex items-center justify-between px-3 py-2 rounded-[14px] bg-[#1A1D24]/75 hover:bg-[#232732]/90 border border-white/[0.05] hover:border-white/[0.12] transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className="w-6 h-6 rounded-[8px] bg-white/[0.04] flex items-center justify-center shrink-0">
                    {getTabIcon(tab.iconName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#F3F4F6] truncate group-hover:text-white transition-colors">
                      {tab.title}
                    </p>
                    <span className="text-[10px] text-[#6B7280] block truncate">
                      {tab.domain}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Timestamps in text-[#6B7280] */}
                  <span className="text-[10px] text-[#6B7280] font-mono whitespace-nowrap">
                    {tab.timeAgo}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04] mt-2">
        <span>Session History</span>
        <span>{recentTabs.length} tabs cached</span>
      </div>
    </div>
  );
};
