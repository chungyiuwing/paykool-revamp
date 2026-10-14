import React, { useState } from 'react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCard?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  defaultCard = 'platinum',
}) => {
  const [selectedCard, setSelectedCard] = useState<'platinum' | 'prop'>(
    defaultCard === 'prop' ? 'prop' : 'platinum'
  );
  const [promoCode, setPromoCode] = useState('TK');
  const [hkid, setHkid] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#ece4ff] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {!isSuccess ? (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E83375] text-white">
                3分鐘極速批核
              </span>
              <span className="text-xs text-slate-500 font-semibold">全線上智能申請</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#161324] mb-2">
              申請 PayKool 信用卡
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              填妥基本資料即可極速審批，批核後即時點亮虛擬卡並綁定 Apple Pay！
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card Choice */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  選擇申請卡種
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCard('platinum');
                      setPromoCode('TK');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedCard === 'platinum'
                        ? 'border-[#5B459B] bg-[#f2ebff]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-[#161324]">Visa Platinum 卡</span>
                      <span className="material-symbols-outlined text-[16px] text-[#5B459B]">credit_card</span>
                    </div>
                    <p className="text-[11px] text-[#5f5792]">3/4/5期自主分期・大專生免入息</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCard('prop');
                      setPromoCode('PROPELITE');
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      selectedCard === 'prop'
                        ? 'border-[#D4AF37] bg-[#1a1e29] text-white'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-bold ${selectedCard === 'prop' ? 'text-[#fce3cb]' : 'text-[#161324]'}`}>
                        Prop Card (業主卡)
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-amber-400">home</span>
                    </div>
                    <p className={`text-[11px] ${selectedCard === 'prop' ? 'text-slate-300' : 'text-[#5f5792]'}`}>
                      高達百萬額度・差餉單極簡批核
                    </p>
                  </button>
                </div>
              </div>

              {/* HKID */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="modal-hkid">
                  香港身份證號碼 (HKID)
                </label>
                <input
                  id="modal-hkid"
                  type="text"
                  required
                  placeholder="例如: A123456(7)"
                  value={hkid}
                  onChange={(e) => setHkid(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm uppercase font-mono-num focus:bg-white focus:border-[#5B459B] focus:outline-none"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="modal-mobile">
                  香港流動電話號碼
                </label>
                <div className="flex gap-2">
                  <span className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold font-mono-num text-slate-700 flex items-center">
                    +852
                  </span>
                  <input
                    id="modal-mobile"
                    type="tel"
                    required
                    maxLength={8}
                    placeholder="9123 4567"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono-num focus:bg-white focus:border-[#5B459B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="modal-email">
                  電郵地址
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:bg-white focus:border-[#5B459B] focus:outline-none"
                />
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1" htmlFor="modal-promo">
                  迎新專屬邀請碼 (Promotion Code)
                </label>
                <div className="flex gap-2">
                  <input
                    id="modal-promo"
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-mono-num font-bold text-[#5B459B] uppercase focus:bg-white focus:border-[#5B459B] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setPromoCode('TK')}
                    className="px-3 py-2 text-xs font-bold bg-[#f2ebff] text-[#5B459B] rounded-xl hover:bg-[#ece4ff] transition-colors"
                  >
                    重設為 TK
                  </button>
                </div>
                <p className="text-[11px] text-emerald-600 font-medium mt-1">
                  ✓ 輸入邀請碼 TK 享 4 揀 1 迎新：送 20 吋行李篋或 HK$500 簽賬額！
                </p>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-95 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>AI 智能審批中...</span>
                  </>
                ) : (
                  <>
                    <span>提交申請・即時批核</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-slate-400">
                本申請受條款及細則約束。提交即表示同意 PayKool 個人資料收集聲明及進行信貸資料庫核實。
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-3xl font-black">
              ✓
            </div>
            <h3 className="text-2xl font-black text-[#161324] mb-2">
              申請初步獲批・虛擬卡已啟動！
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-6 leading-relaxed">
              恭喜您！您的 <strong className="text-[#5B459B]">{selectedCard === 'prop' ? 'PayKool Prop Card' : 'PayKool Visa Platinum 卡'}</strong> 已成功批出。我們已發送確認 SMS 及電郵至您的登記聯絡方式。
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-mono-num text-left space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-500">申請參考編號:</span>
                <span className="font-bold text-[#5B459B]">PK-APP-882910</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">核准信用額度:</span>
                <span className="font-bold text-emerald-600">
                  {selectedCard === 'prop' ? 'HK$ 300,000' : 'HK$ 50,000'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">已套用迎新禮遇:</span>
                <span className="font-bold text-[#E83375]">代碼: {promoCode || 'TK'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-3 rounded-xl bg-[#5B459B] hover:bg-[#2B225A] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              完成並返回
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
