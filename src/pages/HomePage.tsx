import React, { useState } from 'react';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenApplyModal }) => {
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Repayment Calculator State
  const [spendAmount, setSpendAmount] = useState<number>(5000);
  const [selectedTenor, setSelectedTenor] = useState<3 | 4 | 5>(3);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const promoSlides = [
    {
      id: 0,
      title: 'Apple Duo 出機攻略',
      tag: 'Apple Duo 特約熱推',
      code: 'DUO',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqp-1fQCL2qkk8G2zTahdAznjRYVFP9zMD2Bx_eITzbOk6YHFWNLP0zzagfL302tHFAot-XobTfMBRFH-Ay2LhFGHFvop06pHYxU_IjUTK8SsBCv202E5uBd4hpHh-KaRDincNBMqA_5xvd7nEX89QuQ99ONyklinU-Vac5kgXQzzzcTuhOpmlYuy9UmhjffKJnXbHKo4elH1X-LUvpaJoaBNJLby72TswvZ7EaPjO2Yz1JtqjIvdyNutl311PYKkjYQ',
      headline: '合資格全新客戶憑 PayKool 卡簽賬滿 $2,000 送你 $500 免找數簽賬額！',
      subtitle: '最快 3 分鐘核卡，即批即買 Apple 旗艦新機。',
    },
    {
      id: 1,
      title: 'HKTVmall 迎新送 $500',
      tag: 'HKTVmall 減價戰',
      code: 'PPTVMALL',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd7veoMHooLh4NxziWv2P_l41xQqG-kC__fwYl0PQGDJ_MA5-_L0WPRx32YbsKPVtSPka_f50tT3zbq8yZeXc-Yh7gtMTKcDvNZI46TgR13h2JHchzh1zMWFYOkaEScGLqU9EygwpLn_hJX04t9CZW7jEC3mLNB5PFdq3AIddFf6ohSXr_BlhzoqsgdCuPzYa2UUT-xyyPGoZzqKPwXP70RZWsmMd0B9ZZQlVRpUebTinpnRYrJs77dd1dCXEic0xiwg',
      headline: '雙重著數慳到盡！新客戶迎新送 HK$500 HKTVmall 電子購物禮券',
      subtitle: '配合激減優惠狂買狂折，最快 3 分鐘出卡秒享網購優惠。',
    },
    {
      id: 2,
      title: 'GIORMANI 茲曼尼 $400',
      tag: 'GIORMANI 茲曼尼特約',
      code: 'MBGIORMANI',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3MRJqWOdciiEc9XEhcFkg8Tu4c0-CztKP9tyQA4Z5_vICKAnDoYOSaU8_dU5PMscLEZgJ3ckrG-oPJPmKwTVBVxTOU7C8GoGCPt9inT3QULIBX52GUXOwt4wVP-zyemTDxTYFCxY78J_L3d0k3WOsLl7BNM9nJmZXIqDWda0UWym3GvL92LT4exBc8zLcpHjkWvyfKKOL23xuqwVjuWG3prNMVF2HceHw2fG2DET1OpZ7RUqCfsdWxXOu5yHRajfYIQ',
      headline: '於 GIORMANI 茲曼尼購物用 PayKool 卡單一簽賬滿 $3,000* 可獲 $400 免找數簽賬額！',
      subtitle: '換購心儀優質真皮梳化，升級居家極致享受。',
    },
    {
      id: 3,
      title: '2XCHANGE 換匯賺 $500',
      tag: '2XCHANGE 旅遊特惠',
      code: 'PP2XC',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVXiGwzqSPtxAgdpJpT-0xnnwcQ8jmvJ2uuvQQZauA5ASrVcmup6BsWZPm2UQCqKcu-Om0UagaGLUulIIkZZ4ZBGWsRTt_tmECBMsBIwyg7Vnua7ayvLer-6jzAghSZ7jp8CiXOtm4WdKxWYALjrb_qmg-XUoSKTWmvGq4K5iE-QCaPJRf2OV8EKCsJ_rL4IpobZkZntjswHbLy_5YIQnuTcxjM8LoUe4LFnrrUbaBPQGlfKOCpT9kPrVYsQ3WPvT-IA',
      headline: '換外幣旅遊再賺獎賞！於門店兌換滿額享高達 HK$500 外幣現金獎賞',
      subtitle: 'PayKool 持卡人專享：港幣兌換日圓、韓元或台幣，免外幣兌換手續費！',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Calculation rates
  const feeRates: Record<3 | 4 | 5, number> = {
    3: 0.018,
    4: 0.024,
    5: 0.03,
  };

  // First HK$5,000 fee-free calculation rule
  const feeableAmount = Math.max(0, spendAmount - 5000);
  const totalHandlingFee = Math.round(feeableAmount * feeRates[selectedTenor]);
  const estimatedMonthly = Math.round((spendAmount + totalHandlingFee) / selectedTenor);
  const standardFeeWithoutDiscount = Math.round(spendAmount * feeRates[selectedTenor]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* 1. Campaign Banner with Dedicated Copyable Promo Code Carousel */}
      <section className="w-full bg-[#fdf8ff] pt-6 pb-4" id="welcome-campaign">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-3xl shadow-xl border border-[#ece4ff] bg-white">
            
            {/* Carousel Container */}
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] overflow-hidden group">
              {promoSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
                  }`}
                >
                  <img
                    alt={slide.title}
                    className="w-full h-full object-cover object-center block"
                    src={slide.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161324]/85 via-transparent to-black/20 pointer-events-none"></div>
                  
                  {/* Floating Promo Info Box */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-[#E83375]/30 max-w-xl">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-[#E83375] text-white rounded-md text-xs font-bold tracking-wide">
                        {slide.tag}
                      </span>
                      <div className="flex items-center gap-2 bg-[#f2ebff] px-3 py-1.5 rounded-lg border border-[#cac4d2]/40">
                        <span className="text-xs text-[#5f5792] font-medium">專屬邀請碼：</span>
                        <span className="font-mono-num font-bold text-[#5B459B] text-sm tracking-wider">
                          {slide.code}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(slide.code)}
                          className="text-xs text-[#E83375] hover:text-[#5B459B] font-bold flex items-center gap-0.5 ml-1 transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            {copiedCode === slide.code ? 'check' : 'content_copy'}
                          </span>
                          <span>{copiedCode === slide.code ? '已複製' : '複製'}</span>
                        </button>
                      </div>
                    </div>
                    <p className="text-[#161324] font-bold text-sm sm:text-base leading-snug">
                      {slide.headline}
                    </p>
                    <p className="text-[#6b6678] text-xs mt-1">{slide.subtitle}</p>
                  </div>
                </div>
              ))}

              {/* Prev / Next Arrows */}
              <button
                type="button"
                aria-label="上一張"
                onClick={() => setCurrentSlide((currentSlide - 1 + promoSlides.length) % promoSlides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#161324]/50 hover:bg-[#161324]/80 text-white flex items-center justify-center backdrop-blur-sm z-20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                aria-label="下一張"
                onClick={() => setCurrentSlide((currentSlide + 1) % promoSlides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#161324]/50 hover:bg-[#161324]/80 text-white flex items-center justify-center backdrop-blur-sm z-20 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 right-6 z-20 hidden sm:flex items-center gap-1.5 bg-[#161324]/40 backdrop-blur-md px-3 py-1.5 rounded-full">
                {promoSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentSlide ? 'bg-[#E83375] w-4' : 'bg-white/60'
                    }`}
                    aria-label={`跳轉至第 ${i + 1} 張`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#ece4ff] bg-[#F7F4FD] border-t border-[#ece4ff]">
              {promoSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`p-4 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                    currentSlide === index
                      ? 'bg-[#f2ebff] border-b-2 md:border-b-0 border-[#E83375]'
                      : 'hover:bg-[#f2ebff]'
                  }`}
                >
                  <span className="w-9 h-9 rounded-lg bg-[#5B459B]/10 text-[#5B459B] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">
                      {index === 0 ? 'phone_iphone' : index === 1 ? 'shopping_bag' : index === 2 ? 'chair' : 'currency_exchange'}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] text-[#5f5792] truncate">邀請碼: {slide.code}</p>
                    <p className="text-xs sm:text-sm font-bold text-[#161324] truncate">
                      {slide.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Interactive Hero with Card Showcase & Integrated Repayment Simulator */}
      <section
        className="relative w-full bg-gradient-to-b from-[#fdf8ff] via-[#f7f1ff] to-[#fdf8ff] py-12 lg:py-16 overflow-hidden"
        id="calculator-section"
      >
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#E83375]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-[#5B459B]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Brand Message & Key Benefits */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B459B]/10 text-[#5B459B] mb-5 shadow-xs border border-[#5B459B]/20">
                <span className="w-2 h-2 rounded-full bg-[#E83375] animate-ping"></span>
                <span className="text-xs tracking-wider font-bold">尚未持有 PayKool 卡？ 3 分鐘網上出卡</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161324] tracking-tight leading-tight mb-5">
                消費自由，自主分期。<br />
                <span className="bg-gradient-to-r from-[#E83375] via-[#5B459B] to-[#00AAEE] bg-clip-text text-transparent">
                  零循環息陷阱，掌控生活節奏
                </span>
              </h1>

              <p className="text-[#5f5792] text-sm sm:text-base leading-relaxed mb-6">
                靈活自主分期，輕鬆掌控消費節奏。簽賬滿 $100 想點分就點分（3/4/5 個月）。一次性透明手續費，告別傳統銀行卡滾雪球複利。尊享港股上市公司 K Cash（2483.HK）持牌金融科技實力支援。
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-3 gap-3 w-full mb-8">
                <div className="bg-white p-3.5 rounded-xl border border-[#ece4ff] shadow-xs text-center">
                  <span className="text-xs text-[#6b6678] block font-medium">審批速度</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#5B459B]">最快 3 分鐘</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#ece4ff] shadow-xs text-center">
                  <span className="text-xs text-[#6b6678] block font-medium">免息周轉期</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#E83375]">長達 46 日</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-[#ece4ff] shadow-xs text-center">
                  <span className="text-xs text-[#6b6678] block font-medium">信用發卡</span>
                  <span className="text-base sm:text-lg font-extrabold text-[#00B6ED]">秒入 Apple Pay</span>
                </div>
              </div>

              {/* Soft Inquiry App Banner */}
              <div className="flex items-center gap-4 p-3 bg-white/80 rounded-2xl border border-[#cac4d2]/40 shadow-xs w-full">
                <img
                  alt="PayKool App Preview"
                  className="w-16 h-16 object-contain rounded-xl shrink-0 bg-[#f2ebff] p-1"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1WosSDjPBllwb-EMmxrHgiYfyYL9AxdDl3lAdYZDLKuKtN8D1nCd8d_hPDHqyRVGPrHA5YhdqyX9syWF7yMss7tywJwEjdh0quay87cVA3AQTLC6xCODuXT5h2pr0tXfNxvGMB5N6dqOzRgIp6UvcfAzwtS3xreMOEbpnJh0niq79mepvoh-875crkT_SjomL0Tt549c8URnP-95OQgKcgLjZXD3a5mtEDa6NSVXJ1E37PShdkmgJriURGwVqsNMq9Gb3rcukRDBw"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-xs text-[#5B459B] font-bold">
                    <span className="material-symbols-outlined text-[15px]">verified_user</span>
                    <span>軟性查詢 Soft Inquiry</span>
                  </div>
                  <p className="text-xs text-[#161324] font-semibold truncate">App 內查閱 TU 信貸評分不留痕跡</p>
                  <p className="text-[11px] text-[#6b6678] truncate">
                    學生免入息證明 | 業主尊享最高 $1,000,000 信用額
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Repayment Simulator Card */}
            <div className="lg:col-span-6 w-full">
              {/* Limited time 0 fee banner */}
              <div className="mb-5 p-4 sm:p-5 bg-gradient-to-r from-[#1F1841] via-[#5B459B] to-[#E83375] border-2 border-[#E83375]/40 rounded-3xl flex items-center gap-4 shadow-xl shadow-[#E83375]/20 relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#E83375]/30 rounded-full blur-2xl pointer-events-none"></div>
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#E83375] to-[#FCE3CB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#E83375]/30 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[26px] sm:text-[30px] text-white animate-pulse">
                    celebration
                  </span>
                </div>
                <div className="flex-1 min-w-0 z-10">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 bg-[#E83375] text-white rounded-full shadow-xs animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      限時震撼特惠
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-[#FCE3CB] text-[#161324] rounded-md">
                      0 成本體驗
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                    <span className="text-[#FCE3CB] underline decoration-[#E83375] underline-offset-2">
                      首 HK$5,000
                    </span>{' '}
                    自主分期手續費全免！
                  </h4>
                  <p className="text-xs text-white/90 mt-1 flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[15px] text-green-300">check_circle</span>
                    所有新舊客戶無門檻即享 0 利息・0 成本自主分期
                  </p>
                </div>
                <div className="hidden sm:flex shrink-0 z-10">
                  <span className="px-3 py-1.5 rounded-xl bg-white/20 text-[#FCE3CB] text-xs font-bold border border-white/20 backdrop-blur-sm shadow-xs">
                    即時試算 ⚡
                  </span>
                </div>
              </div>

              {/* Calculator Box */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#5B459B]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#E83375]/15 to-transparent rounded-bl-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-[#5B459B]/10 text-[#5B459B]">
                      <span className="material-symbols-outlined text-[22px]">tune</span>
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#161324]">自主分期月費試算器</h3>
                      <p className="text-xs text-[#5f5792]">一次性透明手續費・無循環利息</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 bg-[#f2ebff] text-[#5B459B] rounded-full">
                    即時計算
                  </span>
                </div>

                {/* Amount Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-[#161324]" htmlFor="spendSlider">
                      簽賬消費金額
                    </label>
                    <div className="flex items-center font-mono-num text-xl font-black text-[#5B459B]">
                      <span className="text-sm mr-1">HK$</span>
                      <span>{spendAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <input
                    id="spendSlider"
                    type="range"
                    min={500}
                    max={50000}
                    step={500}
                    value={spendAmount}
                    onChange={(e) => setSpendAmount(parseInt(e.target.value, 10))}
                    className="w-full h-2.5 bg-[#f2ebff] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#6b6678] mt-1 font-mono-num">
                    <span>HK$500</span>
                    <span>HK$25,000</span>
                    <span>HK$50,000</span>
                  </div>
                </div>

                {/* Tenor Selection */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-[#161324] block mb-2">
                    自選還款期數
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { tenor: 3, label: '3 個月', note: '極速清還' },
                      { tenor: 4, label: '4 個月', note: '靈活周轉' },
                      { tenor: 5, label: '5 個月', note: '最輕月供' },
                    ].map((item) => (
                      <button
                        key={item.tenor}
                        type="button"
                        onClick={() => setSelectedTenor(item.tenor as 3 | 4 | 5)}
                        className={`py-2.5 px-3 rounded-xl font-bold text-sm text-center transition-all flex flex-col items-center cursor-pointer ${
                          selectedTenor === item.tenor
                            ? 'border-2 border-[#5B459B] bg-[#5B459B]/10 text-[#5B459B] shadow-xs'
                            : 'border border-[#cac4d2]/50 bg-white hover:bg-[#f2ebff] text-[#161324]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <span className="text-[10px] font-normal opacity-80">{item.note}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Output Card */}
                <div className="bg-gradient-to-br from-[#1F1841] to-[#5B459B] rounded-2xl p-5 text-white mb-6 shadow-inner">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E83375]/25 border border-[#E83375]/40 text-[#FCE3CB] text-[11px] font-bold mb-3">
                    <span className="material-symbols-outlined text-[14px] text-[#E83375]">auto_awesome</span>
                    <span>首 HK$5,000 分期 0 手續費・免息無負擔</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/15 pb-4 mb-4">
                    <div>
                      <span className="text-xs text-white/80 block">預估每月供款</span>
                      <span className="font-mono-num text-3xl font-extrabold tracking-tight">
                        HK$ {estimatedMonthly.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-white/80 block">一次性行政費 (總計)</span>
                      <div className="flex items-center justify-end gap-1.5">
                        {spendAmount > 5000 && (
                          <span className="text-xs text-white/60 line-through font-mono-num">
                            HK$ {standardFeeWithoutDiscount.toLocaleString()}
                          </span>
                        )}
                        <span className="font-mono-num text-base font-bold text-[#FCE3CB]">
                          {totalHandlingFee === 0 ? 'HK$ 0 (限時豁免)' : `HK$ ${totalHandlingFee.toLocaleString()}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/90">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-green-400">check_circle</span>
                      無隱藏複息收費・首筆免手續費
                    </span>
                    <span className="text-white/70">受條款及細則約束</span>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenApplyModal('platinum')}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-95 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm cursor-pointer"
                  >
                    <span>以試算額度出卡</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('promotions')}
                    className="inline-flex items-center justify-center gap-1.5 bg-[#f2ebff] hover:bg-[#ece4ff] text-[#161324] font-semibold py-3.5 px-5 rounded-xl border border-[#cac4d2]/40 text-sm transition-all cursor-pointer"
                  >
                    <span>領取迎新禮遇</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Card Selector Hub: Dual Core Cards (Visa Platinum vs Prop Card) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-14" id="card-showcase">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E83375]/10 text-[#E83375] text-xs font-bold mb-3">
            雙卡旗艦矩陣
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight mb-3">
            為不同人生階段量身打造的專屬信用卡
          </h2>
          <p className="text-[#5f5792] text-sm sm:text-base">
            不論是大專青年消費生活，還是物業業主裝修週轉，PayKool 皆提供超越傳統銀行的流動信貸方案。
          </p>
        </div>

        {/* Card 1: PayKool Visa Platinum */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 relative overflow-hidden transition-all duration-300 border border-[#ece4ff]">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#E83375] via-[#5B459B] to-[#00B6ED]"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E83375]/10 text-[#E83375] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  熱門主流・新世代消費・大專生首選
                </span>
                <span className="font-mono-num text-xs text-[#5B459B] font-bold">Visa Platinum</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#161324] mb-2">
                  PayKool Visa Platinum 卡
                </h3>
                <p className="text-[#6b6678] text-sm sm:text-base">
                  靈活自主分期 | 輕鬆掌控消費節奏 | 踢走長期負債
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#F7F4FD] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#5B459B]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#161324] tracking-tight mb-1">
                    3 / 4 / 5 個月
                  </p>
                  <p className="text-xs text-[#5f5792] leading-relaxed">
                    簽賬滿 $100 即可自選自主分期付款，一次性透明手續費
                  </p>
                </div>
                <div className="bg-[#F7F4FD] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#5B459B]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#161324] tracking-tight mb-1">
                    長達 46 日
                  </p>
                  <p className="text-xs text-[#5f5792] leading-relaxed">
                    免息還款期，隨心消費智慧付款，靈活安排資金週轉
                  </p>
                </div>
                <div className="bg-[#F7F4FD] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#5B459B]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#161324] tracking-tight mb-1">
                    最快 3 分鐘
                  </p>
                  <p className="text-xs text-[#5f5792] leading-relaxed">
                    智能極速審批，免等實體卡秒入 Apple Pay / Google Pay
                  </p>
                </div>
              </div>

              {/* Welcome offer */}
              <div className="bg-[#f2ebff] rounded-2xl p-4 flex items-start gap-3.5 border border-[#c6bcfe]/50">
                <span className="material-symbols-outlined text-[#E83375] text-[24px] shrink-0 mt-0.5">redeem</span>
                <div>
                  <p className="font-bold text-sm text-[#5B459B] mb-1">尊享迎新大獎賞（輸入代碼：TK）</p>
                  <p className="text-xs text-[#494551] leading-relaxed">
                    全新客戶尊享商戶迎新大獎賞（日本城迎新、Travel Kingdom 前開行李篋、星巴克現金券等多重禮遇任揀）！
                  </p>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-[#f7f1ff] rounded-2xl p-4 flex items-start gap-3.5 border border-[#cac4d2]/30">
                <span className="material-symbols-outlined text-[#5f5792] text-[24px] shrink-0 mt-0.5">school</span>
                <div>
                  <p className="font-bold text-sm text-[#161324] mb-0.5">申請資格</p>
                  <p className="text-xs text-[#5f5792] leading-relaxed">
                    年滿 18 歲之香港居民；全日制大學／大專學生憑有效學生證即可免入息證明申請；一般客戶備妥 3 個月住址證明及入息證明。
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('platinum')}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-90 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  立即申請 Visa Platinum
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('visa-platinum')}
                  className="inline-flex items-center justify-center bg-white hover:bg-[#F7F4FD] text-[#161324] font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs border border-[#cac4d2]/50 transition-all cursor-pointer"
                >
                  查看產品詳情
                </button>
              </div>
            </div>

            {/* Right: 3D Platinum Card */}
            <div className="lg:col-span-5 flex items-center justify-center p-4">
              <div
                onClick={() => onNavigate('visa-platinum')}
                className="relative w-full max-w-[380px] aspect-[1.586/1] rounded-2xl bg-gradient-to-tr from-[#1B0B3B] via-[#351B62] to-[#E83375] p-6 text-white shadow-[0_20px_45px_-12px_rgba(91,69,155,0.5)] border border-white/20 transform hover:rotate-1 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#E83375]/25 blur-3xl pointer-events-none"></div>
                <div className="flex items-center justify-between relative z-10 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl tracking-tight text-white font-extrabold">PayKool</span>
                    <span className="text-[10px] font-mono-num uppercase tracking-widest px-2 py-0.5 bg-white/20 text-white rounded font-bold backdrop-blur-sm">
                      Platinum
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[26px] text-white/80">contactless</span>
                </div>
                <div className="flex items-center gap-3 relative z-10 mb-10">
                  <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#FFE7A3] to-[#D4A536] relative flex items-center justify-center overflow-hidden shadow">
                    <div className="w-full h-[1px] bg-black/30 absolute"></div>
                    <div className="h-full w-[1px] bg-black/30 absolute"></div>
                    <div className="w-5 h-4 rounded-xs border border-black/40"></div>
                  </div>
                  <span className="material-symbols-outlined text-white/70 text-[20px]">sensors</span>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono-num text-[10px] text-white/70 tracking-widest uppercase">VALUED MEMBER</p>
                    <p className="font-mono-num text-sm text-white tracking-widest font-bold">•••• 8823</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl italic font-black text-white tracking-tighter">VISA</span>
                    <p className="font-mono-num text-[9px] uppercase text-white/90 tracking-widest -mt-1">Platinum</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Card 2: PayKool Prop Card (業主專屬卡) */}
        <div className="bg-[#161325] text-[#f4eeff] rounded-3xl shadow-2xl p-8 lg:p-12 relative overflow-hidden transition-all duration-300 border border-[#5B459B]/40">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FCE3CB] via-[#DFC28D] to-[#E83375]"></div>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#5B459B]/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: 3D Prop Card */}
            <div className="lg:col-span-5 flex items-center justify-center p-4 order-2 lg:order-1">
              <div
                onClick={() => onNavigate('prop-card')}
                className="relative w-full max-w-[380px] aspect-[1.586/1] rounded-2xl bg-gradient-to-tr from-[#110e1c] via-[#1c162f] to-[#2e2348] p-6 text-[#FCE3CB] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.8)] border border-[#5B459B]/40 transform hover:-rotate-1 hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#E83375]/15 blur-3xl pointer-events-none"></div>
                <div className="flex items-center justify-between relative z-10 mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl tracking-tight text-white font-extrabold">PayKool</span>
                    <span className="text-[10px] font-mono-num uppercase tracking-widest px-2 py-0.5 bg-[#5B459B] text-[#FCE3CB] rounded font-bold">
                      Prop
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[26px] text-[#FCE3CB]">domain</span>
                </div>
                <div className="flex items-center gap-3 relative z-10 mb-10">
                  <div className="w-11 h-8 rounded-md bg-gradient-to-br from-[#FCE3CB] to-[#DFC28D] relative flex items-center justify-center overflow-hidden shadow">
                    <div className="w-full h-[1px] bg-black/40 absolute"></div>
                    <div className="h-full w-[1px] bg-black/40 absolute"></div>
                    <div className="w-5 h-4 rounded-xs border border-black/50"></div>
                  </div>
                  <span className="material-symbols-outlined text-[#FCE3CB]/70 text-[20px]">contactless</span>
                </div>
                <div className="flex items-end justify-between relative z-10">
                  <div>
                    <p className="font-mono-num text-[10px] text-[#FCE3CB]/80 tracking-widest uppercase">
                      PROPERTY OWNER SIGNATURE
                    </p>
                    <p className="font-mono-num text-sm text-white tracking-widest font-bold">•••• 6289</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl italic font-black text-[#FCE3CB] tracking-tighter">VISA</span>
                    <p className="font-mono-num text-[9px] uppercase text-[#FCE3CB]/90 tracking-widest -mt-1">
                      Infinite Prop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Prop Card Features */}
            <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#221C33] border border-[#DFC28D]/40 text-[#FCE3CB] font-bold text-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#DFC28D]">stars</span>
                  尊尚專屬・物業業主首選
                </span>
                <span className="font-mono-num text-xs text-[#FCE3CB] font-semibold">Prop Card Elite</span>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  PayKool Prop Card（業主專屬卡）
                </h3>
                <p className="text-[#c9bfff] text-sm sm:text-base">
                  專為香港物業業主度身訂造 | 高額信用周轉 | 家居裝修與物管開支首選
                </p>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#221C33] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#FCE3CB]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#FCE3CB] tracking-tight mb-1">
                    高達 HK$1,000,000
                  </p>
                  <p className="text-xs text-[#e5deff] leading-relaxed">
                    物業持有人尊尚信用額度，靈活調配大額資金周轉
                  </p>
                </div>
                <div className="bg-[#221C33] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#FCE3CB]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#FCE3CB] tracking-tight mb-1">
                    裝修／家電分期
                  </p>
                  <p className="text-xs text-[#e5deff] leading-relaxed">
                    大型家居修繕、裝修工程及傢俬電器 3 至 60 個月自主分期
                  </p>
                </div>
                <div className="bg-[#221C33] rounded-xl p-4 relative overflow-hidden border-t-2 border-[#FCE3CB]">
                  <p className="font-mono-num text-lg sm:text-xl font-extrabold text-[#FCE3CB] tracking-tight mb-1">
                    極速物業認證
                  </p>
                  <p className="text-xs text-[#e5deff] leading-relaxed">
                    憑差餉單或物業證明即時簡化審批，毋須交樓契
                  </p>
                </div>
              </div>

              {/* Welcome offer */}
              <div className="bg-[#221C33] rounded-2xl p-4 flex items-start gap-3.5 border border-[#DFC28D]/30">
                <span className="material-symbols-outlined text-[#FCE3CB] text-[24px] shrink-0 mt-0.5">diamond</span>
                <div>
                  <p className="font-bold text-sm text-[#FCE3CB] mb-1">業主尊享專利特權</p>
                  <p className="text-xs text-[#c9bfff] leading-relaxed">
                    專享物業管理費自動轉賬簽賬回贈，兼享「Fun K 易」大額現金套現特惠手續費與 FPS 轉數快即時過數！
                  </p>
                </div>
              </div>

              {/* Eligibility */}
              <div className="bg-[#221C33] rounded-2xl p-4 flex items-start gap-3.5 border border-[#7a7582]/30">
                <span className="material-symbols-outlined text-[#e5deff] text-[24px] shrink-0 mt-0.5">home_pin</span>
                <div>
                  <p className="font-bold text-sm text-white mb-0.5">申請資格</p>
                  <p className="text-xs text-[#c9bfff] leading-relaxed">
                    年滿 18 歲之香港居民，並持有香港住宅、工商或車位物業之登記業主；可憑差餉物業估價署單據或物業證明簡化審批。
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenApplyModal('prop')}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-90 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02] cursor-pointer"
                >
                  立即申請 Prop Card
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('prop-card')}
                  className="inline-flex items-center justify-center bg-transparent hover:bg-[#221C33] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-xs border border-[#FCE3CB]/40 transition-all cursor-pointer"
                >
                  了解業主專屬特權
                </button>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 4. 6-Card Services & Privileges with Merchant Partner Badges */}
      <section className="w-full bg-[#F7F4FD] py-20" id="services-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f2ebff] text-[#5B459B] text-xs mb-3 font-bold">
                核心持卡特權與商戶網絡
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight mb-2">
                PayKool 專屬信用服務與持卡特權
              </h2>
              <p className="text-[#5f5792] text-sm sm:text-base">
                無論是日常靈活簽賬分期、突發大額資金調配，抑或信貸監察，透過創新手機 App 全方位滿足你的財務節奏。
              </p>
            </div>

            {/* Merchant Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {['Travel Kingdom', '日本城 JHC', 'GIORMANI 茲曼尼', 'Apple Duo 特約', '759 阿信屋'].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-[#161324] border border-[#ece4ff] shadow-xs"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tile 1 */}
            <div
              onClick={() => onNavigate('cash-advance')}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#5B459B]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#5B459B]/10 text-[#5B459B] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">payments</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">「Fun K 易」現金分期套現</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  未動用信用額度即時轉化為實質現金，經 FPS 轉數快最快即日到手應急，自選長達 36 個月供款期。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#5B459B] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>了解現金分期</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Tile 2 */}
            <div
              onClick={() => {
                const el = document.getElementById('calculator-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#E83375]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E83375]/10 text-[#E83375] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">tune</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">簽賬無壓力 想點分就點分</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  消費後隨時於 App 內自選分 3/4/5 個月，一次性手續費透明清晰，杜絕傳統循環利息與月平息複利陷阱。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#E83375] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>查看分期試算</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Tile 3 */}
            <div
              onClick={() => onNavigate('tu-report')}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#00AAEE]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00AAEE]/10 text-[#00AAEE] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">analytics</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">智能信貸評估報告</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  手機 App 內永久免費查閱個人環聯（TU）信貸評分。採用軟性查詢（Soft Inquiry），絕不影響您的信貸紀錄。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#00AAEE] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>免費查閱信貸評分</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Tile 4 */}
            <div
              onClick={() => onNavigate('promotions')}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#5B459B]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f2ebff] text-[#5B459B] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">storefront</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">最新商戶推廣優惠</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  聯乘日本城、759阿信屋、茲曼尼、Apple Duo 等全港熱門商戶，享有獨家簽賬折扣及滿額現金立減優惠。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#5B459B] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>探索專屬特約商戶</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Tile 5 */}
            <div
              onClick={() => onNavigate('promotions')}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#E83375]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#E83375]/10 text-[#E83375] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">loyalty</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">持卡人優惠區與積分獎賞</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  特設 PayKool Point 積分獎賞體系，每次準時還款或日常簽賬輕鬆儲分，隨心兌換人氣演唱會門票與生活禮遇。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#E83375] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>兌換獎賞禮券</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

            {/* Tile 6 */}
            <div
              onClick={() => onOpenApplyModal('platinum')}
              className="group bg-white p-7 rounded-2xl shadow-xs hover:shadow-lg border border-[#ece4ff] hover:border-[#00B6ED]/40 transition-all duration-200 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#00B6ED]/10 text-[#00B6ED] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">credit_card</span>
                </div>
                <h3 className="text-lg font-bold text-[#161324] mb-2">即批即用虛擬卡</h3>
                <p className="text-[#5f5792] text-sm leading-relaxed">
                  審批通過後 App 內即時點亮虛擬卡，一鍵綁定 Apple Pay 及 Google 錢包，即刻於全球 Visa 網絡實體拍卡與網購。
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[#00B6ED] text-xs font-bold mt-6 group-hover:translate-x-1 transition-transform">
                <span>立即申請 PayKool 卡</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Step-by-Step 3-Minute Digital Journey */}
      <section className="w-full bg-[#fdf8ff] py-20 border-b border-[#ece4ff]" id="journey-steps">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="px-3.5 py-1.5 rounded-full bg-[#5B459B]/10 text-[#5B459B] text-xs font-bold inline-block mb-3">
              極速出卡三部曲
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight">
              最快 3 分鐘完成申請與綁定
            </h2>
            <p className="text-[#5f5792] text-sm mt-2">全程於手機應用程式內完成，無須親身排隊交表</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#E83375] via-[#5B459B] to-[#00B6ED] -translate-y-8 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 bg-white p-6 rounded-2xl border border-[#ece4ff] shadow-md text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E83375] to-[#5B459B] text-white flex items-center justify-center font-mono-num text-xl font-black mb-4 shadow-lg shadow-[#E83375]/20">
                01
              </div>
              <h3 className="font-bold text-base text-[#161324] mb-2">手機快速登記</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                下載 PayKool App，輸入個人資料及專屬邀請碼 <strong className="text-[#5B459B] font-mono-num">TK</strong>，大專生出示學生證即可免入息審批。
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 bg-white p-6 rounded-2xl border border-[#ece4ff] shadow-md text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#5B459B] to-[#00B6ED] text-white flex items-center justify-center font-mono-num text-xl font-black mb-4 shadow-lg shadow-[#5B459B]/20">
                02
              </div>
              <h3 className="font-bold text-base text-[#161324] mb-2">秒速智能批核</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                AI 智能風險系統配合金融級加密基建，最快 3 分鐘完成身份驗證與額度審批，即刻於手機取得核准通知。
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 bg-white p-6 rounded-2xl border border-[#ece4ff] shadow-md text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00B6ED] to-teal-500 text-white flex items-center justify-center font-mono-num text-xl font-black mb-4 shadow-lg shadow-[#00B6ED]/20">
                03
              </div>
              <h3 className="font-bold text-base text-[#161324] mb-2">即拍卡消費與分期</h3>
              <p className="text-xs text-[#5f5792] leading-relaxed">
                一鍵將 PayKool Visa 加入 Apple Pay 或 Google 錢包，即刻於全球 Visa 網絡實體拍卡與網購，自選自主分期。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-20" id="faq-section">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#5B459B]/10 text-[#5B459B] text-xs mb-3 font-bold">
            常見疑問
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161324] tracking-tight mb-2">
            常見問題與申請須知
          </h2>
          <p className="text-[#5f5792] text-sm">
            了解更多關於 PayKool 信用卡申請資格、透明費用機制及開卡流程
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              id: 1,
              q: 'Q1. PayKool 信用卡是甚麼？跟傳統銀行信用卡有何不同？',
              a: 'PayKool 是香港主板上市公司 K Cash Limited（港股代號：2483.HK）旗下嶄新科技金融旗艦品牌。與傳統銀行信用卡最大不同在於，PayKool 採用自主分期制度：任何 $100 以上簽賬均可自由拆分為 3、4 或 5 個月償還，僅收取一次性透明行政手續費，杜絕傳統循環利息、利疊利的財務負擔，並支援即時手機發卡與全方位 TU 信用評分查詢。',
            },
            {
              id: 2,
              q: 'Q2. 申請 PayKool 信用卡需要準備甚麼證明文件？大專生可申請嗎？',
              a: '一般客戶只需年滿 18 歲之香港永久居民，備妥香港身份證、最近 3 個月之香港住址證明及入息證明文件（如銀行月結單或稅單）即可極速申請。全日制香港大專院校學生更尊享專屬綠色通道，僅需出示有效全日制學生證與香港身份證，即可免入息證明申請，建立優良信貸紀錄。',
            },
            {
              id: 3,
              q: 'Q3. 「長達 46 日免息還款期」是如何計算的？',
              a: '免息還款期適用於在結單周期第一天所進行的全新零售簽賬。由簽賬日起至該期月結單之到期還款日止，最長可享受達 46 天的免息資金周轉期。只要您於到期還款日或之前全數清還月結單結欠，該期所有合資格零售交易均無需支付任何財務利息。',
            },
            {
              id: 4,
              q: 'Q4. 申請後如何聯絡客戶服務？實體卡何時會收到？',
              a: '當線上核身審批通過後，虛擬信用卡即刻於 PayKool 手機應用程式內亮起，即可即刻加入 Apple Pay 進行拍卡。實體信用卡將於 3 至 5 個工作天內以掛號郵件寄往您的登記住址。若有任何疑問，歡迎於星期一至五致電客服熱線 +852 2311 1611 或 WhatsApp 6828 1222 聯絡專屬客戶經理。',
            },
          ].map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-xs border border-[#ece4ff] overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#161324] hover:text-[#5B459B] transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                <span
                  className={`material-symbols-outlined transition-transform duration-200 text-[#5f5792] ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-[#5f5792] text-sm leading-relaxed animate-fadeIn">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Sticky Bottom Quick Conversion Bar */}
      <div className="w-full bg-[#1F1841] py-4 px-6 text-white shadow-2xl border-t border-[#5B459B]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E83375] animate-ping"></div>
            <p className="text-sm">
              <span className="font-bold text-[#FCE3CB]">迎新即享多重禮遇：</span>{' '}
              日本城優惠券、Travel Kingdom 行李篋及現金回贈任你選！
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={() => onOpenApplyModal('platinum')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-90 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow transition-all cursor-pointer"
            >
              <span>即時線上辦卡</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
