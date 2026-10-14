import React, { useState } from 'react';

export const WhatsAppButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end">
      {/* Quick Interactive Chatbox Popup */}
      {showPopup && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn text-[#161324]">
          <div className="bg-[#25D366] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                PK
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">PayKool 客戶服務經理</h4>
                <p className="text-[11px] text-white/90 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  即時在線 專人為你服務
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPopup(false)}
              className="text-white hover:text-slate-200 cursor-pointer"
              aria-label="關閉"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
          <div className="p-4 bg-slate-50 text-xs space-y-2">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs text-slate-700 leading-relaxed border border-slate-100">
              您好！歡迎查詢 PayKool 信用卡迎新禮遇、大額現金套現或業主 Prop Card 申請。請問有甚麼可以幫到你？
            </div>
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2">
            <a
              href="https://wa.me/85268281222?text=您好，我想查詢PayKool信用卡迎新及分期套現優惠"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span>在 WhatsApp 開啟對話</span>
              <span className="material-symbols-outlined text-[16px]">chat</span>
            </a>
            <p className="text-[10px] text-center text-slate-400">
              服務熱線: +852 6828 1222 (星期一至五 09:00 - 18:00)
            </p>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowPopup(!showPopup)}
          aria-label="WhatsApp 客服查詢"
          className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-3 sm:px-4 sm:py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400 border-2 border-white"></span>
          </span>
          <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
          </svg>
          <span className="font-bold text-xs sm:text-sm tracking-wide hidden sm:inline-block">
            WhatsApp 查詢
          </span>
        </button>
      </div>
    </div>
  );
};
