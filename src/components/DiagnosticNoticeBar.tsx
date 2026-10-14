import React from 'react';
import { AlertCircle, ExternalLink, Sparkles, Wrench } from 'lucide-react';

interface DiagnosticNoticeBarProps {
  onOpenDiagnostic: () => void;
}

export function DiagnosticNoticeBar({ onOpenDiagnostic }: DiagnosticNoticeBarProps) {
  return (
    <div className="bg-gradient-to-r from-[#1d1235] via-[#2d1245] to-[#401239] text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <span className="font-medium text-slate-200">
            <strong className="text-pink-300 font-bold">GitHub Pages 診斷：</strong> 
            已分析你的儲存庫設定！GitHub Pages 目前設為 Branch 模式，需切換為 GitHub Actions 即可正常顯示。
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDiagnostic}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E83375] hover:bg-[#ff3b86] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            <Wrench className="w-3 h-3" />
            查看 1 分鐘修復診斷指南
          </button>
          <a
            href="https://github.com/chungyiuwing/paykool_website_revamp/settings/pages"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs transition-colors"
          >
            Settings &gt; Pages
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
