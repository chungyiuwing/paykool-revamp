import React, { useState } from 'react';
import { PageType } from '../types';

interface CashAdvancePageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const CashAdvancePage: React.FC<CashAdvancePageProps> = ({ onNavigate }) => {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [selectedTenor, setSelectedTenor] = useState<number>(24);
  const [hkid, setHkid] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Constants
  const MONTHLY_FLAT_RATE = 0.002; // 0.20%

  // Calculations
  const monthlyPrincipal = loanAmount / selectedTenor;
  const monthlyFee = loanAmount * MONTHLY_FLAT_RATE;
  const monthlyTotal = Math.round(monthlyPrincipal + monthlyFee);
  const totalFee = Math.round(monthlyFee * selectedTenor);
  const totalRepay = Math.round(loanAmount + totalFee);

  const tenors = [6, 12, 18, 24, 36, 48, 60];
  const presets = [10000, 50000, 100000, 1000000];

  const handleAmountChange = (val: number) => {
    let sanitized = isNaN(val) ? 5000 : val;
    if (sanitized < 5000) sanitized = 5000;
    if (sanitized > 1000000) sanitized = 1000000;
    setLoanAmount(sanitized);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, 1500);
  };

  const scrollToApply = () => {
    const el = document.getElementById('apply-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('ring-2', 'ring-[#F02D7D]');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#F02D7D]'), 1500);
    }
  };

  return (
    <div className="w-full relative overflow-x-hidden min-h-screen">
      {/* Soft Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[600px] h-[500px] bg-purple-100/60 rounded-full blur-[130px] pointer-events-none -z-10"></div>
      <div className="fixed top-36 right-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-10 left-1/3 w-[550px] h-[450px] bg-blue-50/70 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs font-semibold text-[#6b6678]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#5B459B] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            <span>主頁</span>
          </button>
          <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
          <span className="text-[#5B459B] font-bold">現金分期套現 (FPS 即時過數)</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-8 sm:pt-10 sm:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#f1ebff] border border-[#5B459B]/20 text-[#5B459B] text-xs font-semibold mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00AAEE] animate-pulse"></span>
              <span>PayKool Visa 卡專屬信貸套現服務</span>
              <span className="text-[#6B6678] font-normal">| Instant Cash Facility</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#1F1841] tracking-tight leading-tight sm:leading-tight mb-4">
              即時信用額套現{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AAEE] via-[#6347A6] to-[#F02D7D]">
                資金秒速到手
              </span>
            </h1>
            <p className="text-[#494551] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
              無需入息證明文件，善用未動用之信用卡信用額轉化為現金儲備。全港首創全自動審批，經{' '}
              <strong className="text-[#5B459B] font-bold">FPS 轉數快</strong> 直達任何香港持牌銀行戶口。
            </p>
          </div>

          {/* 3 Key Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-[#CAC4D2]/60 shadow-xs hover:shadow-md hover:border-[#00AAEE]/60 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-[#00AAEE] text-2xl group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1F1841] group-hover:text-[#00AAEE] transition-colors">
                    最快即批即過數
                  </h3>
                  <p className="text-xs text-[#6B6678] mt-0.5">系統 24/7 自動對盤，FPS 秒速到賬</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#CAC4D2]/60 shadow-xs hover:shadow-md hover:border-[#F02D7D]/60 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200/80 flex items-center justify-center text-[#F02D7D] text-2xl group-hover:scale-110 transition-transform">
                  🗓️
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1F1841] group-hover:text-[#F02D7D] transition-colors">
                    自選彈性還款期
                  </h3>
                  <p className="text-xs text-[#6B6678] mt-0.5">6 至 60 個月自由分期，理財自主輕鬆</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#CAC4D2]/60 shadow-xs hover:shadow-md hover:border-[#6347A6]/60 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-[#f1ebff] border border-purple-200 flex items-center justify-center text-[#5B459B] text-2xl group-hover:scale-110 transition-transform">
                  💎
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#1F1841] group-hover:text-[#5B459B] transition-colors">
                    套現額高達 100 萬
                  </h3>
                  <p className="text-xs text-[#6B6678] mt-0.5">月平息低至 0.20%，實際年利率 0.05%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-grow w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Loan Calculator */}
          <section className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#CAC4D2]/70 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between pb-5 border-b border-[#CAC4D2]/40 mb-6">
              <div className="flex items-center space-x-2.5">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00AAEE] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00AAEE]"></span>
                </span>
                <h2 className="text-lg font-black text-[#1F1841] tracking-wide">分期試算器</h2>
              </div>
              <span className="text-xs font-mono-num font-semibold text-[#5B459B] bg-[#f1ebff] px-3 py-1 rounded-full border border-[#5B459B]/10">
                假設月平息: 0.20%
              </span>
            </div>

            {/* Input 1: Loan Amount */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#1c192b]" htmlFor="loan-amount-input">
                  提現金額 (Loan Amount)
                </label>
                <span className="text-xs font-medium text-[#6B6678]">
                  最低 HK$ 5,000 - 最高 HK$ 1,000,000
                </span>
              </div>

              <div className="relative rounded-2xl bg-[#F7F1FF] border-2 border-[#CAC4D2]/80 focus-within:border-[#5B459B] focus-within:bg-white transition-all p-3.5 flex items-center justify-between mb-4 shadow-inner">
                <span className="text-xl font-black text-[#5B459B] font-mono-num pl-1">HK$</span>
                <input
                  id="loan-amount-input"
                  type="number"
                  min={5000}
                  max={1000000}
                  step={1000}
                  value={loanAmount}
                  onChange={(e) => handleAmountChange(parseInt(e.target.value, 10))}
                  className="w-full bg-transparent text-right text-2xl sm:text-3xl font-extrabold font-mono-num text-[#1F1841] focus:outline-none border-none p-0 tracking-tight"
                />
              </div>

              <div className="px-1 mb-4">
                <input
                  type="range"
                  min={5000}
                  max={1000000}
                  step={5000}
                  value={loanAmount}
                  onChange={(e) => handleAmountChange(parseInt(e.target.value, 10))}
                  className="w-full cursor-pointer h-2 bg-[#f1ebff] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAmountChange(preset)}
                    className={`py-2 rounded-xl text-xs font-bold font-mono-num transition-all text-center cursor-pointer ${
                      loanAmount === preset
                        ? 'bg-[#5B459B] text-white border border-[#5B459B] shadow-xs'
                        : 'bg-[#F7F1FF] hover:bg-[#f1ebff] border border-[#CAC4D2]/60 text-[#1c192b]'
                    }`}
                  >
                    {preset === 100000 ? '★ $100,000' : `$${preset.toLocaleString()}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Tenor Selector */}
            <div className="mb-7">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-bold text-[#1c192b]">
                  自選還款期數 (Repayment Tenors)
                </label>
                <span className="text-xs font-bold text-[#5B459B]">
                  {selectedTenor} 個月 {selectedTenor >= 12 && `(${(selectedTenor / 12).toFixed(selectedTenor % 12 === 0 ? 0 : 1)} 年期)`}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {tenors.map((tenor) => (
                  <button
                    key={tenor}
                    type="button"
                    onClick={() => setSelectedTenor(tenor)}
                    className={`py-2.5 text-xs font-bold font-mono-num rounded-xl transition-all cursor-pointer ${
                      selectedTenor === tenor
                        ? 'border-2 border-[#5B459B] bg-[#5B459B] text-white shadow-sm'
                        : 'border border-[#CAC4D2]/70 bg-[#F7F1FF] text-[#1c192b] hover:border-[#5B459B]'
                    }`}
                  >
                    {tenor}期
                  </button>
                ))}
              </div>
            </div>

            {/* Real-Time Calculation Output Box */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2B225A] via-[#5B459B] to-[#1F1841] p-6 text-white shadow-xl">
              <div className="text-center pb-5 border-b border-white/15">
                <span className="text-xs uppercase tracking-widest text-[#f0ebfa] font-bold">
                  首期及每月平均還款額 (Estimated Monthly)
                </span>
                <div className="mt-2 flex items-baseline justify-center space-x-2">
                  <span className="text-[#00AAEE] text-xl font-bold font-mono-num">HK$</span>
                  <span className="text-4xl sm:text-5xl font-black font-mono-num tracking-tight text-white">
                    {monthlyTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#00C48C] mt-2 flex items-center justify-center font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#00C48C] mr-2 animate-pulse"></span>
                  經 FPS 轉數快即時全額放款
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-5 text-xs">
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <span className="text-white/70 block mb-1">每月手續費率</span>
                  <span className="font-mono-num font-bold text-white text-base">0.20%</span>
                  <span className="text-[11px] text-white/60 block mt-0.5">
                    (HK$ {Math.round(monthlyFee).toLocaleString()} / 月)
                  </span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <span className="text-white/70 block mb-1">總手續費</span>
                  <span className="font-mono-num font-bold text-white text-base">
                    HK$ {totalFee.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#00C48C] block mt-0.5 font-medium">全期無隱藏收費</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <span className="text-white/70 block mb-1">總還款額 (本息和)</span>
                  <span className="font-mono-num font-bold text-white text-base">
                    HK$ {totalRepay.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-white/60 block mt-0.5">本金加手續費</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/10">
                  <span className="text-white/70 block mb-1">實際年利率 (APR)</span>
                  <span className="font-mono-num font-bold text-[#E5B869] text-base">0.05%</span>
                  <span className="text-[11px] text-white/60 block mt-0.5">符合銀行公會指引</span>
                </div>
              </div>
            </div>

            {/* Sync to form CTA */}
            <button
              type="button"
              onClick={scrollToApply}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-[#F02D7D] via-[#b70054] to-[#5B459B] hover:opacity-95 text-white font-extrabold text-base shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-[0.99] cursor-pointer"
            >
              <span>以此試算方案立即申請</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <p className="mt-3 text-[11px] text-[#6B6678] text-center leading-normal">
              * 實際年利率乃根據香港銀行公會指引之方法計算。獲批之最終手續費率及貸款額視乎申請人 PayKool 賬戶信用狀況而定。
            </p>
          </section>

          {/* RIGHT: Fast Track Application Form */}
          <section
            id="apply-section"
            className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#CAC4D2]/70 shadow-xs relative overflow-hidden transition-all duration-300"
          >
            {/* 0 Fee Promo Ribbon */}
            <div className="mb-5 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F02D7D] via-[#b70054] to-[#2B225A] text-white p-5 sm:p-6 shadow-md border border-white/15">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-[#b70054] uppercase tracking-wider shadow-xs">
                    限時迎新特惠
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                    0成本體驗
                  </span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-baseline gap-1.5">
                    <span>首</span>
                    <span className="text-[#E5B869] font-mono-num text-xl sm:text-2xl font-black">
                      HK$5,000
                    </span>
                    <span>自主分期手續費全免！</span>
                  </h3>
                  <p className="text-xs text-white/90 mt-1 leading-relaxed font-medium">
                    所有新客尊享首月循環或分期 0 利息・0 成本自主分期
                  </p>
                </div>
                <div className="pt-2.5 border-t border-white/15 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/80 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="text-[#00C48C] font-bold">✓</span> 申請自動套用迎新優惠碼
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#00C48C] font-bold">✓</span> 無隱藏手續費
                  </span>
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-[#CAC4D2]/40 mb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#F02D7D] text-white uppercase tracking-wider">
                    FAST TRACK
                  </span>
                  <h2 className="text-lg font-black text-[#1F1841] tracking-wide">即時申請過數</h2>
                </div>
                <p className="text-xs text-[#6B6678] mt-1 font-medium">填妥基本個人資料即可極速審批</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* HKID */}
              <div>
                <label className="block text-xs font-bold text-[#1c192b] mb-1.5" htmlFor="ca-hkid">
                  香港身份證號碼 (HKID)
                </label>
                <input
                  id="ca-hkid"
                  type="text"
                  required
                  placeholder="例如: A123456(7)"
                  value={hkid}
                  onChange={(e) => setHkid(e.target.value)}
                  className="w-full bg-[#F7F1FF] border border-[#CAC4D2]/70 rounded-xl px-4 py-3 text-sm font-mono-num uppercase text-[#1F1841] focus:bg-white focus:border-[#5B459B] focus:outline-none transition-colors"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-xs font-bold text-[#1c192b] mb-1.5" htmlFor="ca-dob">
                  出生日期 (Date of Birth)
                </label>
                <input
                  id="ca-dob"
                  type="text"
                  required
                  placeholder="YYYY-MM-DD (例如: 1995-08-18)"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-[#F7F1FF] border border-[#CAC4D2]/70 rounded-xl px-4 py-3 text-sm font-mono-num text-[#1F1841] focus:bg-white focus:border-[#5B459B] focus:outline-none transition-colors"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold text-[#1c192b] mb-1.5" htmlFor="ca-mobile">
                  登記流動電話號碼 (Mobile Number)
                </label>
                <div className="flex space-x-2">
                  <div className="w-24 shrink-0 bg-[#ECE4FF] border border-[#CAC4D2]/70 rounded-xl px-3 py-3 text-sm font-mono-num font-bold text-[#1F1841] flex items-center justify-center">
                    +852
                  </div>
                  <input
                    id="ca-mobile"
                    type="tel"
                    required
                    maxLength={8}
                    placeholder="9123 4567"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 bg-[#F7F1FF] border border-[#CAC4D2]/70 rounded-xl px-4 py-3 text-sm font-mono-num text-[#1F1841] focus:bg-white focus:border-[#5B459B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1c192b] mb-1.5" htmlFor="ca-email">
                  電郵地址 (Email Address)
                </label>
                <input
                  id="ca-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F1FF] border border-[#CAC4D2]/70 rounded-xl px-4 py-3 text-sm font-mono-num text-[#1F1841] focus:bg-white focus:border-[#5B459B] focus:outline-none transition-colors"
                />
              </div>

              {/* Legal Checkbox */}
              <div className="pt-2 border-t border-[#CAC4D2]/40">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#F02D7D] border-[#CAC4D2]"
                  />
                  <span className="text-xs text-[#6B6678] leading-relaxed font-medium">
                    本人已詳細閱讀並同意 PayKool 信用卡現金分期之{' '}
                    <span className="text-[#5B459B] font-bold underline cursor-pointer">服務條款及細則</span>、
                    <span className="text-[#5B459B] font-bold underline cursor-pointer">個人資料收集聲明</span>{' '}
                    及授權進行信貸資料庫核實。
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F02D7D] via-[#b70054] to-[#5B459B] hover:opacity-95 text-white font-extrabold text-base tracking-wide shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>處理 FPS 即時過數中...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    <span>下一步</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Overlay Modal */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center z-20 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-[#00C48C] flex items-center justify-center mb-4 text-[#00C48C] text-3xl font-bold shadow-md">
                  ✓
                </div>
                <h3 className="text-2xl font-black text-[#1F1841] mb-2">審批成功・款項已發出！</h3>
                <p className="text-[#494551] text-xs max-w-sm mb-5 font-medium leading-relaxed">
                  我們已透過 FPS 轉數快將套現金額直接過數至閣下之指定戶口。請查閱閣下之手機 SMS 短訊及銀行到賬通知。
                </p>

                <div className="bg-[#F7F1FF] border border-[#CAC4D2] rounded-2xl p-4 w-full max-w-xs text-xs font-mono-num mb-6 text-left space-y-2 shadow-inner">
                  <div className="flex justify-between">
                    <span className="text-[#6B6678]">交易參考編號:</span>
                    <span className="text-[#5B459B] font-bold">PK-202609-8821</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6678]">套現金額:</span>
                    <span className="text-[#1F1841] font-bold">HK$ {loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6678]">分期期數:</span>
                    <span className="text-[#1F1841] font-bold">{selectedTenor} 個月</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B6678]">預估每月供款:</span>
                    <span className="text-[#00C48C] font-bold">HK$ {monthlyTotal.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowSuccess(false)}
                  className="px-7 py-3 rounded-xl bg-[#5B459B] hover:bg-[#2B225A] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  完成並返回
                </button>
              </div>
            )}
          </section>

        </div>
      </main>
    </div>
  );
};
