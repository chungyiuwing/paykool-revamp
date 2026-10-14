import React, { useState } from 'react';
import { PageType } from '../types';

interface CompareCardsPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const CompareCardsPage: React.FC<CompareCardsPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(2); // Default open item 3 like in HTML

  const faqs = [
    {
      q: '如果我已經持有 PayKool Visa Platinum 卡，還可以加辦 Prop Card 嗎？',
      a: '可以。只要閣下為香港物業（私人住宅、居屋、工商物業或獨立車位）之合法登記業主，即可直接在 PayKool 手機應用程式或網上理財直接加辦 Prop Card。兩張信用卡的信貸額度獨立核算運作，讓您一方面享受 Visa Platinum 卡的日常生活簽賬彈性，同時兼享 Prop Card 專為業主特設的高達 HK$1,000,000 大額低息套現與物業開支長年期分期。',
    },
    {
      q: '聯名物業持有人可以申請 Prop Card 嗎？',
      a: '可以。凡姓名列於最新季度香港差餉物業估價署發出之差餉單，或香港土地註冊處之合法登記業主，即使物業為夫婦或家人聯名持有，每一位登記業主皆符合獨立申請 Prop Card 的資格，毋須其他聯名持有人簽署授權或抵押樓契。',
    },
    {
      q: '兩張卡的「Fun K 易」現金分期收費有何分別？',
      a: 'Prop Card 是專為香港業主度身訂造的旗艦卡款，其「Fun K 易」現金套現服務享有專屬特惠每月手續費（低至 0.12% 起）以及長達 60 個月還款期，更支援最高達 HK$1,000,000 的大額套現；而 Visa Platinum 卡的「Fun K 易」現金分期月手續費為 0.17% 起，最高額度為 HK$100,000，適合一般靈活短期應急周轉。',
    },
    {
      q: '申請 PayKool 信用卡會影響我的環聯 (TU) 信貸評級嗎？',
      a: '不會。在初步資格評估、線上即時物業估值與預先獲批額度查詢階段，PayKool 採用國際通用的「Soft Check 軟性查詢」技術。該查詢過程絕不會在您的環聯 (TransUnion) 報告中留下記錄，亦不會對您的信貸評分造成任何負面影響，讓您安心比較與規劃資金。',
    },
  ];

  return (
    <div className="w-full bg-[#fdf8ff] min-h-screen">
      {/* Top Breadcrumb & Page Intro Banner */}
      <section className="w-full bg-gradient-to-b from-[#ece4ff]/60 via-[#fdf8ff] to-[#fdf8ff] pb-6 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-xs font-semibold text-[#6b6678]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#432c82] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>主頁</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span>信用卡</span>
            <span className="material-symbols-outlined text-[14px] text-slate-300">chevron_right</span>
            <span className="text-[#432c82] font-bold">比較信用卡</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#e6dff8] text-[#432c82] text-xs font-bold">
                <span className="material-symbols-outlined text-[16px] text-[#F02D7D]">compare_arrows</span>
                <span>2025 年度雙旗艦信用卡詳細對決</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-[#1F1841] tracking-tight">
                比較 PayKool 信用卡
              </h1>
              <p className="text-sm md:text-base text-[#6b6678] leading-relaxed">
                一覽 PayKool Visa Platinum 卡與 Prop Card（業主專屬卡）之各項權益、套現手續費、信用額度與迎新禮遇，找出最合適你的理財夥伴。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-[#f1ebff] text-[#432c82] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#00C48C]">check_circle</span>
                100% 繁體中文支援
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#f1ebff] text-[#432c82] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#00C48C]">bolt</span>
                即時 AI 智能審批
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#f1ebff] text-[#432c82] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#00C48C]">sync_alt</span>
                FPS 轉數快即日過數
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#f1ebff] text-[#432c82] text-xs font-bold flex items-center gap-1 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#00C48C]">shield</span>
                免費 Soft Check TU
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Comparison Control Dock */}
      <section className="sticky top-20 z-30 w-full bg-white/95 backdrop-blur-md shadow-md py-4 px-4 sm:px-6 lg:px-8 border-b border-[#ece4ff]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-3 flex flex-col justify-center">
              <span className="text-xs uppercase text-[#6b6678] font-bold tracking-wider">雙卡對比矩陣</span>
              <h2 className="text-lg font-bold text-[#1F1841]">選擇最適合你的卡別</h2>
              <span className="text-[11px] text-[#6b6678] mt-0.5">點擊按鈕可直接提交即時申請</span>
            </div>

            {/* Platinum Mini Column */}
            <div className="md:col-span-4 bg-[#fdf8ff] rounded-xl p-3 shadow-xs border border-[#ece4ff] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-12 h-8 rounded-lg bg-gradient-to-tr from-[#6347A6] via-[#F02D7D] to-[#7E57C2] shadow-xs flex flex-col justify-between p-1 shrink-0 text-white">
                  <span className="text-[6px] font-bold tracking-tighter">PayKool</span>
                  <span className="material-symbols-outlined text-[10px] self-end">contactless</span>
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#F02D7D] block truncate">Visa Platinum 卡</span>
                  <span className="font-mono-num text-xs text-[#1F1841] font-bold">最高 HK$100,000</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenApplyModal('platinum')}
                className="shrink-0 bg-[#00C48C] hover:bg-[#00C48C]/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>申請</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>

            {/* Prop Card Mini Column */}
            <div className="md:col-span-5 bg-[#1F1841] text-white rounded-xl p-3 shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-12 h-8 rounded-lg bg-gradient-to-tr from-[#120F24] via-[#2B225A] to-[#E5B869]/40 shadow-xs flex flex-col justify-between p-1 shrink-0 text-[#E5B869]">
                  <span className="text-[6px] font-bold tracking-tighter">PROP</span>
                  <span className="material-symbols-outlined text-[10px] self-end">villa</span>
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#E5B869] block truncate">Prop Card（業主專屬卡）</span>
                  <span className="font-mono-num text-xs text-white font-bold">高達 HK$1,000,000</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onOpenApplyModal('prop')}
                className="shrink-0 bg-gradient-to-r from-[#E5B869] to-[#F02D7D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>業主申請</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Dual Card Showcase Gallery */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Platinum Showcase */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between border border-[#ece4ff]">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ffd9e0] text-[#8f0040] text-xs font-bold inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  新世代消費・靈活自主分期
                </span>
                <span className="text-xs text-[#6b6678]">虛擬/實體同享</span>
              </div>

              {/* 3D Platinum Card */}
              <div className="w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-[#2B225A] via-[#6347A6] to-[#F02D7D] p-5 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold tracking-tight">PayKool</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/20 text-white font-mono-num uppercase">
                      Platinum
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[24px]">contactless</span>
                </div>
                <div className="w-9 h-7 rounded-md bg-gradient-to-br from-slate-200 to-slate-400 p-1 flex flex-col justify-around">
                  <div className="w-full h-0.5 bg-black/20"></div>
                  <div className="w-full h-0.5 bg-black/20"></div>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono-num text-xs tracking-widest text-[#ece4ff]">•••• 8820</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-200 font-bold">
                      HONG KONG CARDMEMBER
                    </p>
                  </div>
                  <span className="text-xl italic font-bold tracking-tighter">VISA</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1F1841] mb-1">PayKool Visa Platinum 卡</h3>
                <p className="text-sm text-[#6b6678] leading-relaxed">
                  首創 3 / 4 / 5 個月自選免息分期，最快 3 分鐘批核入 Apple Pay / Google Pay，日常聚會、網購、繳費無負擔。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-3 rounded-xl bg-[#f1ebff]">
                  <span className="block text-[11px] text-[#6b6678]">最高套現限額</span>
                  <span className="font-mono-num text-sm font-bold text-[#1F1841]">HK$100,000</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f1ebff]">
                  <span className="block text-[11px] text-[#6b6678]">分期月手續費</span>
                  <span className="font-mono-num text-sm font-bold text-[#F02D7D]">0.17% 起</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f1ebff]">
                  <span className="block text-[11px] text-[#6b6678]">主卡年費</span>
                  <span className="font-mono-num text-sm font-bold text-[#00C48C]">首年免年費</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenApplyModal('platinum')}
                className="w-full inline-flex items-center justify-center gap-2 text-white bg-[#00C48C] hover:bg-[#00C48C]/90 font-bold text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>立即申請 Platinum 卡</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Prop Card Showcase */}
          <div className="bg-[#1F1841] text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between border border-[#E5B869]/30">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-[#E5B869]/20 text-[#E5B869] text-xs font-bold inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">stars</span>
                  業主尊尚・高額低息套現首選
                </span>
                <span className="text-xs text-[#E5B869] font-bold">免押樓契・免按揭</span>
              </div>

              {/* 3D Prop Card */}
              <div className="w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-[#0F0C1E] via-[#2B225A] to-[#372A70] p-5 text-white shadow-xl relative overflow-hidden flex flex-col justify-between border border-[#E5B869]/30">
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold tracking-tight text-[#E5B869]">PayKool</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#E5B869] text-[#1F1841] font-mono-num font-bold uppercase">
                      PROP CARD
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-[#E5B869]">home_pin</span>
                </div>
                <div className="w-9 h-7 rounded-md bg-gradient-to-br from-[#E5B869] via-[#F6DE9C] to-[#E5B869]/70 p-1 flex flex-col justify-around">
                  <div className="w-full h-0.5 bg-black/30"></div>
                  <div className="w-full h-0.5 bg-black/30"></div>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono-num text-xs tracking-widest text-[#E5B869]">•••• 9988</p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-200 font-bold">
                      PREMIER PROPERTY OWNER
                    </p>
                  </div>
                  <span className="text-xl italic font-bold tracking-tighter text-[#E5B869]">INFINITE</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">PayKool Prop Card（業主卡）</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  憑差餉單極速批核免交樓契，高達 HK$300,000 至 HK$1,000,000 大額低息周轉，專為香港業主物業升值與修繕而設。
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2">
                <div className="p-3 rounded-xl bg-[#2B225A]">
                  <span className="block text-[11px] text-slate-400">專屬套現限額</span>
                  <span className="font-mono-num text-sm font-bold text-[#E5B869]">高達 HK$100萬</span>
                </div>
                <div className="p-3 rounded-xl bg-[#2B225A]">
                  <span className="block text-[11px] text-slate-400">業主特惠月費</span>
                  <span className="font-mono-num text-sm font-bold text-[#00C48C]">0.12% 起</span>
                </div>
                <div className="p-3 rounded-xl bg-[#2B225A]">
                  <span className="block text-[11px] text-slate-400">還款彈性期</span>
                  <span className="font-mono-num text-sm font-bold text-[#E5B869]">長達 60 個月</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => onOpenApplyModal('prop')}
                className="w-full inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#E5B869] to-[#F02D7D] font-bold text-sm py-3.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>立即申請 Prop Card（業主專屬）</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Dimension Structured Comparison Matrix Table */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f1ff]">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs text-[#F02D7D] font-bold uppercase tracking-wider">權益細節一覽</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1841]">
                4 大維度規格完整比對表
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6b6678]">
              <span className="text-amber-500 font-bold">★ 星號標記</span>
              <span>代表該卡具備壓倒性或專屬獨家優勢</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-md border border-[#ece4ff]">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead>
                <tr className="bg-[#ece4ff] text-[#1c192b]">
                  <th className="p-5 text-sm font-bold text-[#432c82] w-1/3">比較項目 / 規格指標</th>
                  <th className="p-5 text-sm font-bold text-[#432c82] w-1/3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#F02D7D]"></span>
                      <span>PayKool Visa Platinum 卡</span>
                    </div>
                  </th>
                  <th className="p-5 text-sm font-bold text-[#1F1841] w-1/3 bg-[#f1ebff]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#E5B869]"></span>
                      <span>PayKool Prop Card（業主卡）</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                
                {/* CATEGORY 1 */}
                <tr className="bg-[#432c82] text-white">
                  <td className="px-5 py-3 font-bold flex items-center gap-2" colSpan={3}>
                    <span className="material-symbols-outlined text-[18px] text-[#E5B869]">paid</span>
                    <span>類別 1：核心特色與卡貸套現優勢 (Card Loan & Cash Advance)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">
                    現金分期「Fun K 易」最高套現額
                    <span className="block text-[11px] text-[#6b6678] font-normal">根據信貸評級與個人審批資質核定</span>
                  </td>
                  <td className="p-5">
                    <span className="font-mono-num font-bold text-[#432c82]">最高 HK$100,000</span>
                    <p className="text-xs text-[#6b6678]">或現有信用限額之 100% 額度靈活轉現</p>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="font-mono-num font-bold text-[#1F1841]">
                      <span className="text-amber-500">★</span> 高達 HK$300,000 至 HK$1,000,000
                    </span>
                    <p className="text-xs text-[#6b6678]">專為香港私樓、居屋及工商業主大額周轉打造</p>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">
                    現金分期月手續費 / 實際年利率 (APR)
                    <span className="block text-[11px] text-[#6b6678] font-normal">固定平息計算，提早清還免罰息</span>
                  </td>
                  <td className="p-5">
                    <span className="font-mono-num font-bold text-[#432c82]">月手續費 0.17% 起</span>
                    <p className="text-xs text-[#6b6678]">實際年利率 (APR) 低至 3.88%，依個人 TU 評估而定</p>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="font-mono-num font-bold text-[#1F1841]">
                      <span className="text-amber-500">★</span> 業主特惠月手續費低至 0.12% 起
                    </span>
                    <p className="text-xs text-[#6b6678]">尊享業主專屬超低息，每年節省數千元至萬元利息支出</p>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">
                    過數方式與到賬速度
                    <span className="block text-[11px] text-[#6b6678] font-normal">支援全港主流銀行本港賬戶</span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1 text-[#00C48C] font-bold">
                      <span className="material-symbols-outlined text-[17px]">bolt</span>
                      <span>FPS 轉數快 24x7 即日過數</span>
                    </div>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <div className="flex items-center gap-1 text-[#00C48C] font-bold">
                      <span className="material-symbols-outlined text-[17px]">verified</span>
                      <span>FPS 即時過數 + 專屬大額綠色通道</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">
                    大額裝修及物業開支分期
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-[#1F1841]">3 / 4 / 5 個月簽賬自主分期</p>
                    <p className="text-xs text-[#6b6678]">小額消費靈活拆單，免受循環年息困擾</p>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <p className="font-bold text-[#1F1841]">
                      <span className="text-amber-500">★</span> 尊享 6 至 60 個月特惠低息長分期
                    </p>
                    <p className="text-xs text-[#6b6678]">涵蓋全屋翻新、冷氣防水維修及奢華家電配備</p>
                  </td>
                </tr>

                {/* CATEGORY 2 */}
                <tr className="bg-[#432c82] text-white">
                  <td className="px-5 py-3 font-bold flex items-center gap-2" colSpan={3}>
                    <span className="material-symbols-outlined text-[18px] text-[#E5B869]">assignment_ind</span>
                    <span>類別 2：申請資格與審批門檻 (Eligibility & Approval)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">目標受眾定位</td>
                  <td className="p-5">年滿 18 歲香港居民、全日制大專院校學生、初入職場新人及一般上班族</td>
                  <td className="p-5 bg-[#fbf8fd]">
                    年滿 18 歲香港居民，並持有香港住宅、居屋、工商或車位之登記業主（聯名業主亦合資格）
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">入息與資產證明要求</td>
                  <td className="p-5">一般客戶僅需最近 3 個月入息證明；全日制大專生免入息證明即可在線申辦</td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="text-amber-600 font-bold">★ 毋須抵押樓契、免按揭登記</span><br />
                    只需出示最新季度差餉單或土地註冊處證明即可批核
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">智能審批時間</td>
                  <td className="p-5">AI 智能極速審批，最快 3 分鐘出結果，即時綁定 Apple Pay / Google Pay 消費</td>
                  <td className="p-5 bg-[#fbf8fd]">業主專屬綠色通道，在線快速物業自動估值，專人優先核批</td>
                </tr>

                {/* CATEGORY 3 */}
                <tr className="bg-[#432c82] text-white">
                  <td className="px-5 py-3 font-bold flex items-center gap-2" colSpan={3}>
                    <span className="material-symbols-outlined text-[18px] text-[#E5B869]">card_giftcard</span>
                    <span>類別 3：專屬禮遇與迎新優惠 (Rewards & Privileges)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">迎新獎賞 (限時「4 揀 1」)</td>
                  <td className="p-5">
                    <ul className="space-y-1 text-xs text-[#6b6678] list-disc list-inside">
                      <li><strong>Tokiwa 20吋</strong>前開蓋旅行行李篋</li>
                      <li><strong>HK$500</strong> 門市免找數簽賬額</li>
                      <li><strong>HKTVmall HK$500</strong> 現金電子購物券</li>
                      <li>Apple Duo 專屬簽賬折扣換購優惠</li>
                    </ul>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="text-amber-600 font-bold">★ 尊尚業主迎新大賞 (高達 HK$1,000)</span>
                    <ul className="space-y-1 text-xs text-[#6b6678] list-disc list-inside mt-1">
                      <li>高達 <strong>HK$1,000</strong> 免找數現金簽賬回贈</li>
                      <li>首年指定家居保險特約優惠</li>
                      <li>高級知名品牌家電折扣禮券包</li>
                    </ul>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">商戶優惠與生活禮遇</td>
                  <td className="p-5">全港熱門生活消費折扣（GIORMANI 茲曼尼、759阿信屋等），日常簽賬累積積分</td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="text-amber-600 font-bold">★ 物業管費 / 差餉地租繳費積分加倍</span><br />
                    指定家居裝修、水電工程及名貴建材商戶專屬折上折回贈
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">免息還款期</td>
                  <td className="p-5">長達 46 日免息還款期</td>
                  <td className="p-5 bg-[#fbf8fd]">長達 46 日免息還款期</td>
                </tr>

                {/* CATEGORY 4 */}
                <tr className="bg-[#432c82] text-white">
                  <td className="px-5 py-3 font-bold flex items-center gap-2" colSpan={3}>
                    <span className="material-symbols-outlined text-[18px] text-[#E5B869]">receipt_long</span>
                    <span>類別 4：年費及常規收費 (Fees & Charges)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">主卡年費</td>
                  <td className="p-5">
                    <span className="text-[#00C48C] font-bold">首年免年費</span><br />
                    <span className="text-xs text-[#6b6678]">其後每年 HK$1,800（年簽賬達標可申請豁免）</span>
                  </td>
                  <td className="p-5 bg-[#fbf8fd]">
                    <span className="text-[#00C48C] font-bold">業主專屬首年免年費</span><br />
                    <span className="text-xs text-[#6b6678]">次年憑任一期物業費用簽賬即可持續豁免</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-5 font-bold text-[#1F1841]">附屬卡政策</td>
                  <td className="p-5">首 2 張附屬卡終身免年費，方便與家人共享信用額度</td>
                  <td className="p-5 bg-[#fbf8fd]">尊尚附屬卡共享業主高額額度，家庭大額裝修採購無障礙</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Decision Cards: 哪張 PayKool 信用卡最適合你？ */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-[#f1ebff] text-[#432c82] text-xs font-bold">
              理財配對指南
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1841]">
              哪張 PayKool 信用卡最適合你？
            </h2>
            <p className="text-sm text-[#6b6678]">
              依據個人身份與資金規劃偏好，快速找出為你省下最多利息、賺取最豐厚回贈的理想選擇。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Persona 1: Platinum */}
            <div className="bg-[#fdf8ff] rounded-3xl p-6 sm:p-8 shadow-xs border border-[#ece4ff] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd9e0] flex items-center justify-center text-[#F02D7D]">
                    <span className="material-symbols-outlined text-[28px]">shopping_bag</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#F02D7D]">大專生 / 上班族推薦</span>
                    <h3 className="text-lg font-bold text-[#1F1841]">PayKool Visa Platinum 卡</h3>
                  </div>
                </div>

                <p className="text-xs text-[#6b6678]">
                  如果你符合以下大部分特質，Visa Platinum 卡就是你的首選日常卡：
                </p>

                <ul className="space-y-2.5 text-xs text-[#1c192b]">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#00C48C] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>想擁有首張免繁複入息證明信用卡之大專全日制學生</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#00C48C] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>日常生活以餐飲美饌、超市購物、網購及數碼訂閱消費為主</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#00C48C] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>想自選 3 / 4 / 5 個月自主分期，拒絕掉入一般銀行的循環複利陷阱</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#00C48C] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>追求 3 分鐘即時發卡、秒速綁定 Apple Pay / Google Pay 手機支付</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#ece4ff]">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('platinum')}
                  className="w-full inline-flex items-center justify-center gap-2 text-white bg-[#432c82] hover:bg-[#2B225A] py-3.5 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>立即申請 Visa Platinum 卡</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Persona 2: Prop Card */}
            <div className="bg-[#1F1841] text-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#E5B869]/30 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E5B869]/20 flex items-center justify-center text-[#E5B869]">
                    <span className="material-symbols-outlined text-[28px]">apartment</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#E5B869]">物業業主尊享</span>
                    <h3 className="text-lg font-bold text-white">PayKool Prop Card（業主專屬卡）</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  如果你符合以下條件，Prop Card 將為你釋放資產流動潛力：
                </p>

                <ul className="space-y-2.5 text-xs text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#E5B869] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>持有香港私樓、居屋、工商物業或私家車位之登記業主（聯名亦可）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#E5B869] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>籌備新居入伙、大型家居裝修工程、添置名貴傢俬或高階電器設備</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#E5B869] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>毋須抵押樓契，希望單憑差餉單快速套現 HK$300,000+ 應急周轉</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#E5B869] text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span>追求超低每月手續費（低至 0.12%）及長達 60 個月還款靈活性</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-purple-900/50">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('prop')}
                  className="w-full inline-flex items-center justify-center gap-2 text-white bg-gradient-to-r from-[#E5B869] to-[#F02D7D] py-3.5 rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>立即申請 Prop Card（業主專屬）</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dual Card FAQ Accordion */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#f7f1ff]">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1 mb-8">
            <h2 className="text-2xl font-bold text-[#1F1841]">雙卡常見問題解答 (FAQ)</h2>
            <p className="text-sm text-[#6b6678]">了解更多審批機制、物業資格要求及信貸評級影響。</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-xs overflow-hidden border border-[#ece4ff]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#1F1841] hover:text-[#432c82] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#432c82] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#6b6678] leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Conversion Banner */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-[#1F1841] via-[#2B225A] to-[#432c82] p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-xs text-[#E5B869] font-bold uppercase tracking-wider">
              即開即用・秒速發卡
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              現在申辦，享高達 HK$1,500 迎新禮遇！
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              無論是追求靈活分期的年輕世代，或是需要大額資金的精明業主，PayKool 均為你提供最貼心的智慧理財體驗。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => onOpenApplyModal('platinum')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#00C48C] hover:bg-[#00C48C]/90 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              立即申請 Platinum 卡
            </button>
            <button
              type="button"
              onClick={() => onOpenApplyModal('prop')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E5B869] to-[#F02D7D] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              立即申請 Prop Card (業主卡)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
