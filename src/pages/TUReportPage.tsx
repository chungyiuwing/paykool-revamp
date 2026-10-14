import React, { useState } from 'react';
import { PageType } from '../types';

interface TUReportPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const TUReportPage: React.FC<TUReportPageProps> = ({ onNavigate, onOpenApplyModal }) => {
  const [selectedTier, setSelectedTier] = useState<'A' | 'B' | 'C'>('A');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tierData = {
    A: {
      score: '3,520 - 4,000 分',
      gaugeScore: '3,520',
      rate: '最低優惠年利率 1.98%',
      badge: '99% 順利批核',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      percent: '92%',
    },
    B: {
      score: '3,200 - 3,519 分',
      gaugeScore: '3,310',
      rate: '一般常規利率 3.2%',
      badge: '90% 順利批核',
      badgeClass: 'bg-cyan-100 text-cyan-800',
      percent: '75%',
    },
    C: {
      score: '2,900 - 3,199 分',
      gaugeScore: '2,980',
      rate: '建議先行提分整合',
      badge: '審批或附帶條件',
      badgeClass: 'bg-amber-100 text-amber-800',
      percent: '58%',
    },
  };

  const currentTierInfo = tierData[selectedTier];

  const faqs = [
    {
      q: 'PayKool App 內的「智能信貸評估報告」真的完全免費嗎？',
      a: '是的，費用全免。合資格用戶每月可免費使用服務一次#。用戶只需下載 PayKool 手機應用程式並完成身分認證，即可免費查閱，無需事先申請信用卡，亦無需綁定任何收費項目。',
    },
    {
      q: '查閱報告會像銀行審批一樣留下 Hard Check 紀錄或扣減評分嗎？',
      a: '絕對不會。透過 PayKool 查閱屬於「軟性查詢（Soft Check）」，僅供個人信貸健康自我監控使用，絕不會在金融機構調閱的正式信貸報告中留痕，亦不會扣減任何 TU 分數，您可以放心定期查閱。',
    },
    {
      q: '甚麼是環聯（TU）信貸評級？對我有甚麼影響？',
      a: '信貸評級是銀行與金融機構評估借款人償還能力的重要指標，評級由 A（極度優良）至 J（極差）。評級越高，申請樓宇按揭、信用卡或私人貸款時獲批的利率越低、額度越充裕，審批速度亦往往更快捷。',
    },
    {
      q: '使用 PayKool 簽賬分期會否有助提升信貸評級？',
      a: '會。作為持牌金融發卡機構，PayKool 會依法定期向環聯資料庫反饋持卡人按時還款數據。準時繳清每期款項有助建立正面信貸紀錄，逐步提升個人信貸評級與整體信用分數。',
    },
  ];

