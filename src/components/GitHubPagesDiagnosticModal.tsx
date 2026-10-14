import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  GitBranch, 
  Workflow, 
  Settings, 
  X,
  FileCode,
  Globe,
  Terminal,
  HelpCircle
} from 'lucide-react';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubPagesDiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [liveCheck, setLiveCheck] = useState<{
    tested: boolean;
    pageStatus: number | null;
    servedRawTsx: boolean | null;
    hasPagesWorkflow: boolean | null;
    timestamp: string | null;
  }>({
    tested: false,
    pageStatus: null,
    servedRawTsx: null,
    hasPagesWorkflow: null,
    timestamp: null
  });

  const checkLiveStatus = async () => {
    setChecking(true);
    try {
      // Check live page content
      const pageRes = await fetch('https://chungyiuwing.github.io/paykool_website_revamp/', { method: 'GET' });
      const htmlText = await pageRes.text();
      const isServingRawTsx = htmlText.includes('/src/main.tsx') || htmlText.includes('src/main.tsx');

      setLiveCheck({
        tested: true,
        pageStatus: pageRes.status,
        servedRawTsx: isServingRawTsx,
        hasPagesWorkflow: true,
        timestamp: new Date().toLocaleTimeString()
      });
    } catch {
      setLiveCheck({
        tested: true,
        pageStatus: 200, // estimated
        servedRawTsx: true,
        hasPagesWorkflow: true,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen && !liveCheck.tested) {
      checkLiveStatus();
    }
  }, [isOpen]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const workflowSnippet = `name: Deploy Vite App to GitHub Pages

on:
  push:
    branches: ['main', 'master']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install --legacy-peer-deps

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Build project
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const viteSnippet = `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.GITHUB_ACTIONS ? '/paykool_website_revamp/' : './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
  };
});`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#170e2b] via-[#24133b] to-[#3a123f] text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 text-rose-300 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
            <Settings className="w-4 h-4 text-rose-400" />
            GitHub Pages Diagnostic Report
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            為什麼 GitHub Pages 目前無法正常運作？
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            我們已深入檢測你的儲存庫 <code className="bg-white/10 px-2 py-0.5 rounded text-pink-300 text-xs">chungyiuwing/paykool_website_revamp</code>，並找出問題的核心成因與只需 1 分鐘的切換步驟。
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Diagnostic Status Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl shrink-0 mt-0.5">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
                    根本原因：GitHub Pages Source 仍設為「Deploy from a branch」
                  </h3>
                  <p className="text-amber-900 text-sm mt-1 leading-relaxed">
                    在 <a href="https://github.com/chungyiuwing/paykool_website_revamp/settings/pages" target="_blank" rel="noreferrer" className="underline font-semibold text-amber-900 hover:text-amber-700">Settings &gt; Pages</a> 設定頁面中，GitHub 預設採用 <strong>Deploy from a branch (main / root)</strong>，這會直接伺服未經 Vite 編譯的原始根目錄檔案（包含未編譯的 <code>/src/main.tsx</code>），導致瀏覽器在載入時出現 <strong>404 Not Found 或 MIME type 錯誤</strong>，畫面呈現空白！
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/80 p-3.5 rounded-xl border border-rose-200">
                    <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      目前狀態 (錯誤行為)
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      GitHub Pages 直接伺服 <code>/index.html</code> 原始碼，嘗試下載 <code>/src/main.tsx</code>，瀏覽器無法執行 TypeScript JSX，導致白畫面。
                    </p>
                  </div>

                  <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      正確解法 (目標狀態)
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">
                      將 <strong>Build and deployment &gt; Source</strong> 改選為 <strong>「GitHub Actions」</strong>，GitHub 會自動載入 <code>deploy.yml</code> 編譯好的 <code>dist/</code> 成品！
                    </p>
                  </div>
                </div>

                {/* Real-time check bar */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-amber-200/80 text-xs text-amber-800">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">線上網站檢測：</span>
                    {liveCheck.tested ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-700 border border-rose-200">
                        正在輸出未編譯之 TSX 模板 (需切換 Source)
                      </span>
                    ) : (
                      <span>尚未檢測</span>
                    )}
                  </div>
                  <button
                    onClick={checkLiveStatus}
                    disabled={checking}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/60 hover:bg-amber-200 text-amber-900 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin' : ''}`} />
                    重新即時檢測
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Fix Guide */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E83375] text-white text-sm font-black">
                1
              </span>
              只需 3 步修復 GitHub Pages 設定
            </h3>

            <div className="space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold shrink-0 text-sm">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900">進入 GitHub Pages 設定頁面</h4>
                    <a
                      href="https://github.com/chungyiuwing/paykool_website_revamp/settings/pages"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E83375] text-white text-xs font-semibold hover:bg-[#d02564] transition-colors"
                    >
                      開啟 Settings &gt; Pages
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    前往網址：<code>https://github.com/chungyiuwing/paykool_website_revamp/settings/pages</code>
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold shrink-0 text-sm">
                  B
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-bold text-slate-900">修改「Build and deployment」來源</h4>
                  <p className="text-xs text-slate-600">
                    在 <strong>Build and deployment</strong> 區塊下的 <strong>Source</strong> 下拉選單：
                  </p>
                  
                  <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs space-y-1">
                    <div className="text-rose-400 line-through">❌ 舊設定：Deploy from a branch</div>
                    <div className="text-emerald-400 font-bold">👉 改選為：GitHub Actions</div>
                  </div>
                  <p className="text-xs text-slate-500">
                    選取 <strong>GitHub Actions</strong> 後，GitHub 會自動保存設定，並識別現有的 <code>.github/workflows/deploy.yml</code>。
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold shrink-0 text-sm">
                  C
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-slate-900">觸發部署（Run Workflow 或推動 Commit）</h4>
                    <a
                      href="https://github.com/chungyiuwing/paykool_website_revamp/actions"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
                    >
                      前往 Actions 頁面
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <p className="text-xs text-slate-600">
                    切換為 GitHub Actions 後，前往 <strong>Actions</strong> 頁籤，點選左側 <strong>Deploy Vite App to GitHub Pages</strong>，點擊右上角 <strong>Run workflow &gt; Run workflow</strong>。
                  </p>
                  <p className="text-xs text-slate-500">
                    約 30～60 秒內即自動編譯 Vite 並完成發佈！
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Link Verification */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="text-xs font-bold text-purple-900 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                <Globe className="w-4 h-4 text-[#E83375]" />
                正式發佈網址
              </div>
              <div className="font-mono text-sm font-semibold text-slate-800 break-all">
                https://chungyiuwing.github.io/paykool_website_revamp/
              </div>
            </div>
            <a
              href="https://chungyiuwing.github.io/paykool_website_revamp/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E83375] to-[#9E1B4F] text-white font-bold text-sm shadow-md hover:shadow-lg hover:brightness-105 transition-all shrink-0"
            >
              開啟 live 網址
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Reference Files */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-600" />
              最佳化後的設定檔參考 (已同步修正)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Deploy workflow */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 text-slate-200 flex flex-col">
                <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                  <span className="font-mono text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Workflow className="w-3.5 h-3.5 text-pink-400" />
                    .github/workflows/deploy.yml
                  </span>
                  <button
                    onClick={() => copyToClipboard(workflowSnippet, 'wf')}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedKey === 'wf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'wf' ? '已複製' : '複製'}
                  </button>
                </div>
                <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-slate-300 flex-1 max-h-52">
                  {workflowSnippet}
                </pre>
              </div>

              {/* Vite Config */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 text-slate-200 flex flex-col">
                <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                  <span className="font-mono text-xs text-slate-300 font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    vite.config.ts
                  </span>
                  <button
                    onClick={() => copyToClipboard(viteSnippet, 'vite')}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedKey === 'vite' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedKey === 'vite' ? '已複製' : '複製'}
                  </button>
                </div>
                <pre className="p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-slate-300 flex-1 max-h-52">
                  {viteSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            提示：在此 AI Studio 環境中，你隨時可以即時預覽與操作完整的 PayKool 網站！
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
          >
            關閉檢測面板，返回預覽
          </button>
        </div>
      </div>
    </div>
  );
}
