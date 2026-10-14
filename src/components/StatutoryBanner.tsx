import React from 'react';

export const StatutoryBanner: React.FC = () => {
  return (
    <aside className="w-full bg-[#FFF8E6] px-6 py-3.5 border-y border-[#FFE299] text-center" data-purpose="statutory-money-lender-warning">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#7A4500] text-[20px] shrink-0">gavel</span>
          <p className="text-xs sm:text-sm text-[#7A4500] tracking-wide font-bold">
            忠告：借錢梗要還，咪俾錢中介
          </p>
        </div>
        <span className="hidden sm:inline text-[#7A4500]/40">|</span>
        <div className="text-xs sm:text-sm text-[#7A4500] font-semibold">
          <span>投訴熱線：3185 8847</span>
          <span className="ml-3 font-normal opacity-90 text-[11px] sm:text-xs">放債人牌照號碼：1439/2025</span>
        </div>
      </div>
    </aside>
  );
};
