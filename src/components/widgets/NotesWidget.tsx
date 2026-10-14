import React, { useState, useEffect } from 'react';
import { FileText, Copy, Check, Trash2 } from 'lucide-react';

interface NotesWidgetProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

export const NotesWidget: React.FC<NotesWidgetProps> = ({
  initialContent = `• Nocturne Glass token audit complete.
• Specular rim highlights: 0.14 opacity.
• Keep accent budget under 8% with #E85D68.`,
  onSave,
}) => {
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('nocturne_notes') || initialContent;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('nocturne_notes', content);
    if (onSave) onSave(content);
  }, [content, onSave]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (window.confirm('Clear all notes?')) {
      setContent('');
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <div className="rounded-[24px] bg-[#12141A]/75 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)] p-4 flex flex-col justify-between h-full min-h-[250px]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText strokeWidth={1.75} className="w-4 h-4 text-[#9CA3AF]" />
            <h2 className="text-[14px] font-medium tracking-[-0.01em] text-[#F3F4F6]">
              Notes
            </h2>
            <span className="text-[11px] text-[#6B7280]">Scratchpad</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleCopy}
              title="Copy notes"
              aria-label="Copy notes to clipboard"
              className="p-1 rounded-full text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium text-[#9CA3AF] hover:text-white bg-[#1E212B]/80 border border-white/[0.07] hover:border-white/[0.15] transition-all cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Text Area (Recessed Glass) */}
        <div className="rounded-[14px] bg-[#1A1D24]/75 border border-white/[0.05] focus-within:border-white/[0.15] transition-all p-2.5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type quick thoughts, meeting notes, or links..."
            rows={4}
            className="w-full bg-transparent text-xs text-[#F3F4F6] placeholder-[#6B7280] resize-none focus:outline-none leading-relaxed font-sans"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-2 text-[11px] text-[#6B7280] flex justify-between border-t border-white/[0.04] mt-2">
        <span className="font-mono">Auto-saved</span>
        <span>{wordCount} words · {charCount} chars</span>
      </div>
    </div>
  );
};
