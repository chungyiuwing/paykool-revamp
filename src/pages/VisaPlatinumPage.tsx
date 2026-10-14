import React, { useState } from 'react';
import { PageType } from '../types';

interface VisaPlatinumPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const VisaPlatinumPage: React.FC<VisaPlatinumPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  // Calculator state
  const [amount, setAmount] = useState<number>(6000);
  const [tenor, setTenor] = useState<3 | 4 | 5>(3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Calculation logic with first $5,000 handling fee waiver
  const feeRates: Record<3 | 4 | 5, number> = {
    3: 0.018,
    4: 0.024,
    5: 0.03,
  };

  const feeableAmount = Math.max(0, amount - 5000);
  const handlingFee = Math.round(feeableAmount * feeRates[tenor]);
  const monthlyRepay = Math.round((amount + handlingFee) / tenor);
  const savedFee = Math.round(Math.min(amount, 5000) * feeRates[tenor]);

  const welcomeGifts = [
    {
      id: 'luggage',
      tag: '人氣推介',
      title: 'Tokiwa 20吋 前開蓋商務行李篋',
      desc: '輕巧 PC 韌性材質，多向靜音飛機輪，前開筆電隔層快速取物，價值 HK$1,380。',
      condition: '發卡後 60 天內累積簽賬滿 HK$4,800',
      icon: 'luggage',
    },
    {
      id: 'hktv',
      tag: '網購達人',
      title: 'HK$500 HKTVmall 電子現金券',
      desc: '無門檻全平台通用，配合 PayKool 週三加碼再折上折，直接入賬購物錢包。',
      condition: '發卡後 60 天內累積簽賬滿 HK$3,000',
      icon: 'shopping_cart',
    },
    {
      id: 'cash',
      tag: '無拘無束',
      title: 'HK$400 免找數簽賬額',
      desc: '自動抵扣次月賬單，真金白銀回贈，簽賬立享直接減免。',
      condition: '發卡後 30 天內單一簽賬滿 HK$1,500',
      icon: 'payments',
    },
    {
      id: 'duo',
      tag: 'Apple Duo 專屬',
      title: 'Apple Duo 換購 HK$500 現金回贈',
      desc: '於指定 Apple 授權合作商買 iPhone/MacBook 享專屬額外 $500 即減。',
      condition: '發卡後 60 天內單一買機滿 HK$2,000',
      icon: 'devices',
    },
  ];

  const faqs = [
    {
      q: 'PayKool Visa Platinum 信用卡免入息證明真的可以批核嗎？',
      a: '是的！PayKool 採用先進的金融科技風險評估模型，大專學生、自由職業者（Freelancer）或家庭主婦只需持有有效香港永久性居民身份證即可申請。初步審批完全不查傳統工作入息證明，最快 3 分鐘即可在 App 內獲得初步信用額度。',
    },
    {
      q: '首 HK$5,000 自主分期手續費豁免是如何運作的？',
      a: '無論新舊客戶，只要您使用 PayKool 信用卡單一簽賬或累積簽賬進行 3、4 或 5 個月自主分期，當中的首 HK$5,000 金額均享有 0% 手續費與 0 利息。超過 HK$5,000 的餘額部分才按優惠費率（每月約 0.18% 至 0.3%）計算手續費，幫您節省高達 100% 的分期開支！',
    },
    {
      q: '批核後多快可以開始用卡？',
      a: '經 App 核批後，系統即時核發 PayKool 虛擬卡號及安全驗證碼。您可即時將卡片加入 Apple Pay 或 Google Wallet，即時進行線下實體店感應支付或網上購物，完全毋須等待實體卡寄達。實體信用卡將於 3 至 5 個工作天內免費掛號郵寄至您的通訊地址。',
    },
    {
      q: 'PayKool Visa Platinum 卡有年費嗎？如何豁免？',
      a: 'PayKool Visa Platinum 信用卡首年永久免年費。次年起年費為 HK$800，只需於該年度內累積簽賬滿 5 次（不限金額）或累積簽賬滿 HK$10,000，即可透過 App 一鍵全額豁免次年年費。',
    },
    {
      q: '「Fun K 易」現金分期與自主消費分期有何不同？',
      a: '自主分期是針對您的日常信用卡刷卡消費，將交易金額分為 3 至 5 期攤還；而「Fun K 易」是即時現金透支及套現貸款服務，可直接將信用卡可用信貸額度（最高 HK$100,000）以 FPS 轉數快直接轉入您名下的任何香港銀行賬戶，提供 3 至 36 個月還款期，手續費每月低至 0.17% 起。',
    },
  ];

  return (
    <div className="w-full bg-[#fdf8ff] min-h-screen">
      {/* 1. Breadcrumbs */}
      <section className="w-full bg-gradient-to-b from-[#ece4ff]/60 via-[#fdf8ff] to-[#fdf8ff] pt-6 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#6b6678]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#432c82] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>主頁</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <button
              onClick={() => onNavigate('compare')}
              className="hover:text-[#432c82] transition-colors cursor-pointer"
            >
              信用卡
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="text-[#432c82] font-bold">PayKool Visa Platinum 信用卡</span>
          </nav>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="w-full pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Card Visual */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[390px] aspect-[1.586/1] rounded-3xl p-6 sm:p-7 text-white shadow-2xl flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1F1841] via-[#352564] to-[#120D27] border border-[#6b52ad]/40 group hover:scale-[1.02] transition-transform duration-300">
                {/* Visual Glows */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E83375]/30 to-transparent rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#00AAEE]/20 rounded-full blur-2xl pointer-events-none"></div>
                
                {/* Header of Card */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black tracking-tight text-white">PayKool</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E83375] text-white tracking-widest uppercase">
                      Platinum
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#FCE3CB] text-[24px]">contactless</span>
                </div>

                {/* EMV Chip & Hologram */}
                <div className="flex items-center gap-4 relative z-10 my-4">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-[#F4D06F] via-[#DFB15B] to-[#AA7C11] border border-amber-300/40 relative shadow-inner flex items-center justify-center">
                    <div className="w-full h-[1px] bg-black/30 absolute"></div>
                    <div className="h-full w-[1px] bg-black/30 absolute"></div>
                    <div className="w-6 h-5 rounded-sm border border-black/40"></div>
                  </div>
                  <span className="material-symbols-outlined text-white/50 text-[20px]">bolt</span>
                </div>

                {/* Card Number & Visa Logo */}
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono text-[11px] tracking-widest text-slate-300 uppercase">
                      VALUED CARDMEMBER
                    </p>
                    <p className="font-mono text-base font-bold tracking-widest text-white mt-0.5">
                      •••• •••• •••• 8892
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black italic tracking-tighter text-white">VISA</span>
                    <p className="text-[9px] uppercase font-bold tracking-widest text-[#E83375] -mt-1">
                      Platinum
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Tags Under Card */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#ece4ff] text-xs font-semibold text-[#1F1841] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-green-500">check_circle</span>
                  首年永久免年費
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#ece4ff] text-xs font-semibold text-[#1F1841] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#5B459B]">bolt</span>
                  3 分鐘即批即用
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-[#ece4ff] text-xs font-semibold text-[#1F1841] shadow-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#E83375]">credit_card</span>
                  最高 HK$100,000 信用額
                </span>
              </div>
            </div>

            {/* Right: Intro & Key Highlights */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ebff] text-[#5B459B] text-xs font-bold mb-3 border border-[#5B459B]/20">
                  <span className="material-symbols-outlined text-[16px] text-[#E83375]">verified</span>
                  <span>旗艦熱門卡款 · 靈活自主分期日常必備</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161324] tracking-tight leading-tight">
                  PayKool Visa Platinum 信用卡
                </h1>
                <p className="text-[#5f5792] text-base sm:text-lg mt-3 leading-relaxed">
                  簽賬自主分期，掌控消費節奏。簽賬滿 $100 即享 3 / 4 / 5 個月自選期數，更享首 HK$5,000 分期手續費豁免。學生、自由職業皆可免入息證明快速申請，秒批即綁 Apple Pay！
                </p>
              </div>

              {/* 3 Metric Summary Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-[#ece4ff] shadow-xs">
                  <span className="text-xs text-[#6b6678] font-medium block">最高信貸額度</span>
                  <span className="text-xl sm:text-2xl font-black text-[#5B459B] mt-0.5 block">
                    HK$100,000
                  </span>
                  <span className="text-[11px] text-[#5f5792]">最快 3 分鐘 AI 秒批</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ece4ff] shadow-xs">
                  <span className="text-xs text-[#6b6678] font-medium block">自主分期特惠</span>
                  <span className="text-xl sm:text-2xl font-black text-[#E83375] mt-0.5 block">
                    首 $5,000 免費
                  </span>
                  <span className="text-[11px] text-[#5f5792]">0 利息 · 0 隱藏手續費</span>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#ece4ff] shadow-xs">
                  <span className="text-xs text-[#6b6678] font-medium block">現金周轉「Fun K 易」</span>
                  <span className="text-xl sm:text-2xl font-black text-[#00AAEE] mt-0.5 block">
                    月費低至 0.17%
                  </span>
                  <span className="text-[11px] text-[#5f5792]">FPS 轉數快即時到戶</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('visa-platinum')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#E83375] via-[#5B459B] to-[#2B225A] text-white font-extrabold text-base shadow-xl shadow-[#5B459B]/25 hover:opacity-95 hover:scale-[1.02] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>立即申請 Visa Platinum</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <a
                  href="#simulator"
                  className="px-6 py-4 rounded-2xl bg-white text-[#1F1841] font-bold text-base border border-[#ece4ff] shadow-xs hover:bg-[#f2ebff] transition-all cursor-pointer flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#5B459B]">calculate</span>
                  <span>即時分期試算</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Welcome Offers 4-in-1 */}
      <section className="w-full bg-white py-16 border-y border-[#ece4ff]" id="welcome-gifts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-[#E83375] uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[16px]">redeem</span>
                <span>迎新好禮 4 選 1</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight">
                全新客戶專享迎新禮遇
              </h2>
              <p className="text-[#5f5792] text-sm mt-1">
                成功出卡並達到指定簽賬條件，即可自選豐富迎新大禮！
              </p>
            </div>
            <div className="text-xs text-[#6b6678] font-medium bg-[#fdf8ff] px-4 py-2 rounded-xl border border-[#ece4ff]">
              推廣期至 2027 年 12 月 31 日止
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {welcomeGifts.map((gift) => (
              <div
                key={gift.id}
                className="bg-[#fdf8ff] rounded-2xl p-6 border border-[#ece4ff] hover:shadow-lg transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#5B459B] to-[#E83375] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[24px]">{gift.icon}</span>
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#E83375]/10 text-[#E83375]">
                      {gift.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#161324] mb-2 leading-snug">
                    {gift.title}
                  </h3>
                  <p className="text-xs text-[#5f5792] leading-relaxed mb-4">
                    {gift.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#ece4ff]/60">
                  <p className="text-[11px] text-[#6b6678] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-[#5B459B]">rule</span>
                    <span>{gift.condition}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Live Repayment Simulator (Anchor: #simulator) */}
      <section className="w-full py-16 bg-[#F7F4FD]" id="simulator">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#5B459B]/10 text-[#5B459B] text-xs font-bold mb-2">
              透明計算 · 零隱藏收費
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight">
              PayKool 靈活分期試算機
            </h2>
            <p className="text-sm text-[#5f5792] mt-2">
              首 HK$5,000 分期免手續費！立即輸入想分期的簽賬金額試算每月供款：
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ece4ff] shadow-xl">
            {/* Amount Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label htmlFor="spend-input" className="text-sm font-bold text-[#161324]">擬分期簽賬金額</label>
                <div className="text-2xl sm:text-3xl font-black text-[#5B459B]">
                  HK$ {amount.toLocaleString()}
                </div>
              </div>

              <input
                id="spend-input"
                type="range"
                min="500"
                max="50000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-[#ece4ff] rounded-lg appearance-none cursor-pointer accent-[#5B459B]"
              />

              <div className="flex justify-between text-xs text-[#6b6678] mt-2 font-medium">
                <span>HK$ 500</span>
                <span>HK$ 20,000</span>
                <span>HK$ 50,000</span>
              </div>

              {/* Amount Quick Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {[3000, 5000, 10000, 20000, 35000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      amount === val
                        ? 'bg-[#5B459B] text-white'
                        : 'bg-[#f2ebff] text-[#5B459B] hover:bg-[#ece4ff]'
                    }`}
                  >
                    HK$ {val.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Tenor Selection */}
            <div className="mb-8">
              <label className="text-sm font-bold text-[#161324] block mb-3">選擇自主分期期數</label>
              <div className="grid grid-cols-3 gap-3">
                {([3, 4, 5] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTenor(t)}
                    className={`p-4 rounded-xl border-2 font-bold text-center transition-all cursor-pointer ${
                      tenor === t
                        ? 'border-[#E83375] bg-[#E83375]/5 text-[#E83375] shadow-xs'
                        : 'border-[#ece4ff] bg-[#fdf8ff] text-[#494551] hover:border-[#5B459B]/40'
                    }`}
                  >
                    <span className="text-lg sm:text-xl block">{t} 個月</span>
                    <span className="text-[11px] font-normal text-[#6b6678] block mt-0.5">
                      {t === 3 ? '手續費 1.8%' : t === 4 ? '手續費 2.4%' : '手續費 3.0%'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment Breakdown Result Card */}
            <div className="bg-gradient-to-br from-[#1F1841] via-[#2B225A] to-[#432C82] text-white p-6 sm:p-8 rounded-2xl shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                <div className="sm:pr-4">
                  <span className="text-xs text-slate-300 block mb-1">預計每月供款</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FCE3CB]">
                    HK$ {monthlyRepay.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">共 {tenor} 期</span>
                </div>

                <div className="pt-4 sm:pt-0 sm:px-4">
                  <span className="text-xs text-slate-300 block mb-1">分期總手續費</span>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-2xl font-bold text-white">
                      HK$ {handlingFee.toLocaleString()}
                    </span>
                    {amount <= 5000 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-extrabold bg-[#E83375] text-white">
                        $0 全免
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-green-300 block mt-1">
                    首 $5,000 豁免省下 HK$ {savedFee}
                  </span>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-4">
                  <span className="text-xs text-slate-300 block mb-1">總還款金額</span>
                  <span className="text-2xl font-bold text-white">
                    HK$ {(amount + handlingFee).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">無循環利息</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-300 leading-relaxed text-center sm:text-left">
                  * 此試算結果僅供參考，實際每月手續費及還款額以 PayKool App 最終核准及出賬單為準。
                </p>
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('visa-platinum')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E83375] hover:bg-[#d62866] text-white font-bold text-sm transition-all cursor-pointer shrink-0"
                >
                  以試算額度申請
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. 3-Step Simple Application Process */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#E83375]/10 text-[#E83375] text-xs font-bold mb-2 inline-block">
              極速數碼流程
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight">
              3 分鐘輕鬆出卡 · 即審即用
            </h2>
            <p className="text-sm text-[#5f5792] mt-1">全程手機完成，無需面交，無需繁複住址或入息證明文件</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-[#fdf8ff] rounded-2xl border border-[#ece4ff] relative">
              <div className="w-14 h-14 rounded-2xl bg-[#5B459B] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold text-[#161324] mb-2">線上登記資料</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                只需香港永久性居民身份證及手機號碼，2 分鐘透過 PayKool 智能系統核實身份。
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#fdf8ff] rounded-2xl border border-[#ece4ff] relative">
              <div className="w-14 h-14 rounded-2xl bg-[#E83375] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold text-[#161324] mb-2">AI 智能即時批核</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                採用大數據與金融科技模型秒級評估，不查傳統入息證明，即刻獲批信用額度。
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-[#fdf8ff] rounded-2xl border border-[#ece4ff] relative">
              <div className="w-14 h-14 rounded-2xl bg-[#00AAEE] text-white flex items-center justify-center font-black text-xl mb-4 shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold text-[#161324] mb-2">綁定錢包即刷</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                虛擬卡立即加入 Apple Pay / Google Wallet 開始簽賬，實體卡片免費掛號寄至府上。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fees, Rates & Eligibility Table */}
      <section className="w-full bg-[#fdf8ff] py-16 border-t border-[#ece4ff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#5B459B] uppercase tracking-wider">規費與收費標準</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight mt-1">
              收費標準與申請資格一覽
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-[#ece4ff] overflow-hidden shadow-xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <tbody className="divide-y divide-[#ece4ff]">
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] w-1/3 bg-[#F7F4FD]">信用卡年費</th>
                  <td className="py-4 px-6 text-[#494551]">
                    <span className="font-bold text-green-600">首年永久豁免</span>。次年 HK$800（年度累積簽賬滿 5 次或滿 HK$10,000 自動豁免）
                  </td>
                </tr>
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] bg-[#F7F4FD]">免息還款期</th>
                  <td className="py-4 px-6 text-[#494551]">
                    長達 <strong>46 日</strong>（如每月到期還款日或之前全數繳付）
                  </td>
                </tr>
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] bg-[#F7F4FD]">自主分期手續費</th>
                  <td className="py-4 px-6 text-[#494551]">
                    <strong>首 HK$5,000 手續費全免 (0%)</strong>；超出部分月手續費 0.18% 至 0.30%
                  </td>
                </tr>
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] bg-[#F7F4FD]">現金套現 (Fun K 易)</th>
                  <td className="py-4 px-6 text-[#494551]">
                    每月手續費低至 <strong>0.17% 起</strong>（實際年利率低至 3.8%），FPS 轉數快最快 1 分鐘過數
                  </td>
                </tr>
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] bg-[#F7F4FD]">外幣簽賬手續費</th>
                  <td className="py-4 px-6 text-[#494551]">
                    1.95%（含 Visa 國際組織徵收之費用）
                  </td>
                </tr>
                <tr className="hover:bg-[#fdf8ff]">
                  <th className="py-4 px-6 font-bold text-[#161324] bg-[#F7F4FD]">申請資格</th>
                  <td className="py-4 px-6 text-[#494551]">
                    年滿 18 歲之香港居民；免年薪限制，學生、自僱及初職人士皆可快速申請
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion */}
      <section className="w-full bg-white py-16 border-t border-[#ece4ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#E83375] uppercase tracking-wider">常見問題</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight mt-1">
              PayKool Visa Platinum 常見疑問解答
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#ece4ff] overflow-hidden transition-all bg-[#fdf8ff]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#161324] hover:bg-[#f2ebff] transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#5B459B] transition-transform duration-200 shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  >
                    keyboard_arrow_down
                  </span>
                </button>

                {openFaq === index && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#5f5792] leading-relaxed border-t border-[#ece4ff]/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Fast Track Apply Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#1F1841] via-[#5B459B] to-[#E83375] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                準備好享受首 HK$5,000 免費分期了嗎？
              </h3>
              <p className="text-xs sm:text-sm text-[#FCE3CB] mt-1">
                3 分鐘極速網上批核，即開即買，自選迎新大禮！
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenApplyModal('visa-platinum')}
              className="px-8 py-3.5 rounded-xl bg-white text-[#1F1841] font-extrabold text-sm hover:bg-[#FCE3CB] transition-all cursor-pointer shrink-0 shadow-md"
            >
              即刻出卡
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
