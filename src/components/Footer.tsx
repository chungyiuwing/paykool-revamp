import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType, hash?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-white shadow-[0_-1px_6px_rgba(91,69,155,0.06)] border-t border-[#ece4ff]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          
          {/* Brand info */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="PayKool Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgTBrjjQ3TFaITIUFr1Hy4II4yExl4OKEpU4nxkYzrthfHXNifRgU6j_eq-hk92rxqw9wdRTmCw6Rc6FvZB7JrE6LCNlM72bhL09IuB1T0E2j8gR9sosethJKVnwGRtQwj2tSuudq1m5gBG_XbO9Sd4dCEI4ykljWaljOlYF01i6e-9oWcMHL70syF-vr56nNMBTne5yDMWGH8AUghFL6Wqrz-HH0jXv1POHfV2-ddSzpeX18taHqdgtqVE0YfiO_IXXk"
              />
              <span className="font-extrabold text-base text-[#161324]">PayKool Credit Card</span>
            </div>
            <p className="text-xs sm:text-sm text-[#6b6678] max-w-lg leading-relaxed">
              PayKool 為香港主板上市公司 K Cash Limited（港股代號：2483.HK）旗下嶄新科技金融旗艦品牌。結合持牌銀行級加密基建與自主信貸大數據模型，專為年輕菁英與業主尊尚客群提供彈性、全天候自主流動信貸與卡務體驗。
            </p>
            <div className="text-xs text-[#6b6678] font-mono-num">
              放債人牌照號碼 / Money Lender's Licence No.: 1439/2025
            </div>
          </div>

          {/* Products & Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#161324]">產品與專利服務</h4>
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => onNavigate('visa-platinum')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                PayKool Visa 白金卡
              </button>
              <button
                onClick={() => onNavigate('prop-card')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                PayKool Prop Card (業主專屬卡)
              </button>
              <button
                onClick={() => onNavigate('compare')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                信用卡規格完整對比表
              </button>
              <button
                onClick={() => onNavigate('cash-advance')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                「Fun K 易」現金分期套現
              </button>
              <button
                onClick={() => onNavigate('tu-report')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                即時智能信貸評估 (免費 Check TU)
              </button>
              <button
                onClick={() => onNavigate('promotions')}
                className="text-left text-xs text-[#6b6678] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                商戶迎新及簽賬獎賞
              </button>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-sm text-[#161324]">客戶服務熱線</h4>
            <div className="flex flex-col gap-2 text-xs text-[#6b6678]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#5B459B]">call</span>
                <span>電話：+852 2311 1611</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#E83375]">chat</span>
                <span>WhatsApp：+852 6828 1222</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#00AAEE]">mail</span>
                <span>電郵：cs@paykool.hk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#5f5792]">schedule</span>
                <span>服務時間：星期一至五 09:00 - 18:00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Corporate Address & Disclaimers */}
        <div className="pt-8 flex flex-col gap-4 text-center md:text-left border-t border-[#ece4ff]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-[#6b6678]">
            <p>
              總辦事處：香港中環畢打街20號會德豐大廈17樓 | 旗艦店：九龍港鐵尖東站ETS30號舖
            </p>
            <div className="flex items-center justify-center gap-4 text-[#6b6678]">
              <span className="hover:text-[#5B459B] transition-colors cursor-pointer">私隱政策條款</span>
              <span className="hover:text-[#5B459B] transition-colors cursor-pointer">放債人條例持牌須知</span>
              <span className="hover:text-[#5B459B] transition-colors cursor-pointer">持卡人合約細則</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs text-[#6b6678] pt-2">
            <p>PayKool 為 K Cash Limited 旗下品牌 | 放債人牌照號碼：1439/2025</p>
            <p className="font-mono-num text-[#6b6678]">© 2026 K Cash Limited (2483.HK). All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
