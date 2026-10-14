import React, { useState, useEffect, useRef } from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenApplyModal,
}) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (page: PageType, hash?: string) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate(page, hash);
  };

  return (
    <>
      {/* 1. Top Sticky Announcement Bar */}
      <aside className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#1F1841] via-[#5B459B] to-[#2B225A] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#E83375] text-white animate-pulse">
              熱門迎新
            </span>
            <span className="truncate">
              新客迎新 4 揀 1 進行中：送 Tokiwa 20吋前開行李篋或 HK$500 門市現金券！
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('promotions')}
              className="text-white hover:text-[#FCE3CB] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>立即登記</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Unified Header Navigation */}
      <header className="w-full bg-white/95 backdrop-blur-xl border-b border-[#ece4ff] sticky top-10 z-40 shadow-[0_2px_12px_rgba(91,69,155,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo & Corporate Tag */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <img
                alt="PayKool Logo"
                className="h-10 w-auto object-contain rounded-xl shadow-xs transition-transform group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCha5aooS-NhwpW5dt_RV2Yzn1WvexdwwaOvsCAu3mzvIdwWzrMlgWh9_HOE7-KPWwTUmOHM4sQ3hIKW_uPlGMHCVJqai8QIxDwmpqWCW1TjOg7yuPB4pimT_qQoBbQtdY7CgAzZh2Dj2c7jvuiX5VEJLAnwdtcZDoHwHPuTtGoyZa7ehJlj4D2mjKQDaV0GqoMItCzJJL0hf5c3JMTn5WXg847yc8b3ey4hT5UsWGrucXwn3OgNwdTnh_nCDtTmQl0ZZo"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-[#161324] text-xl sm:text-2xl tracking-tight leading-none">
                  PayKool
                </span>
                <span className="text-[10px] text-[#6b6678] font-semibold tracking-tight mt-0.5">
                  K Cash 旗下品牌 | 2483.HK
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-semibold text-[#494551]">
            
            {/* 1. 信用卡推薦 with Mega Menu */}
            <div
              className="relative py-6"
              ref={megaMenuRef}
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`py-2 whitespace-nowrap inline-flex items-center gap-1 cursor-pointer transition-colors ${
                  currentPage === 'visa-platinum' || currentPage === 'prop-card' || currentPage === 'compare'
                    ? 'text-[#5B459B] font-bold border-b-2 border-[#E83375]'
                    : 'text-[#494551] hover:text-[#5B459B]'
                }`}
              >
                <span>信用卡推薦</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute top-full -left-20 w-[960px] bg-white rounded-2xl shadow-2xl border border-[#ece4ff] p-8 z-50 transition-all duration-200 animate-fadeIn">
                  <div className="grid grid-cols-4 gap-8">
                    {/* Col 1: Promo Spotlight Card */}
                    <div className="flex flex-col justify-between bg-gradient-to-br from-[#1F1841] via-[#5B459B] to-[#2B225A] rounded-xl p-5 text-white relative overflow-hidden">
                      <div className="relative z-10">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E83375] text-white text-[10px] font-bold tracking-wide uppercase mb-3">
                          探索更多 Discover
                        </span>
                        <h4 className="text-base font-extrabold text-white mb-1.5 leading-snug">
                          PayKool Visa Platinum 卡
                        </h4>
                        <p className="text-xs text-[#F8D9C0] leading-relaxed mb-4">
                          全新持卡人尊享大獎賞！最快 3 分鐘審批，即開即用 Apple Pay。
                        </p>
                        
                        <div className="relative w-full aspect-[1.586/1] rounded-lg bg-gradient-to-tr from-[#1B0B3B] via-[#351B62] to-[#E83375] p-3 text-white border border-white/20 shadow-md mb-2">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold">PayKool</span>
                            <span className="material-symbols-outlined text-[14px]">contactless</span>
                          </div>
                          <div className="flex items-end justify-between">
                            <span className="font-mono-num text-[9px]">•••• 8823</span>
                            <span className="text-xs italic font-black">VISA</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNav('visa-platinum')}
                        className="relative z-10 inline-flex items-center justify-center gap-1.5 bg-[#E83375] hover:bg-[#F02D7D] text-white text-xs font-bold py-2 px-3 rounded-lg shadow-sm transition-all text-center cursor-pointer"
                      >
                        <span>查看 Platinum 卡</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>

                    {/* Col 2: Credit Cards Series */}
                    <div className="flex flex-col gap-4 border-r border-[#ece4ff] pr-6">
                      <div className="border-b border-[#ece4ff] pb-2">
                        <h4 className="text-xs font-bold text-[#6b6678] tracking-wider uppercase">
                          信用卡系列 Credit Cards
                        </h4>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => handleNav('visa-platinum')}
                          className="p-2.5 rounded-xl hover:bg-[#f2ebff] transition-colors text-left block group/card cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-sm text-[#161324] group-hover/card:text-[#5B459B] transition-colors">
                              PayKool Visa Platinum 卡
                            </span>
                          </div>
                          <p className="text-xs text-[#5f5792] leading-snug">
                            3/4/5 個月自主分期 · 長達 46 日免息期
                          </p>
                        </button>

                        <button
                          onClick={() => handleNav('prop-card')}
                          className="p-2.5 rounded-xl hover:bg-[#f2ebff] transition-colors text-left block group/card cursor-pointer"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-sm text-[#161324] group-hover/card:text-[#5B459B] transition-colors">
                              PayKool Prop Card (業主專屬卡)
                            </span>
                          </div>
                          <p className="text-xs text-[#5f5792] leading-snug">
                            高達 HK$1,000,000 額度 · 裝修物業首選
                          </p>
                        </button>
                      </div>

                      <div className="mt-auto pt-3 border-t border-[#ece4ff]">
                        <button
                          onClick={() => handleNav('compare')}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#5B459B] hover:text-[#E83375] transition-colors cursor-pointer"
                        >
                          <span>比較所有 PayKool 信用卡</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    </div>

                    {/* Col 3: Features & Instalments */}
                    <div className="flex flex-col gap-4 border-r border-[#ece4ff] pr-6">
                      <div className="border-b border-[#ece4ff] pb-2">
                        <h4 className="text-xs font-bold text-[#6b6678] tracking-wider uppercase">
                          分期與套現功能 Features
                        </h4>
                      </div>
                      <div className="flex flex-col gap-2.5 text-xs">
                        <button
                          onClick={() => handleNav('cash-advance')}
                          className="p-2 rounded-lg hover:bg-[#f2ebff] flex items-center justify-between group/link text-left cursor-pointer"
                        >
                          <span className="font-semibold text-[#161324] group-hover/link:text-[#5B459B] transition-colors">
                            「Fun K 易」現金分期套現
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-white leading-none">
                            FPS 即日
                          </span>
                        </button>

                        <button
                          onClick={() => handleNav('home', '#calculator-section')}
                          className="p-2 rounded-lg hover:bg-[#f2ebff] flex items-center justify-between text-[#161324] hover:text-[#5B459B] font-medium transition-colors text-left cursor-pointer"
                        >
                          <span>3 / 4 / 5 個月簽賬自主分期</span>
                          <span className="material-symbols-outlined text-[14px] text-[#6b6678]">chevron_right</span>
                        </button>

                        <button
                          onClick={() => handleNav('visa-platinum', '#small-calc')}
                          className="p-2 rounded-lg hover:bg-[#f2ebff] flex items-center justify-between text-[#161324] hover:text-[#5B459B] font-medium transition-colors text-left cursor-pointer"
                        >
                          <span>小額自選免息分期試算</span>
                          <span className="material-symbols-outlined text-[14px] text-[#6b6678]">chevron_right</span>
                        </button>

                        <button
                          onClick={() => handleNav('prop-card')}
                          className="p-2 rounded-lg hover:bg-[#f2ebff] flex items-center justify-between text-[#161324] hover:text-[#5B459B] font-medium transition-colors text-left cursor-pointer"
                        >
                          <span>物業業主專屬 60 個月分期</span>
                          <span className="material-symbols-outlined text-[14px] text-[#6b6678]">chevron_right</span>
                        </button>

                        <button
                          onClick={() => handleNav('tu-report')}
                          className="p-2 rounded-lg hover:bg-[#f2ebff] flex items-center justify-between text-[#161324] hover:text-[#5B459B] font-medium transition-colors text-left cursor-pointer"
                        >
                          <span>免費 TU 環聯信貸評估 (Soft Check)</span>
                          <span className="material-symbols-outlined text-[14px] text-[#6b6678]">chevron_right</span>
                        </button>
                      </div>
                    </div>

                    {/* Col 4: Promotions & Perks */}
                    <div className="flex flex-col gap-4">
                      <div className="border-b border-[#ece4ff] pb-2">
                        <h4 className="text-xs font-bold text-[#6b6678] tracking-wider uppercase">
                          推廣與持卡人服務
                        </h4>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-bold text-[#5B459B] uppercase tracking-wide">
                            最新推廣優惠
                          </span>
                          <button
                            onClick={() => handleNav('promotions')}
                            className="text-xs text-[#161324] hover:text-[#E83375] transition-colors font-medium flex items-center gap-1 text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px] text-[#E83375]">redeem</span>
                            全港商戶獨家迎新簽賬賞
                          </button>
                          <button
                            onClick={() => handleNav('home', '#services-grid')}
                            className="text-xs text-[#161324] hover:text-[#E83375] transition-colors font-medium flex items-center gap-1 text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px] text-[#E83375]">loyalty</span>
                            PayKool Point 積分獎賞
                          </button>
                        </div>

                        <div className="border-t border-[#ece4ff] pt-3 flex flex-col gap-1.5">
                          <span className="text-[11px] font-bold text-[#5f5792] uppercase tracking-wide">
                            持卡人自助理財
                          </span>
                          <button
                            onClick={() => handleNav('home', '#journey-steps')}
                            className="text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">contactless</span>
                            綁定 Apple Pay / Google 錢包
                          </button>
                          <button
                            onClick={() => handleNav('home', '#faq-section')}
                            className="text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors flex items-center gap-1.5 text-left cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">description</span>
                            產品資料概要及收費表
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 分期試算器 */}
            <button
              onClick={() => handleNav('home', '#calculator-section')}
              className="hover:text-[#5B459B] transition-colors py-2 whitespace-nowrap cursor-pointer"
            >
              分期試算器
            </button>

            {/* 最新迎新優惠 */}
            <button
              onClick={() => handleNav('promotions')}
              className={`hover:text-[#5B459B] transition-colors py-2 whitespace-nowrap cursor-pointer ${
                currentPage === 'promotions' ? 'text-[#5B459B] font-bold border-b-2 border-[#E83375]' : ''
              }`}
            >
              最新迎新優惠
            </button>

            {/* 智能信貸評估 */}
            <button
              onClick={() => handleNav('tu-report')}
              className={`hover:text-[#5B459B] transition-colors py-2 whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                currentPage === 'tu-report' ? 'text-[#5B459B] font-bold border-b-2 border-[#E83375]' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-emerald-600">assessment</span>
              <span>智能信貸評估</span>
            </button>

            {/* 比較信用卡 */}
            <button
              onClick={() => handleNav('compare')}
              className={`hover:text-[#5B459B] transition-colors py-2 whitespace-nowrap cursor-pointer ${
                currentPage === 'compare' ? 'text-[#5B459B] font-bold border-b-2 border-[#E83375]' : ''
              }`}
            >
              比較信用卡
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Outline Cash Advance Button */}
            <button
              onClick={() => handleNav('cash-advance')}
              className={`hidden sm:inline-flex items-center justify-center border font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all hover:scale-[1.02] gap-1.5 whitespace-nowrap cursor-pointer ${
                currentPage === 'cash-advance'
                  ? 'bg-[#5B459B] text-white border-[#5B459B] shadow-sm'
                  : 'border-[#5B459B] text-[#5B459B] hover:bg-[#5B459B]/10'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">payments</span>
              <span>現金分期套現</span>
            </button>

            {/* Primary Apply Card Button (Pink to Purple Gradient Pill) */}
            <button
              onClick={() => onOpenApplyModal()}
              className="inline-flex items-center justify-center bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-90 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-md shadow-[#E83375]/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>立即辦卡</span>
            </button>

            {/* Quick Calculator Shortcut */}
            <button
              onClick={() => handleNav('home', '#calculator-section')}
              className="w-9 h-9 rounded-xl bg-[#f2ebff] hover:bg-[#ece4ff] flex items-center justify-center text-[#5B459B] transition-colors cursor-pointer"
              title="快速分期試算"
              aria-label="快速分期試算"
            >
              <span className="material-symbols-outlined text-[20px]">calculate</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-xl bg-[#f2ebff] flex items-center justify-center text-[#161324] cursor-pointer"
              aria-label="打開導航選單"
            >
              <span className="material-symbols-outlined text-[22px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#ece4ff] bg-white px-4 py-5 shadow-xl animate-fadeIn">
            <div className="flex flex-col gap-3 font-semibold text-sm">
              <div className="pb-2 border-b border-[#ece4ff]">
                <span className="text-xs uppercase text-[#6b6678] font-bold tracking-wider">
                  信用卡系列
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => handleNav('visa-platinum')}
                    className="p-2.5 rounded-xl bg-[#f7f1ff] text-left text-xs font-bold text-[#161324]"
                  >
                    💳 Visa Platinum 卡
                  </button>
                  <button
                    onClick={() => handleNav('prop-card')}
                    className="p-2.5 rounded-xl bg-[#1f1841] text-left text-xs font-bold text-[#fce3cb]"
                  >
                    👑 Prop Card (業主卡)
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleNav('compare')}
                className="py-2 px-3 text-left hover:bg-[#f2ebff] rounded-lg text-[#161324] flex items-center justify-between"
              >
                <span>比較所有 PayKool 信用卡</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>

              <button
                onClick={() => handleNav('cash-advance')}
                className="py-2 px-3 text-left hover:bg-[#f2ebff] rounded-lg text-[#5B459B] font-bold flex items-center justify-between bg-emerald-50"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  現金分期套現 (FPS 即日到賬)
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>

              <button
                onClick={() => handleNav('promotions')}
                className="py-2 px-3 text-left hover:bg-[#f2ebff] rounded-lg text-[#161324] flex items-center justify-between"
              >
                <span>最新迎新優惠與商戶推廣</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>

              <button
                onClick={() => handleNav('tu-report')}
                className="py-2 px-3 text-left hover:bg-[#f2ebff] rounded-lg text-[#161324] flex items-center justify-between"
              >
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-emerald-600">assessment</span>
                  智能信貸評估報告 (免費 Check TU)
                </span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>

              <button
                onClick={() => handleNav('home', '#calculator-section')}
                className="py-2 px-3 text-left hover:bg-[#f2ebff] rounded-lg text-[#161324]"
              >
                分期試算器
              </button>

              <div className="pt-2 border-t border-[#ece4ff]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenApplyModal();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E83375] to-[#5B459B] text-white font-bold text-center shadow-md"
                >
                  立即申請信用卡
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
