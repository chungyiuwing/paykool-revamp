import React, { useState } from 'react';
import { PageType } from '../types';

interface PropCardPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const PropCardPage: React.FC<PropCardPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  // Simulator state for homeowner high-limit financing
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [tenorMonths, setTenorMonths] = useState<12 | 24 | 36 | 48 | 60>(36);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Prop card preferential handling fee: ~0.12% to 0.15% per month
  const monthlyRates: Record<12 | 24 | 36 | 48 | 60, number> = {
    12: 0.0012,
    24: 0.0013,
    36: 0.0014,
    48: 0.0015,
    60: 0.0016,
  };

  const monthlyHandlingFee = Math.round(loanAmount * monthlyRates[tenorMonths]);
  const principalPerMonth = Math.round(loanAmount / tenorMonths);
  const totalMonthlyRepayment = principalPerMonth + monthlyHandlingFee;
  const totalHandlingFee = monthlyHandlingFee * tenorMonths;

  const propPrivileges = [
    {
      title: '高達 HK$1,000,000 信用額',
      desc: '憑物業業主身份專享超高信用額度，無論是大型家居裝修、子女留學或業務短期周轉，資金調配從容自在。',
      icon: 'domain',
      tag: '高額授信',
    },
    {
      title: '毋須押契 · 簡化審批',
      desc: '免抵押樓契、免律師樓繁複手續及公證費用。只需提供最新差餉單或物業查冊證明，最快當天極速核准。',
      icon: 'verified_user',
      tag: '無繁瑣手續',
    },
    {
      title: '超長 60 個月還款期',
      desc: '特設 12 至 60 個月超靈活自選攤分年期，每月供款負擔極低，手續費每月低至 0.12% 起。',
      icon: 'schedule',
      tag: '靈活輕鬆',
    },
    {
      title: '物管費與差餉 1.5% 回贈',
      desc: '設定 PayKool Prop Card 自動轉賬繳交全港各大屋苑物業管理費及季度差餉地租，全年享高達 1.5% 現金回贈。',
      icon: 'real_estate_agent',
      tag: '專屬回贈',
    },
  ];

  const eligiblePropertyTypes = [
    { title: '私人屋苑住宅', desc: '全港所有已補地價或未補地價私人住宅、單幢洋房及獨立別墅', icon: 'apartment' },
    { title: '居屋 / 綠置居', desc: '包括未補地價及已補地價之香港房屋委員會居者有其屋屋苑', icon: 'holiday_village' },
    { title: '工商商廈及舖位', desc: '寫字樓、工業大廈單位、商場獨立舖位及街舖物業登記業主', icon: 'storefront' },
    { title: '獨立車位', desc: '全港各區私人屋苑或商業停車場之獨立有契車位持有人', icon: 'local_parking' },
  ];

  const faqs = [
    {
      q: '物業為聯名擁有（如夫婦聯名），可以獨立申請 Prop Card 嗎？',
      a: '可以！凡名列於最新季度差餉單或土地註冊處物業登記名冊上的任何一位合法業主，均具備獨立申請資格。審批流程完全不需要另一位聯名業主出面簽署或同意，額度及還款亦全由申請人獨立承擔，保障您的財務私隱。',
    },
    {
      q: '申請 Prop Card 需要抵押樓契或去律師樓辦手續嗎？',
      a: '完全不需要！PayKool Prop Card 屬於無抵押業主尊享信用產品。我們絕不收取樓契、不辦理按揭登記、不經律師樓，亦不會向土地註冊處註冊釘契。您只需要手機拍照上傳最新差餉單即可完成物業身份認證。',
    },
    {
      q: '已按揭或未供完按揭的物業可以申請嗎？',
      a: '可以！不論您的物業現時正由各大銀行承造一按、二按，抑或已經全數供畢，均不影響 Prop Card 的申請。我們著重評估您的業主身份與良好信用記錄，提供額外的靈活備用現金周轉。',
    },
    {
      q: '高達 HK$1,000,000 的額度如何提取現金？',
      a: '成功獲批核後，您可以隨時於 PayKool App 內使用「Fun K 易」業主大額現金套現功能。輸入提款金額及自選 12 至 60 個月分期後，款項會以 FPS「轉數快」即時（最快 1 分鐘）直接匯入您名下的任何香港指定銀行戶口，即時靈活運用。',
    },
    {
      q: 'Prop Card 有年費嗎？',
      a: 'Prop Card 持卡人尊享「物業持有人終身免年費」禮遇。只要您維持合資格業主身份，無需任何簽賬門檻，每年均自動全額豁免年費！',
    },
  ];

  return (
    <div className="w-full bg-[#0c0914] text-white min-h-screen">
      {/* 1. Breadcrumb navigation */}
      <section className="w-full bg-[#161224] border-b border-[#2d2545] pt-6 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#FCE3CB] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>主頁</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-600">chevron_right</span>
            <button
              onClick={() => onNavigate('compare')}
              className="hover:text-[#FCE3CB] transition-colors cursor-pointer"
            >
              信用卡
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-600">chevron_right</span>
            <span className="text-[#DFC28D] font-bold">PayKool Prop Card（業主專屬卡）</span>
          </nav>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#161224] via-[#0f0c1a] to-[#0c0914]">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#DFC28D]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#5B459B]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Prop Card Visual */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[400px] aspect-[1.586/1] rounded-3xl p-6 sm:p-7 text-white shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1C172B] via-[#0E0B17] to-[#07050C] border-2 border-[#DFC28D]/40 group hover:scale-[1.02] transition-transform duration-300">
                {/* Champagne gold shimmer reflection */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-gradient-to-br from-[#DFC28D]/20 via-[#FCE3CB]/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5B459B]/20 rounded-full blur-xl pointer-events-none"></div>

                {/* Card Header */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-white">PayKool</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#DFC28D] text-[#161224] tracking-widest uppercase">
                      Prop Card
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#DFC28D] text-[26px]">domain</span>
                </div>

                {/* Gold Chip & Contactless */}
                <div className="flex items-center gap-4 relative z-10 my-4">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#FCE3CB] via-[#DFC28D] to-[#9E7D3B] border border-amber-200/60 relative shadow-inner flex items-center justify-center">
                    <div className="w-full h-[1px] bg-black/40 absolute"></div>
                    <div className="h-full w-[1px] bg-black/40 absolute"></div>
                    <div className="w-6 h-5 rounded-sm border border-black/50"></div>
                  </div>
                  <span className="material-symbols-outlined text-[#DFC28D]/70 text-[20px]">contactless</span>
                </div>

                {/* Card Holder & Visa Infinite */}
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-[#DFC28D]/80 uppercase">
                      PROPERTY OWNER SIGNATURE
                    </p>
                    <p className="font-mono text-base font-bold tracking-widest text-white mt-0.5">
                      •••• •••• •••• 6289
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black italic tracking-tighter text-[#DFC28D]">VISA</span>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-[#FCE3CB] -mt-1">
                      Infinite Prop
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges Under Card */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C172B] border border-[#DFC28D]/30 text-xs font-semibold text-[#FCE3CB]">
                  <span className="material-symbols-outlined text-[16px] text-[#DFC28D]">workspace_premium</span>
                  物業持有人終身免年費
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C172B] border border-[#DFC28D]/30 text-xs font-semibold text-[#FCE3CB]">
                  <span className="material-symbols-outlined text-[16px] text-[#DFC28D]">gavel</span>
                  免樓契 · 免律師費
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1C172B] border border-[#DFC28D]/30 text-xs font-semibold text-[#FCE3CB]">
                  <span className="material-symbols-outlined text-[16px] text-[#DFC28D]">currency_exchange</span>
                  FPS 最快 1 分鐘放款
                </span>
              </div>
            </div>

            {/* Right: Pitch & Highlights */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241d38] border border-[#DFC28D]/40 text-[#DFC28D] text-xs font-bold mb-3">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                  <span>香港物業業主首選 · 專屬高額低息金融旗艦</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  PayKool Prop Card<br />
                  <span className="bg-gradient-to-r from-[#DFC28D] via-[#FCE3CB] to-[#FFFFFF] bg-clip-text text-transparent">
                    業主尊享專屬信用卡
                  </span>
                </h1>
                <p className="text-slate-300 text-base sm:text-lg mt-3 leading-relaxed">
                  專為香港物業業主度身訂造。最高獲批 HK$1,000,000 尊尚信貸額，免押樓契、免手續繁瑣，差餉單即核！靈活調配大額資金，長達 60 個月低息還款，家居裝修工程與物管開支首選。
                </p>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#1C172B] p-4 rounded-2xl border border-[#DFC28D]/30 shadow-md">
                  <span className="text-xs text-[#DFC28D] font-medium block">最高授信額度</span>
                  <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block font-mono">
                    HK$1,000,000
                  </span>
                  <span className="text-[11px] text-slate-400">差餉單簡化即批</span>
                </div>

                <div className="bg-[#1C172B] p-4 rounded-2xl border border-[#DFC28D]/30 shadow-md">
                  <span className="text-xs text-[#DFC28D] font-medium block">套現月手續費</span>
                  <span className="text-xl sm:text-2xl font-black text-[#FCE3CB] mt-0.5 block font-mono">
                    低至 0.12% 起
                  </span>
                  <span className="text-[11px] text-slate-400">特惠業主專享費率</span>
                </div>

                <div className="bg-[#1C172B] p-4 rounded-2xl border border-[#DFC28D]/30 shadow-md">
                  <span className="text-xs text-[#DFC28D] font-medium block">分期最長還款期</span>
                  <span className="text-xl sm:text-2xl font-black text-white mt-0.5 block font-mono">
                    長達 60 個月
                  </span>
                  <span className="text-[11px] text-slate-400">自選 1 至 5 年靈活期數</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('prop')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DFC28D] via-[#FCE3CB] to-[#E5C992] text-[#161224] font-black text-base shadow-xl shadow-[#DFC28D]/20 hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">real_estate_agent</span>
                  <span>即時申請 Prop Card</span>
                </button>

                <a
                  href="#prop-calculator"
                  className="px-6 py-4 rounded-2xl bg-[#1C172B] text-white font-bold text-base border border-[#DFC28D]/40 shadow-xs hover:bg-[#251f38] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#DFC28D]">calculate</span>
                  <span>大額套現試算</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. 4 Key Homeowner Privileges */}
      <section className="w-full bg-[#110e1c] py-16 border-y border-[#2d2545]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DFC28D] uppercase tracking-wider">尊尚專利權益</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              為業主定制的核心四大專屬禮遇
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              超越傳統銀行繁瑣借貸，以科技金融賦予物業更高流動性
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propPrivileges.map((item, i) => (
              <div
                key={i}
                className="bg-[#1C172B] rounded-2xl p-6 border border-[#DFC28D]/20 hover:border-[#DFC28D]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DFC28D] to-[#9E7D3B] text-[#161224] flex items-center justify-center font-bold shadow-md">
                      <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#DFC28D]/10 text-[#DFC28D] border border-[#DFC28D]/30">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Eligible Property Types */}
      <section className="w-full bg-[#0c0914] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DFC28D] uppercase tracking-wider">物業類別覆蓋</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              全港多元物業類型皆可申請
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              不論住宅、居屋或工商物業，聯名業主亦可獨立以個人名義辦理
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eligiblePropertyTypes.map((prop, idx) => (
              <div
                key={idx}
                className="bg-[#161224] p-6 rounded-2xl border border-white/10 flex flex-col items-start hover:border-[#DFC28D]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#241d38] text-[#DFC28D] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">{prop.icon}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-1.5">{prop.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Homeowner Loan & Renovation Simulator (Anchor: #prop-calculator) */}
      <section className="w-full py-16 bg-[#161224] border-t border-[#2d2545]" id="prop-calculator">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#DFC28D]/10 border border-[#DFC28D]/30 text-[#DFC28D] text-xs font-bold mb-2">
              業主尊屬特惠費率
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Prop Card 大額資金分期試算機
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              月手續費低至 0.12% 起，自選 12 至 60 個月超長年期，即時試算每月供款：
            </p>
          </div>

          <div className="bg-[#1F1833] rounded-3xl p-6 sm:p-8 border border-[#DFC28D]/30 shadow-2xl">
            {/* Amount Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="prop-amount-input" className="text-sm font-bold text-white">擬提取 / 分期金額</label>
                <div className="text-2xl sm:text-3xl font-black text-[#FCE3CB] font-mono">
                  HK$ {loanAmount.toLocaleString()}
                </div>
              </div>

              <input
                id="prop-amount-input"
                type="range"
                min="50000"
                max="1000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-[#0c0914] rounded-lg appearance-none cursor-pointer accent-[#DFC28D]"
              />

              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>HK$ 50,000</span>
                <span>HK$ 500,000</span>
                <span>HK$ 1,000,000</span>
              </div>

              {/* Amount Quick Presets */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[100000, 300000, 500000, 800000, 1000000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLoanAmount(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      loanAmount === val
                        ? 'bg-[#DFC28D] text-[#161224]'
                        : 'bg-[#29223e] text-[#FCE3CB] hover:bg-[#342b4e]'
                    }`}
                  >
                    HK$ {(val / 10000).toFixed(0)} 萬
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor Selection */}
            <div className="mb-8">
              <label className="text-sm font-bold text-white block mb-3">自選攤分期數（月）</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {([12, 24, 36, 48, 60] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenorMonths(t)}
                    className={`p-3 rounded-xl border-2 font-bold text-center transition-all cursor-pointer ${
                      tenorMonths === t
                        ? 'border-[#DFC28D] bg-[#DFC28D]/10 text-[#FCE3CB] shadow-xs'
                        : 'border-white/10 bg-[#161224] text-slate-400 hover:border-[#DFC28D]/40'
                    }`}
                  >
                    <span className="text-base sm:text-lg block font-mono">{t} 期</span>
                    <span className="text-[11px] font-normal text-slate-400 block mt-0.5">
                      ({t / 12} 年)
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment Breakdown Result */}
            <div className="bg-gradient-to-br from-[#0c0914] via-[#161224] to-[#251c3a] border border-[#DFC28D]/40 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                <div className="sm:pr-4">
                  <span className="text-xs text-[#DFC28D] block mb-1">預計每月供款</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    HK$ {totalMonthlyRepayment.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">共 {tenorMonths} 期</span>
                </div>

                <div className="pt-4 sm:pt-0 sm:px-4">
                  <span className="text-xs text-[#DFC28D] block mb-1">每月特惠手續費</span>
                  <span className="text-2xl font-bold text-[#FCE3CB] font-mono">
                    HK$ {monthlyHandlingFee.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    月平息 {(monthlyRates[tenorMonths] * 100).toFixed(2)}%
                  </span>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-xs text-[#DFC28D] block mb-1">總還款額</span>
                  <span className="text-2xl font-bold text-white font-mono">
                    HK$ {(loanAmount + totalHandlingFee).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    總手續費 HK$ {totalHandlingFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-400 leading-relaxed text-center sm:text-left">
                  * 試算結果僅供參考。實際月平息及供款額視乎申請人之信貸評分及最終核准條件為準。放款經 FPS 轉數快即時過數。
                </p>
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('prop')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#DFC28D] to-[#E5C992] text-[#161224] font-black text-sm transition-all cursor-pointer shrink-0 hover:opacity-90"
                >
                  以此額度申請
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Simple 3-Step Verification for Homeowners */}
      <section className="w-full bg-[#110e1c] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#DFC28D] uppercase tracking-wider">極速申請流程</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              只需差餉單 · 3 步解鎖百萬額度
            </h2>
            <p className="text-slate-400 text-sm mt-1">全程手機操作，免入息、免樓契、免律師樓</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-[#1C172B] rounded-2xl border border-white/10 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#DFC28D] text-[#161224] flex items-center justify-center font-black text-xl mb-4 shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-white mb-2">填寫物業地址與個人資料</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                輸入香港物業地址與聯絡電話，系統即時連線差餉物業估價資料庫進行初步資格配對。
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#1C172B] rounded-2xl border border-white/10 relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#DFC28D] to-[#FCE3CB] text-[#161224] flex items-center justify-center font-black text-xl mb-4 shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-white mb-2">上傳最新差餉單確認身份</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                手機拍照差餉繳費單即可快速認證業主身份，免押樓契，亦無需聯名業主簽署。
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#1C172B] rounded-2xl border border-white/10 relative">
              <div className="w-14 h-14 rounded-2xl bg-[#5B459B] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI 智能秒批 · FPS 即時放款</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                核定額度後可直接將現金轉入您指定的任何銀行賬戶，或將卡片綁定手機錢包消費。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Fee & Terms Matrix */}
      <section className="w-full bg-[#0c0914] py-16 border-t border-[#2d2545]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#DFC28D] uppercase tracking-wider">規費與收費標準</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              PayKool Prop Card 收費標準與資格一覽
            </h2>
          </div>

          <div className="bg-[#1C172B] rounded-2xl border border-white/10 overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] w-1/3 bg-[#161224]">信用卡年費</th>
                  <td className="py-4 px-6 text-slate-200">
                    <span className="font-bold text-green-400">物業持有人終身豁免年費 (HK$0)</span>
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">最高信用額度</th>
                  <td className="py-4 px-6 text-slate-200">
                    最高可達 <strong>HK$1,000,000</strong>（視乎物業估值與信貸綜合評審）
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">大額套現／分期期數</th>
                  <td className="py-4 px-6 text-slate-200">
                    自選 <strong>12 至 60 個月</strong>（超長 5 年靈活攤還）
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">每月特惠手續費</th>
                  <td className="py-4 px-6 text-slate-200">
                    低至 <strong>0.12% 起</strong>（實際年利率低至 2.7% 起）
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">免息還款期</th>
                  <td className="py-4 px-6 text-slate-200">
                    長達 <strong>56 日</strong>（日常零售簽賬適用）
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">物業抵押要求</th>
                  <td className="py-4 px-6 text-slate-200">
                    <strong className="text-[#DFC28D]">免押樓契 · 免律師費 · 免土地註冊釘契</strong>
                  </td>
                </tr>
                <tr className="hover:bg-white/5">
                  <th className="py-4 px-6 font-bold text-[#DFC28D] bg-[#161224]">申請資格</th>
                  <td className="py-4 px-6 text-slate-200">
                    年滿 18 歲之香港永久居民，並持有香港住宅、居屋、工商物業或獨立車位（聯名登記人可獨立申請）
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="w-full bg-[#110e1c] py-16 border-t border-[#2d2545]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#DFC28D] uppercase tracking-wider">常見問題</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              PayKool Prop Card 常見疑問解答
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 overflow-hidden transition-all bg-[#161224]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#DFC28D] transition-transform duration-200 shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>

                {openFaq === index && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 bg-[#1C172B]">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Fast Track Apply Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1C172B] via-[#2F2447] to-[#1C172B] border border-[#DFC28D]/50 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                立即解鎖您的高達 HK$1,000,000 業主專屬額度
              </h3>
              <p className="text-xs sm:text-sm text-[#DFC28D] mt-1">
                只需一張差餉單，極速線上審批，FPS 轉數快最快 1 分鐘過數！
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenApplyModal('prop')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#DFC28D] to-[#FCE3CB] text-[#161224] font-black text-sm hover:opacity-90 transition-all cursor-pointer shrink-0 shadow-md"
            >
              立即申請 Prop Card
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