  return (
    <div className="w-full bg-[#fdf8ff] min-h-screen">
      {/* Breadcrumb */}
      <div className="w-full bg-white border-b border-[#5B459B]/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center gap-2 text-xs font-semibold text-[#6b6678]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#5B459B] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>首頁</span>
          </button>
          <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
          <span>智能信貸</span>
          <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
          <span className="text-[#5B459B] font-bold">智能信貸評估報告 (免費 Check TU 評分)</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-[#f7f1ff]/60 to-[#fdf8ff] py-12 lg:py-16 border-b border-[#5B459B]/10">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#00B6ED]/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full bg-[#5B459B]/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy & Diagnostic Widget */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-extrabold tracking-wide">
                  費用全免 · Soft Check 零痕跡 · 每月定期更新
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl lg:text-5xl font-black text-[#2B225A] leading-tight tracking-tight">
                  免費 Check TU 評分<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B459B] via-[#E83375] to-[#00B6ED]">
                    即時睇環聯信貸評級
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-slate-800 font-bold">
                  Soft Check 查閱不留底 · 一鍵掌握信用實力
                </p>
              </div>

              <p className="text-sm lg:text-base text-[#6b6678] leading-relaxed">
                財政要穩健，信貸更需要健康！掌握個人信貸健康狀況，洞悉銀行審批準則，避免因未知的信貸劣評而錯失低息按揭與高額貸款機會。
              </p>

              {/* Credit Health Diagnostic Quick Widget */}
              <div className="bg-white rounded-2xl p-5 border border-[#5B459B]/15 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5B459B] text-[20px]">tune</span>
                    <span className="text-sm font-extrabold text-[#2B225A]">信貸等級模擬試算</span>
                  </div>
                  <span className="text-xs text-[#6b6678]">點擊切換查看審批優勢</span>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-[#f2ebff] p-1 rounded-xl">
                  {(['A', 'B', 'C'] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`py-2 rounded-lg text-center font-bold text-xs transition-all cursor-pointer ${
                        selectedTier === tier
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Grade {tier} {tier === 'A' ? '(最優)' : tier === 'B' ? '(良好)' : '(尚可)'}
                    </button>
                  ))}
                </div>

                <div className="bg-[#f7f1ff] rounded-xl p-3.5 border border-[#5B459B]/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#6b6678]">預估分數區間:</span>
                      <span className="text-sm font-extrabold text-[#2B225A] font-mono-num">
                        {currentTierInfo.score}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#6b6678]">大額借貸待遇:</span>
                      <span className="text-xs font-bold text-emerald-600 font-mono-num">
                        {currentTierInfo.rate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${currentTierInfo.badgeClass}`}>
                      {currentTierInfo.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href="#how-to-check"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#00D67D] hover:bg-[#00c572] text-slate-900 font-extrabold text-sm shadow-md transform hover:-translate-y-0.5 transition-all"
                >
                  <span>立即免費查閱報告</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('platinum')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#5B459B] font-bold text-sm shadow-xs border border-[#5B459B]/30 hover:border-[#5B459B] hover:bg-[#f2ebff] transition-all cursor-pointer"
                >
                  <span>申請 PayKool Visa 卡</span>
                  <span className="material-symbols-outlined text-[18px]">credit_card</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-[#6b6678] font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
                  <span>香港持牌放債人 (1439/2025)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00B6ED] text-[18px]">security</span>
                  <span>256-bit 銀行級加密</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#5B459B] text-[18px]">check_circle</span>
                  <span>環聯 TransUnion 直連數據</span>
                </div>
              </div>
            </div>

            {/* Right: TU Speedometer Gauge Card + App Preview */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-6 lg:mt-0">
              <div className="relative w-full max-w-[500px]">
                <div className="relative bg-gradient-to-br from-[#1F1841] via-[#2B225A] to-[#120F24] p-6 lg:p-7 rounded-3xl text-white shadow-2xl border border-purple-500/20">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <span className="material-symbols-outlined text-[20px]">speed</span>
                      </div>
                      <div>
                        <h3 className="text-xs uppercase tracking-wider text-slate-300 font-bold">
                          即時信貸健康儀表盤
                        </h3>
                        <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>軟性查詢 · 不留任何痕跡</span>
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/10 text-xs font-bold text-white border border-white/10">
                      每月免費 1 次
                    </span>
                  </div>

                  {/* Speedometer SVG */}
                  <div className="py-6 flex flex-col items-center justify-center relative">
                    <div className="relative w-64 h-32 flex items-end justify-center overflow-hidden">
                      <svg className="w-64 h-64 -rotate-90 transform" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#334155"
                          strokeWidth="16"
                          strokeDasharray="251 251"
                          strokeDashoffset="0"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="url(#tu-gauge-grad)"
                          strokeWidth="16"
                          strokeDasharray="251 251"
                          strokeDashoffset="35"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="tu-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F02D7D" />
                            <stop offset="50%" stopColor="#00AAEE" />
                            <stop offset="100%" stopColor="#00D67D" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute bottom-1 text-center flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 tracking-wider">TU 信貸評分</span>
                        <span className="text-3xl font-black text-white tracking-tight font-mono-num">
                          {currentTierInfo.gaugeScore}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">
                          超越全港 {currentTierInfo.percent} 用戶
                        </span>
                      </div>
                    </div>

                    <div className="w-full max-w-xs flex justify-between text-[11px] text-slate-400 pt-3 font-semibold">
                      <span>Grade J (需注意)</span>
                      <span className="text-slate-300">Grade E</span>
                      <span className="text-emerald-400 font-bold">Grade A (最優)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <span className="text-[11px] text-slate-400 block mb-1">信用額度使用率</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-emerald-400 font-mono-num">32%</span>
                        <span className="text-[11px] text-slate-400">(健康黃金區間)</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <span className="text-[11px] text-slate-400 block mb-1">按揭批核成功率</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-emerald-400 font-mono-num">極高</span>
                        <span className="text-[11px] text-slate-400">特惠利率優先</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Mobile App Mockup */}
                <div className="absolute -bottom-8 -right-4 lg:-right-6 w-44 lg:w-52 z-20 pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
                  <img
                    alt="PayKool 手機 App 智能評估界面"
                    className="w-full h-auto object-contain rounded-2xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKnZFrF37pX2SdgeFKrRCK_pdyaUOEhhPk8oPYFHwgkLs5CO9ujuCA_6qGSA2i-etXyT-dDqIM59QZOKohQMpb4c5iDX-uOLLwRJ4tKARFYBWz9we5IZZQ5S14tfYdx5nyfqhhFUEp_5Xawfsm7bGAtuJqxairQnHiY4dOC5PshKOGv6A7zmAa0hMf6z35LE1PUPbBh9fZw4-M8pXnzRPeM39RHE1M03PvhlWV6tClbtBc7ElVxMn9HLSX6IBF-cRcj8Y"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#E83375] font-extrabold">
              DIRECT COMPARISON
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2B225A]">
              點解要用 PayKool 查閱？新舊方式一覽
            </h2>
            <p className="text-sm text-[#6b6678]">
              免除繁瑣預約親身前往與留下硬性記錄的顧慮，讓檢視信用變得簡單零負擔
            </p>
          </div>

          <div className="bg-[#fdf8ff] rounded-2xl lg:rounded-3xl p-4 lg:p-8 border border-[#5B459B]/15 shadow-md overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-sm font-bold text-[#6b6678] w-1/3">評估項目</th>
                  <th className="py-4 px-5 text-sm font-extrabold text-[#5B459B] bg-[#f2ebff] rounded-t-xl w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#E83375] text-[20px]">stars</span>
                      <span>PayKool 智能信貸評估報告</span>
                    </div>
                  </th>
                  <th className="py-4 px-4 text-sm font-bold text-[#6b6678] w-1/3">傳統信貸資料庫 / 實體調閱</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">查閱費用</td>
                  <td className="py-4 px-5 bg-[#f2ebff] text-emerald-600 font-extrabold text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>費用全免 ($0)</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">每次收費約 HK$280 - HK$500+</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">信貸紀錄留痕 (Check 痕跡)</td>
                  <td className="py-4 px-5 bg-[#f2ebff] text-emerald-600 font-extrabold text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Soft Check 零痕跡，絕不扣分</span>
                  </td>
                  <td className="py-4 px-4 text-rose-600 font-medium text-sm">申請貸款查詢會留 Hard Check 痕跡</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">查閱方式與所需時間</td>
                  <td className="py-4 px-5 bg-[#f2ebff] text-[#2B225A] font-bold text-sm">
                    手機 App 實名核實，1分鐘即時解鎖
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">需填寫繁複表格、預約親身辦理或等待郵寄</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">更新頻率與監控</td>
                  <td className="py-4 px-5 bg-[#f2ebff] text-emerald-600 font-extrabold text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>合資格用戶每月免費更新 1 次</span>
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">單次購買無後續持續監測服務</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-bold text-slate-800 text-sm">附加提分與理財改善建議</td>
                  <td className="py-4 px-5 bg-[#f2ebff] rounded-b-xl text-[#2B225A] font-bold text-sm">
                    提供額度優化建議與自主分期提分協同
                  </td>
                  <td className="py-4 px-4 text-slate-600 text-sm">僅提供靜態數據代碼，缺乏個人化洞察</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3 Core Features Grid */}
      <section className="w-full py-16 bg-[#fdf8ff]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#00B6ED] font-extrabold">
              WHY CHOOSE PAYKOOL
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2B225A]">
              為甚麼選擇 PayKool 智能信貸評估？
            </h2>
            <p className="text-sm text-[#6b6678]">三大核心保證，助你輕鬆邁向個人信用巔峰</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border-t-4 border-[#00D67D] border-x border-b border-[#5B459B]/10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-xs">
                  <span className="material-symbols-outlined text-[32px]">price_check</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">費用全免</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    合資格用戶每月可免費查詢信貸評級一次#，無需購買昂貴報告，亦無需持有信用卡即可免費使用。
                  </p>
                </div>
              </div>
              <div className="pt-6 flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  每月 1 次免費
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#f2ebff] text-slate-600 font-semibold">
                  零隱藏收費
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border-t-4 border-[#00B6ED] border-x border-b border-[#5B459B]/10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center text-[#00B6ED] shadow-xs">
                  <span className="material-symbols-outlined text-[32px]">shield</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">全面監察・不留底</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    屬於軟性查詢（Soft Check），絕不會在信貸紀錄中留下硬性查詢痕跡，無論查閱多少次都絕不影響 TU 分數。
                  </p>
                </div>
              </div>
              <div className="pt-6 flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 font-bold">
                  絕無 Hard Check
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#f2ebff] text-slate-600 font-semibold">
                  不扣減評分
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border-t-4 border-[#5B459B] border-x border-b border-[#5B459B]/10 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#f2ebff] flex items-center justify-center text-[#5B459B] shadow-xs">
                  <span className="material-symbols-outlined text-[32px]">query_stats</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">詳盡實用資訊</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    清晰顯示環聯信貸評級（A至J）、全港信貸排名百分比、現有貸款與信用卡結餘總額等實用數據。
                  </p>
                </div>
              </div>
              <div className="pt-6 flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-[#5B459B] font-bold">
                  環聯官方數據
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#f2ebff] text-slate-600 font-semibold">
                  全港排名分佈
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Block Report Breakdown */}
      <section className="w-full py-16 bg-white border-t border-[#5B459B]/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-wider text-emerald-600 font-extrabold">
              REPORT BREAKDOWN
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2B225A]">
              「智能信貸評估報告」內容包括：
            </h2>
            <p className="text-sm text-[#6b6678]">
              直觀視覺化儀表板，將繁複的金融數據轉化為一目了然的行動指南
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. TU Grade */}
            <div className="bg-[#fdf8ff] rounded-3xl p-6 lg:p-7 shadow-xs border border-[#5B459B]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f2ebff] flex items-center justify-center text-[#5B459B]">
                      <span className="material-symbols-outlined text-[22px]">grade</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-extrabold text-[#2B225A]">
                      環聯信貸評級 (TU Grade)
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    最高準則
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-6">
                  清晰劃分 A 至 J 等級，洞悉金融機構審批傾向，讓你對自身信貸實力了如指掌。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#5B459B]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#00D67D] text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-xs">
                      A
                    </span>
                    <span className="text-sm font-extrabold text-[#2B225A]">優秀 (Excellent)</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold">按揭審批成功率最高</span>
                </div>
                <div className="grid grid-cols-10 gap-1 pt-1">
                  <div className="h-2.5 rounded-l bg-[#00D67D]" title="Grade A"></div>
                  <div className="h-2.5 bg-[#38E09A]" title="Grade B"></div>
                  <div className="h-2.5 bg-[#69E8B2]" title="Grade C"></div>
                  <div className="h-2.5 bg-[#9BEFCB]" title="Grade D"></div>
                  <div className="h-2.5 bg-slate-200" title="Grade E"></div>
                  <div className="h-2.5 bg-slate-200" title="Grade F"></div>
                  <div className="h-2.5 bg-slate-200" title="Grade G"></div>
                  <div className="h-2.5 bg-slate-200" title="Grade H"></div>
                  <div className="h-2.5 bg-slate-200" title="Grade I"></div>
                  <div className="h-2.5 rounded-r bg-slate-200" title="Grade J"></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#6b6678] font-semibold pt-1">
                  <span>Grade A (最優質)</span>
                  <span>Grade J (需改善)</span>
                </div>
              </div>
            </div>

            {/* 2. Score & Rank */}
            <div className="bg-[#fdf8ff] rounded-3xl p-6 lg:p-7 shadow-xs border border-[#5B459B]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00B6ED]">
                      <span className="material-symbols-outlined text-[22px]">leaderboard</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-extrabold text-[#2B225A]">
                      信貸評分及全港排名
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold">
                    精確量化
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-6">
                  1,000 至 4,000 分精確量化，掌握你在全港持卡人群體中的百分比位置。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#5B459B]/10 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#6b6678] font-medium">個人目前評分</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#2B225A] font-mono-num">3,520</span>
                    <span className="text-xs text-[#6b6678]">分</span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#00B6ED] via-[#5B459B] to-[#00D67D] h-2.5 rounded-full"
                    style={{ width: '92%' }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold pt-1">
                  <span className="text-slate-400">底線 1,000分</span>
                  <span className="text-emerald-700 font-bold">超越全港 92% 用戶</span>
                  <span className="text-slate-400">滿分 4,000分</span>
                </div>
              </div>
            </div>

            {/* 3. Account balance */}
            <div className="bg-[#fdf8ff] rounded-3xl p-6 lg:p-7 shadow-xs border border-[#5B459B]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#5B459B]">
                      <span className="material-symbols-outlined text-[22px]">account_balance</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-extrabold text-[#2B225A]">
                      信貸賬戶結餘總額
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#f2ebff] text-[#5B459B] text-xs font-bold">
                    負債監察
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-6">
                  整合名下各類分期與信用額度使用率（建議維持於 30%–50% 健康區間）。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#5B459B]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6b6678] font-medium">現時信用額度使用率</span>
                  <span className="text-sm font-extrabold text-emerald-600 font-mono-num">
                    32% (理想健康區間)
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-[#00D67D] h-2.5 rounded-full" style={{ width: '32%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-[#6b6678] font-semibold pt-1">
                  <span>0% 充足</span>
                  <span className="text-emerald-700 font-bold">黃金建議區間 (30%-50%)</span>
                  <span>100% 飽和</span>
                </div>
              </div>
            </div>

            {/* 4. Trends */}
            <div className="bg-[#fdf8ff] rounded-3xl p-6 lg:p-7 shadow-xs border border-[#5B459B]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-[#E83375]">
                      <span className="material-symbols-outlined text-[22px]">insights</span>
                    </div>
                    <h3 className="text-base lg:text-lg font-extrabold text-[#2B225A]">
                      評級走勢與改善建議
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                    動態追蹤
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-slate-600 leading-relaxed mb-6">
                  追蹤歷史趨勢，逐步修復並向 A 級優良評分邁進，獲取專屬優化建議。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#5B459B]/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                    <span className="text-xs font-bold">連續 6 個月保持穩步上揚</span>
                  </div>
                  <span className="text-[11px] text-[#6b6678]">近半年紀錄</span>
                </div>
                <div className="h-10 w-full pt-1">
                  <svg className="w-full h-full text-[#00D67D]" fill="none" preserveAspectRatio="none" viewBox="0 0 280 40">
                    <path
                      d="M0 35 C40 32, 60 28, 90 24 C130 18, 170 20, 210 12 C240 6, 260 4, 280 2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                    <circle cx="280" cy="2" fill="#00D67D" r="4" />
                  </svg>
                </div>
                <div className="flex justify-between text-[11px] text-[#6b6678] font-semibold">
                  <span>半年前 (Grade C)</span>
                  <span>3 個月前 (Grade B)</span>
                  <span className="text-emerald-700 font-bold">現在 (Grade A)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Steps To Unlock */}
      <section className="w-full py-16 bg-[#fdf8ff] border-t border-[#5B459B]/10" id="how-to-check">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#E83375] font-extrabold">
              FAST & SIMPLE
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2B225A]">
              只需 3 步，最快 1 分鐘免費解鎖你的報告
            </h2>
            <p className="text-sm text-[#6b6678]">
              全程於手機應用程式完成，不留痕跡，即時生成專屬信貸評估
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#5B459B]/15 relative flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-[#00D67D] text-slate-900 font-black text-xl flex items-center justify-center shadow-xs">
                    1
                  </span>
                  <span className="material-symbols-outlined text-slate-400 text-[28px]">install_mobile</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">下載 PayKool 手機 App</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    前往 App Store 或 Google Play 搜尋下載 PayKool 官方應用程式。
                  </p>
                </div>
              </div>
              <div className="pt-6 flex items-center gap-2">
                <span className="flex-1 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold text-center">
                  App Store
                </span>
                <span className="flex-1 py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold text-center">
                  Google Play
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#5B459B]/15 relative flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-[#00B6ED] text-white font-black text-xl flex items-center justify-center shadow-xs">
                    2
                  </span>
                  <span className="material-symbols-outlined text-slate-400 text-[28px]">badge</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">完成簡易身分實名登記</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    輸入基本個人資料，透過香港身分證極速完成安全認證，全天候 24/7 即時核實。
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">lock</span>
                  <span>香港銀行級資安加密保障</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-[#5B459B]/15 relative flex flex-col justify-between hover:-translate-y-1 transition-transform">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-[#5B459B] text-white font-black text-xl flex items-center justify-center shadow-xs">
                    3
                  </span>
                  <span className="material-symbols-outlined text-slate-400 text-[28px]">assessment</span>
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#2B225A] mb-2">即時點擊解鎖信貸報告</h3>
                  <p className="text-xs lg:text-sm text-slate-600 leading-relaxed">
                    點擊主頁「智能信貸評估報告」，即刻於手機螢幕查閱個人專屬 TU 評分與評級分析。
                  </p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('platinum')}
                  className="w-full py-3 px-4 rounded-full bg-[#00D67D] hover:bg-[#00c572] text-slate-900 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>立即開啟 App 查閱</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="w-full py-16 bg-white border-t border-[#5B459B]/10">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#5B459B] font-extrabold">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl lg:text-3xl font-black text-[#2B225A]">常見問題解答</h2>
            <p className="text-sm text-[#6b6678]">為您解答關於智能信貸評估報告及環聯評級的所有疑問</p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#fdf8ff] rounded-2xl border border-[#5B459B]/15 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 lg:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm lg:text-base text-[#2B225A] font-extrabold">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[#5B459B] text-[22px] transition-transform duration-300 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 lg:px-6 pb-6 text-slate-600 text-xs lg:text-sm leading-relaxed border-t border-[#5B459B]/10 pt-4 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Disclaimer Note */}
      <section className="w-full py-6 bg-[#fdf8ff] border-t border-[#5B459B]/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-[#f7f1ff] rounded-2xl p-5 border border-[#5B459B]/10">
            <p className="text-xs text-[#6b6678] leading-relaxed">
              *「智能信貸評估報告」服務資訊由環聯提供並只供參考，本公司不會對相關資訊的提供、內容、完整性及準確性負上任何責任。對任何因使用或不當使用相關資訊而直接或間接引致的任何損失或損害，本公司概不承擔任何法律責任或責任。本公司有權隨時終止提供此服務而不作出任何通知，本公司對提供此服務保留最終決定權。上述產品受條款及細則約束，K Cash保留最終審批決定權。#合資格用戶每月可使用服務一次。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
