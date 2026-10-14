import React, { useState, useMemo } from 'react';
import { PageType } from '../types';

interface PromotionsPageProps {
  onNavigate: (page: PageType, hash?: string) => void;
  onOpenApplyModal: (cardType?: string) => void;
}

interface PromotionOffer {
  id: number;
  merchant: string;
  type: 'welcome' | 'cardholder' | 'past';
  typeLabel: string;
  subCategory: 'digital' | 'travel' | 'home' | 'dining' | 'lifestyle' | 'shopping';
  subCategoryLabel: string;
  categoryLabel: string;
  categoryBadgeColor: string;
  title: string;
  highlightValue: string;
  promoCode?: string;
  condition: string;
  deadline: string;
  featured?: boolean;
  heroCarousel?: boolean;
  terms: string[];
  logoText: string;
  logoBg: string;
  image: string;
  chips: string[];
}

export const PromotionsPage: React.FC<PromotionsPageProps> = ({
  onNavigate,
  onOpenApplyModal,
}) => {
  // Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Core Category Tabs (嚴格保留原汁原味官方分類：全部優惠 / 迎新優惠 / 持卡人專屬 / 過往精選)
  const [activeTab, setActiveTab] = useState<'all' | 'welcome' | 'cardholder' | 'past'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  // Interactive UI State
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [modalOffer, setModalOffer] = useState<PromotionOffer | null>(null);

  // 40+ 精選特約商戶推廣
  const offers: PromotionOffer[] = [
    {
      id: 1,
      merchant: '醫思健康 (EC Healthcare)',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'lifestyle',
      subCategoryLabel: '健康生活',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'PayKool x 醫思健康 迎新送免費體檢及痛症紓緩療程',
      highlightValue: '迎新送免費體檢及痛症療程 (總值 HK$2,640)',
      promoCode: 'MCHKF',
      condition: '發卡後 60 天內累積簽賬滿 HK$3,800',
      deadline: '2027 年 12 月 31 日',
      featured: true,
      heroCarousel: true,
      logoText: 'EC',
      logoBg: 'bg-[#003B71] text-white',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      chips: ['#免找數簽賬額', '#免費體檢'],
      terms: [
        '推廣期由即日起至 2027 年 12 月 31 日止。',
        '全新合資格 PayKool 信用卡持卡人於發卡後 60 天內累積合資格簽賬滿 HK$3,800，即可獲贈醫思健康專業體檢及痛症紓緩療程兌換券乙張（價值 HK$2,640）。',
        '兌換券將於符合簽賬條件後 14 個工作天內透過 PayKool 手機應用程式發送。',
      ],
    },
    {
      id: 2,
      merchant: 'Travel Kingdom',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'Travel Kingdom 迎新好禮 4 揀 1 尊屬自選禮遇',
      highlightValue: 'Yoshi Feather 20" 行李箱 / HK$500 現金券',
      promoCode: 'TK',
      condition: '批卡後 30 天內完成首筆任意金額簽賬',
      deadline: '2027 年 12 月 31 日',
      featured: true,
      heroCarousel: true,
      logoText: 'TK',
      logoBg: 'bg-[#1A1E26] text-[#00D67D]',
      image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80',
      chips: ['#免費行李箱', '#現金券'],
      terms: [
        '全新客戶使用優惠碼「TK」成功申請並獲批核，於 30 天內簽賬 1 次即可免費獲得 20 吋前開商務行李箱（或選擇 HK$500 門市現金券）。',
        '持卡人於 Travel Kingdom 門市出示實體或虛擬卡，享額外全單 95 折。',
      ],
    },
    {
      id: 3,
      merchant: '759 阿信屋',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'shopping',
      subCategoryLabel: '生活百貨',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: '759 阿信屋 迎新獎賞與日常手機感應支付立減',
      highlightValue: '享高達 HK$550 迎新禮遇 + 滿 HK$30 減 HK$10',
      promoCode: '759',
      condition: '綁定 Apple Pay / Google Wallet 單一簽賬滿 HK$30',
      deadline: '2027 年 10 月 31 日',
      featured: true,
      heroCarousel: true,
      logoText: '759',
      logoBg: 'bg-[#D32F2F] text-white',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80',
      chips: ['#現金券', '#全單折扣'],
      terms: [
        '使用邀請碼「759」開卡即享迎新總值 HK$550 專屬禮遇包。',
        '於全港 759 阿信屋分店使用 PayKool 信用卡手機支付單次滿 HK$30 即減 HK$10。',
      ],
    },
    {
      id: 4,
      merchant: 'Apple Duo (Apple Pay 特約)',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'digital',
      subCategoryLabel: '潮流數碼',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'PayKool x Apple Duo 出機攻略旗艦盛惠',
      highlightValue: '送 HK$500 免找數簽賬額',
      promoCode: 'DUO',
      condition: '合資格全新客戶單一簽賬買機滿 HK$2,000',
      deadline: '2027 年 06 月 30 日',
      logoText: '',
      logoBg: 'bg-[#1A1E26] text-white',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      chips: ['#免找數簽賬額', '#全單折扣'],
      terms: [
        '憑優惠碼「DUO」開卡，批核後於 Apple 授權合作商單一簽賬滿 HK$2,000 即自動存入 HK$500 免找數簽賬額。',
      ],
    },
    {
      id: 5,
      merchant: 'HKTVmall',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'shopping',
      subCategoryLabel: '生活百貨',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'HKTVmall 激減雙重著數！滿額贈網購購物金',
      highlightValue: '送 HK$500 電子購物禮券',
      promoCode: 'PPTVMALL',
      condition: '發卡後 60 天內累積簽賬滿 HK$3,000',
      deadline: '2027 年 08 月 31 日',
      logoText: 'HKTV',
      logoBg: 'bg-[#00897B] text-white',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
      chips: ['#現金券'],
      terms: [
        '輸入邀請碼「PPTVMALL」成功出卡，累積簽賬滿額即可於 PayKool App 領取 HK$500 HKTVmall 電子禮券碼。',
      ],
    },
    {
      id: 6,
      merchant: 'HeyMax 飛行哩數平台',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'HeyMax 飛行獎賞：出門旅遊暢快累積哩數',
      highlightValue: '送 5,000 Max Miles 飛行哩數',
      promoCode: 'PPMAX',
      condition: '綁定 PayKool 卡並完成首筆外幣或機票簽賬',
      deadline: '2027 年 09 月 30 日',
      logoText: 'Max',
      logoBg: 'bg-[#6200EA] text-white',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
      chips: ['#免找數簽賬額'],
      terms: [
        '使用優惠碼「PPMAX」開卡綁定 HeyMax 平台消費，立即獲贈 5,000 Max Miles，可兌換 25+ 航空公司里程。',
      ],
    },
    {
      id: 7,
      merchant: 'GIORMANI 茲曼尼',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'home',
      subCategoryLabel: '家居生活',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'GIORMANI 茲曼尼 優質真皮梳化升級居家',
      highlightValue: '滿 HK$3,000 送 HK$400 簽賬額 + 梳化 95 折',
      promoCode: 'MBGIORMANI',
      condition: '門市單一簽賬滿 HK$3,000 並辦理自主分期',
      deadline: '2027 年 05 月 31 日',
      logoText: 'GM',
      logoBg: 'bg-[#8D6E63] text-white',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      chips: ['#免找數簽賬額', '#全單折扣'],
      terms: [
        '門市單一簽賬滿 HK$3,000 送 HK$400 免找數簽賬額，兼享 3 至 5 個月自主分期特惠費率。',
      ],
    },
    {
      id: 8,
      merchant: 'Trip.com 攜程旅行',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Trip.com 全球機票及酒店精選度假盛惠',
      highlightValue: '機票及酒店預訂享 15% 現金回贈',
      promoCode: 'TRIPKOOL',
      condition: '單筆訂單滿 HK$1,500 於結賬頁輸入優惠碼',
      deadline: '2027 年 12 月 31 日',
      logoText: 'Trip',
      logoBg: 'bg-[#2577E3] text-white',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#免找數簽賬額'],
      terms: [
        '於 Trip.com 預訂全球酒店或機票單筆滿 HK$1,500，輸入「TRIPKOOL」立享 15% 現金回贈。',
      ],
    },
    {
      id: 9,
      merchant: '美國冒險樂園 (Jumpin Gym)',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'lifestyle',
      subCategoryLabel: '休閒娛樂',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: '美國冒險樂園 親子合家歡代幣激賞盛典',
      highlightValue: '送 400 枚代幣券 (值 HK$800) + HK$100 簽賬額',
      promoCode: 'JG',
      condition: '門市購買代幣套餐滿 HK$500',
      deadline: '2027 年 07 月 31 日',
      logoText: 'JJ',
      logoBg: 'bg-[#E53935] text-white',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      chips: ['#現金券', '#免找數簽賬額'],
      terms: [
        '憑優惠碼「JG」於門市拍卡購買代幣滿 HK$500，加碼贈送 400 枚代幣兌換券，再享次月賬單 HK$100 簽賬額回贈。',
      ],
    },
    {
      id: 10,
      merchant: 'SIM SQ 漫遊網絡',
      type: 'welcome',
      typeLabel: '迎新優惠',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '迎新優惠',
      categoryBadgeColor: 'bg-emerald-50 text-[#00B368] border-emerald-200',
      title: 'SIM SQ 環球數據漫遊卡與出行無憂補貼',
      highlightValue: '送 HK$288 簽賬額 + 免費亞洲 8 天漫遊數據卡',
      promoCode: 'MBSIM',
      condition: '官網購買指定漫遊套餐滿 HK$300',
      deadline: '2027 年 11 月 30 日',
      logoText: 'SQ',
      logoBg: 'bg-[#00B0FF] text-white',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
      chips: ['#免找數簽賬額'],
      terms: [
        '出卡專享免費領取亞洲 8 天高速漫遊數據卡乙張（覆蓋日韓泰台新），另送 HK$288 信用卡免找數簽賬額。',
      ],
    },
    {
      id: 11,
      merchant: '尚酒薈 W Wine Store',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'dining',
      subCategoryLabel: '美饌佳釀',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '尚酒薈 環球名莊紅酒與威士忌尊賞',
      highlightValue: '買酒減 HK$400 + 精選名莊 95 折',
      promoCode: 'PPWWINE',
      condition: '單一簽賬滿 HK$1,200',
      deadline: '2027 年 06 月 30 日',
      logoText: 'W',
      logoBg: 'bg-[#4A154B] text-[#FCE3CB]',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#現金券'],
      terms: [
        '單一簽賬購買指定名莊佳釀滿 HK$1,200 即減 HK$400，並享有侍酒師一對一選酒專屬服務及指定酒款 95 折。',
      ],
    },
    {
      id: 12,
      merchant: 'JHC 日本城',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'home',
      subCategoryLabel: '家居生活',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'JHC 日本城 全線生活家品限時驚喜折扣',
      highlightValue: '全單 88 折 + 送 HK$50 門市現金券',
      promoCode: 'JHC88',
      condition: '全線門市購物單一簽賬滿 HK$300',
      deadline: '2027 年 12 月 31 日',
      logoText: 'JHC',
      logoBg: 'bg-[#FFB300] text-[#1A1E26]',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#現金券'],
      terms: [
        '逢星期五、六、日於全港 JHC 日本城分店拍卡簽賬滿 HK$300 即享 88 折，加贈 HK$50 現金購物券。',
      ],
    },
    {
      id: 13,
      merchant: '星巴克 Starbucks',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'dining',
      subCategoryLabel: '美饌佳釀',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '星巴克 手調飲品買一送一與增值專享回贈',
      highlightValue: '每週五買一送一 + 儲值享 10% 回贈',
      promoCode: 'SBUXFRI',
      condition: '以 PayKool 卡綁定星巴克手機錢包感應支付',
      deadline: '2027 年 12 月 31 日',
      logoText: '★',
      logoBg: 'bg-[#006241] text-white',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#免找數簽賬額'],
      terms: [
        '持卡人每週五於全港星巴克購買手調飲品享買一送一；為星巴克卡增值滿 HK$300 即享 10% 簽賬回贈。',
      ],
    },
    {
      id: 14,
      merchant: 'OneDegree 寵物及家居保險',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'lifestyle',
      subCategoryLabel: '休閒娛樂',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'OneDegree 毛孩守護：毛波寵物醫療全險優惠',
      highlightValue: '首年保費 75 折 + 送 HK$300 簽賬額',
      promoCode: 'PET25',
      condition: '成功為貓狗寵物投保指定醫療保險計劃',
      deadline: '2027 年 08 月 31 日',
      logoText: '1°',
      logoBg: 'bg-[#00C9A7] text-[#1A1E26]',
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#免找數簽賬額'],
      terms: [
        '輸入優惠碼「PET25」投保 OneDegree「毛波寵物醫療保險」，首年保費即享 75 折，開立自動轉賬再送 HK$300 簽賬額。',
      ],
    },
    {
      id: 15,
      merchant: '美亞廚具 Meyer',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'home',
      subCategoryLabel: '家居生活',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '美亞廚具 旗艦廚房美學升級精選',
      highlightValue: '廚具配件低至 4 折 + 額外 9 折',
      promoCode: 'MEYER10',
      condition: '官網或觀塘體驗館消費滿 HK$800',
      deadline: '2027 年 06 月 30 日',
      logoText: 'MY',
      logoBg: 'bg-[#C62828] text-white',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '憑 PayKool 卡於美亞廚具官網或陳列室購物，特價品再享額外 9 折，單次滿 HK$1,500 送不黏煎鍋乙隻。',
      ],
    },
    {
      id: 16,
      merchant: 'ORiental TRaffic 女裝鞋履',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'shopping',
      subCategoryLabel: '生活百貨',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'ORiental TRaffic 日系優雅鞋履春夏折現',
      highlightValue: '單一消費滿 HK$600 即減 HK$120',
      promoCode: 'ORT120',
      condition: '全港專門店出示優惠碼並以 PayKool 卡結賬',
      deadline: '2027 年 09 月 30 日',
      logoText: 'OT',
      logoBg: 'bg-[#F48FB1] text-white',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣', '#現金券'],
      terms: [
        '凡購買正價或特價鞋履單一滿 HK$600 即時扣減 HK$120，每筆交易限用一次。',
      ],
    },
    {
      id: 17,
      merchant: 'AKIV 運動機能服飾',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'shopping',
      subCategoryLabel: '生活百貨',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'AKIV 專業跑步機能裝備極致暢跑',
      highlightValue: '全店 85 折 + 送機能跑步襪',
      promoCode: 'AKIV15',
      condition: '官網購物滿 HK$600 輸入優惠代碼',
      deadline: '2027 年 10 月 31 日',
      logoText: 'AK',
      logoBg: 'bg-[#1A1E26] text-white',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '輸入「AKIV15」享全單 85 折優惠，首 200 名滿額持卡人額外獲贈 AKIV 專業壓縮透氣跑步襪乙對。',
      ],
    },
    {
      id: 18,
      merchant: '鮮芋仙 Meet Fresh',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'dining',
      subCategoryLabel: '美饌佳釀',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '鮮芋仙 台式經典芋圓甜品午後滋味',
      highlightValue: '全線甜品系列 85 折優惠',
      promoCode: 'MEETFRESH',
      condition: '門市堂食或外賣自取單次滿 HK$80',
      deadline: '2027 年 07 月 31 日',
      logoText: 'MF',
      logoBg: 'bg-[#5D4037] text-white',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '於鮮芋仙全港分店出示 PayKool 實體或 Apple Pay 信用卡消費滿 HK$80，即享全單 85 折。',
      ],
    },
    {
      id: 19,
      merchant: 'Klook 客路旅行',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Klook 全球景點門票與一日遊專屬減免',
      highlightValue: '全球景點門票享高達 12% 折扣',
      promoCode: 'KLKKOOL',
      condition: '透過專屬連結於 Klook 預訂並以卡結賬',
      deadline: '2027 年 12 月 31 日',
      logoText: 'Kl',
      logoBg: 'bg-[#FF5722] text-white',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '預訂全球樂園門票、交通卡及一日遊，結賬輸入「KLKKOOL」享最高 12% 即時折扣。',
      ],
    },
    {
      id: 20,
      merchant: '香港沙田凱悅酒店 (Hyatt)',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'dining',
      subCategoryLabel: '美饌佳釀',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '沙田凱悅酒店 咖啡廳自助餐與中菜星級饗宴',
      highlightValue: '自助餐及中菜廳單點 82 折',
      promoCode: 'HYATT82',
      condition: '預先訂座並出示卡片結賬',
      deadline: '2027 年 12 月 31 日',
      logoText: 'Hy',
      logoBg: 'bg-[#37474F] text-white',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '持卡人於沙田凱悅酒店咖啡廳享用自助午餐或晚餐，或於沙田 18 享用單點美饌，全單尊享 82 折優惠。',
      ],
    },
    {
      id: 21,
      merchant: '7-Eleven 便利店',
      type: 'cardholder',
      typeLabel: '持卡人專屬',
      subCategory: 'shopping',
      subCategoryLabel: '生活百貨',
      categoryLabel: '持卡人專屬',
      categoryBadgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: '7-Eleven 晨光早餐組合感應快捷立減',
      highlightValue: '晨光早餐組合享 HK$5 即減',
      promoCode: '7ELEV',
      condition: '早上 7:00 至 11:00 購買指定早餐組合滿 HK$25',
      deadline: '2027 年 11 月 30 日',
      logoText: '7-E',
      logoBg: 'bg-[#008060] text-white',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: [
        '每日早上 7 時至 11 時，於全港 7-Eleven 以手機感應 PayKool 卡買早餐組合滿 HK$25 即時減 HK$5。',
      ],
    },
    {
      id: 22,
      merchant: '日本城 JHC 新春迎春季',
      type: 'past',
      typeLabel: '過往精選',
      subCategory: 'home',
      subCategoryLabel: '家居生活',
      categoryLabel: '過往精選',
      categoryBadgeColor: 'bg-slate-100 text-slate-600 border-slate-300',
      title: '【已完結】日本城新春年宵採購大狂歡',
      highlightValue: '滿 HK$500 即減 HK$80 現金回贈',
      condition: '新春指定期間全線門市單一滿額簽賬',
      deadline: '2026 年 02 月 28 日 (已圓滿結束)',
      logoText: 'JHC',
      logoBg: 'bg-[#64748B] text-white',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      chips: ['#現金券'],
      terms: ['本推廣已於 2026 年 02 月 28 日結束，敬請期待下一季度新春禮遇。'],
    },
    {
      id: 23,
      merchant: 'Trip.com 跨年漫遊季',
      type: 'past',
      typeLabel: '過往精選',
      subCategory: 'travel',
      subCategoryLabel: '旅遊出行',
      categoryLabel: '過往精選',
      categoryBadgeColor: 'bg-slate-100 text-slate-600 border-slate-300',
      title: '【已完結】冬季滑雪與極光航線早鳥機票特別折減',
      highlightValue: '國際長途航線享高達 HK$600 折扣',
      condition: '活動期間預訂指定滑雪熱門目的地機票',
      deadline: '2026 年 01 月 15 日 (已圓滿結束)',
      logoText: 'Trip',
      logoBg: 'bg-[#64748B] text-white',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      chips: ['#全單折扣'],
      terms: ['本期冬季促銷已圓滿結束，感謝廣大持卡人熱烈支持。'],
    },
  ];

  // 3 Hero Carousel items
  const heroItems = offers.filter((o) => o.heroCarousel);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // 篩選核心邏輯：嚴格依照官方分類（全部優惠 / 迎新優惠 / 持卡人專屬 / 過往精選）
  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      // 1. 官方主分類 Tab 篩選 (全部優惠 / 迎新優惠 / 持卡人專屬 / 過往精選)
      if (activeTab !== 'all' && offer.type !== activeTab) {
        return false;
      }
      // 2. 行業次分類篩選
      if (selectedSubCategory !== 'all' && offer.subCategory !== selectedSubCategory) {
        return false;
      }
      // 3. 標籤篩選
      if (selectedChip && !offer.chips.includes(selectedChip)) {
        return false;
      }
      // 4. 關鍵字搜尋
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inMerchant = offer.merchant.toLowerCase().includes(q);
        const inTitle = offer.title.toLowerCase().includes(q);
        const inValue = offer.highlightValue.toLowerCase().includes(q);
        const inCode = offer.promoCode?.toLowerCase().includes(q) || false;
        const inCondition = offer.condition.toLowerCase().includes(q);
        return inMerchant || inTitle || inValue || inCode || inCondition;
      }
      return true;
    });
  }, [offers, activeTab, selectedSubCategory, searchQuery, selectedChip]);

  // 動態計算各官方主分類之數量
  const tabCounts = useMemo(() => {
    return {
      all: offers.length,
      welcome: offers.filter((o) => o.type === 'welcome').length,
      cardholder: offers.filter((o) => o.type === 'cardholder').length,
      past: offers.filter((o) => o.type === 'past').length,
    };
  }, [offers]);

  const merchantPartners = [
    { name: 'JHC 日本城', icon: 'storefront' },
    { name: '7-Eleven', icon: 'local_convenience_store' },
    { name: '星巴克 Starbucks', icon: 'coffee' },
    { name: 'Trip.com 攜程', icon: 'flight_takeoff' },
    { name: 'HKTVmall', icon: 'shopping_bag' },
    { name: 'Apple 特約', icon: 'devices' },
    { name: '茲曼尼 GIORMANI', icon: 'chair' },
    { name: 'OneDegree 保險', icon: 'pets' },
    { name: '美亞廚具 Meyer', icon: 'soup_kitchen' },
    { name: 'ORiental TRaffic', icon: 'footprint' },
    { name: 'AKIV 運動', icon: 'sprint' },
    { name: '鮮芋仙 Meet Fresh', icon: 'bakery_dining' },
    { name: 'Klook 客路', icon: 'map' },
    { name: '香港凱悅酒店', icon: 'hotel' },
    { name: '醫思健康 EC', icon: 'health_and_safety' },
    { name: '759 阿信屋', icon: 'local_mall' },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] text-[#1A1E26] font-sans min-h-screen">
      
      {/* Toast Notification for Copied Promo Code */}
      {copiedCode && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1A1E26] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#00D67D]/60 animate-bounce">
          <span className="material-symbols-outlined text-[#00D67D] text-[20px]">check_circle</span>
          <span className="text-xs sm:text-sm font-bold">
            優惠碼 <span className="text-[#00D67D] font-mono">{copiedCode}</span> 已成功複製至剪貼簿！
          </span>
        </div>
      )}

      {/* 1. Standard Chartered Style Hero Banner & 3-Offer Carousel */}
      <section className="w-full bg-gradient-to-b from-[#F4F6F9] via-[#FFFFFF] to-[#FFFFFF] pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#5B459B] transition-colors cursor-pointer"
            >
              主頁
            </button>
            <span className="material-symbols-outlined text-[14px] text-slate-400">chevron_right</span>
            <span className="text-slate-500">信用卡推廣</span>
            <span className="material-symbols-outlined text-[14px] text-slate-400">chevron_right</span>
            <span className="text-[#1A1E26] font-bold">最新優惠專區 (Promotions Hub)</span>
          </nav>

          {/* Section Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#5B459B] border border-purple-200 text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E83375] animate-ping"></span>
              <span>2027 年度精選優惠禮遇匯總</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1E26] tracking-tight leading-tight">
              PayKool 最新信用卡推廣與商戶特惠
            </h1>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              匯聚全港精選商戶迎新大獎賞、餐飲購物折扣與旅遊回贈，出卡即享無盡精彩。
            </p>
          </div>

          {/* Featured Offers Carousel (3 大強打優惠) */}
          <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E2E8F0] shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] lg:min-h-[420px]">
              
              {/* Carousel Left Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-[#FAFCFA] to-[#F4F6F9]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#E83375] text-white text-xs font-black tracking-wide">
                      焦點強打推廣
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                      {heroItems[carouselIndex]?.typeLabel} · {heroItems[carouselIndex]?.subCategoryLabel}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1E26] tracking-tight leading-snug mb-3">
                    {heroItems[carouselIndex]?.title}
                  </h2>

                  {/* Highlight Value Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-[#00D67D]/30 mb-4">
                    <span className="text-xs text-[#00B368] font-bold block mb-1">精選禮遇</span>
                    <p className="text-lg sm:text-xl font-extrabold text-[#00B368] leading-tight">
                      {heroItems[carouselIndex]?.highlightValue}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[16px] text-[#00B368]">schedule</span>
                    <span>推廣期至：{heroItems[carouselIndex]?.deadline}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#00B368]">verified</span>
                    <span>簽賬門檻：{heroItems[carouselIndex]?.condition}</span>
                  </p>
                </div>

                {/* Bottom Row Actions */}
                <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4 mt-4">
                  {heroItems[carouselIndex]?.promoCode && (
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-dashed border-[#00B368]">
                      <span className="text-xs text-slate-500 font-semibold">專屬優惠碼:</span>
                      <span className="text-sm font-black font-mono text-[#00B368]">
                        {heroItems[carouselIndex]?.promoCode}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(heroItems[carouselIndex]!.promoCode!)}
                        className="text-xs text-[#1A1E26] hover:text-[#00B368] font-bold flex items-center gap-1 pl-1 cursor-pointer"
                        title="複製優惠碼"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>複製</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOffer(heroItems[carouselIndex])}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1A1E26] text-xs font-bold transition-colors cursor-pointer"
                    >
                      優惠詳情
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenApplyModal('platinum')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E83375] to-[#5B459B] hover:opacity-90 text-white text-xs font-black shadow-sm transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
                    >
                      <span>立即出卡領取</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Carousel Right Visual */}
              <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full overflow-hidden bg-slate-900">
                <img
                  alt={heroItems[carouselIndex]?.title}
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
                  src={heroItems[carouselIndex]?.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Carousel Controls */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  {heroItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        carouselIndex === idx ? 'w-6 bg-[#00D67D]' : 'w-2 bg-white/60'
                      }`}
                      aria-label={`切換至第 ${idx + 1} 個推廣`}
                    />
                  ))}
                  <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/30 text-white">
                    <button
                      onClick={() => setCarouselIndex((carouselIndex - 1 + heroItems.length) % heroItems.length)}
                      className="hover:text-[#00D67D] cursor-pointer"
                      aria-label="上一個"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                    </button>
                    <button
                      onClick={() => setCarouselIndex((carouselIndex + 1) % heroItems.length)}
                      className="hover:text-[#00D67D] cursor-pointer"
                      aria-label="下一個"
                    >
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. 嚴格保留官方「分類」：全部優惠 / 迎新優惠 / 持卡人專屬 / 過往精選 */}
      <section className="w-full bg-[#F4F6F9] py-8 border-b border-[#E2E8F0] sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 官方核心分類 Tabs (主分類標籤) */}
          <div className="flex flex-col gap-4">
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              
              {/* 原汁原味官方分類 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {[
                  { key: 'all', label: '全部優惠', count: tabCounts.all },
                  { key: 'welcome', label: '迎新優惠', count: tabCounts.welcome },
                  { key: 'cardholder', label: '持卡人專屬', count: tabCounts.cardholder },
                  { key: 'past', label: '過往精選', count: tabCounts.past },
                ].map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => {
                        setActiveTab(tab.key as any);
                        setSelectedChip(null);
                      }}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#1A1E26] text-white shadow-md font-black scale-102 border-2 border-[#00D67D]'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-[#E2E8F0]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive ? 'bg-[#00D67D] text-[#1A1E26]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 關鍵字搜尋框 */}
              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋商戶、優惠碼或獎賞..."
                  className="w-full pl-9 pr-8 py-2 rounded-full bg-white border border-[#E2E8F0] text-xs text-[#1A1E26] placeholder:text-slate-400 focus:outline-none focus:border-[#00D67D] shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                )}
              </div>

            </div>

            {/* 行業次分類與快捷標籤 */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
              
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-500 mr-1">行業分類：</span>
                {[
                  { key: 'all', label: '全部' },
                  { key: 'digital', label: '潮流數碼' },
                  { key: 'travel', label: '旅遊出行' },
                  { key: 'home', label: '家居生活' },
                  { key: 'dining', label: '美饌佳釀' },
                  { key: 'lifestyle', label: '休閒健康' },
                  { key: 'shopping', label: '生活百貨' },
                ].map((sub) => {
                  const isSubActive = selectedSubCategory === sub.key;
                  return (
                    <button
                      key={sub.key}
                      type="button"
                      onClick={() => setSelectedSubCategory(sub.key)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSubActive
                          ? 'bg-[#00D67D] text-[#1A1E26] font-bold shadow-xs'
                          : 'bg-white text-slate-600 border border-[#E2E8F0] hover:bg-slate-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  );
                })}
              </div>

              {/* 快捷 Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['#免找數簽賬額', '#免費行李箱', '#現金券', '#全單折扣'].map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setSelectedChip(isSelected ? null : chip)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E83375] text-white font-bold'
                          : 'bg-white text-slate-500 border border-slate-200 hover:text-[#E83375]'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}

                {(activeTab !== 'all' || selectedSubCategory !== 'all' || searchQuery || selectedChip) && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('all');
                      setSelectedSubCategory('all');
                      setSearchQuery('');
                      setSelectedChip(null);
                    }}
                    className="text-xs text-[#5B459B] hover:underline font-bold ml-2 cursor-pointer"
                  >
                    重設分類
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Main Offers Card Grid (渣打式 3 欄卡片瀑布流) */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-white min-h-[600px]">
        <div className="max-w-7xl mx-auto">
          
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#1A1E26]">
                {activeTab === 'all'
                  ? '全部優惠清單'
                  : activeTab === 'welcome'
                  ? '迎新專享優惠'
                  : activeTab === 'cardholder'
                  ? '持卡人專屬簽賬禮遇'
                  : '過往精選優惠活動'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                目前符合分類的項目：<strong className="text-[#00B368] font-bold">{filteredOffers.length}</strong> 個
              </p>
            </div>
            <div className="text-xs text-slate-500 hidden sm:block">
              更新時間：2027 年 04 月 (即時同步)
            </div>
          </div>

          {/* Grid Layout: 3 Cards Per Row on Desktop */}
          {filteredOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden flex flex-col justify-between hover:border-[#00D67D]/60 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Top Image & Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={offer.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Top Row Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md ${offer.categoryBadgeColor}`}>
                        {offer.categoryLabel}
                      </span>
                      <div className={`w-8 h-8 rounded-lg ${offer.logoBg} font-black text-xs flex items-center justify-center shadow-md`}>
                        {offer.logoText}
                      </div>
                    </div>

                    <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold drop-shadow-md">
                      {offer.merchant} · {offer.subCategoryLabel}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h4 className="text-base font-extrabold text-[#1A1E26] leading-snug mb-3 group-hover:text-[#00B368] transition-colors">
                        {offer.title}
                      </h4>

                      {/* 核心獎賞焦點方格 (Highlight Value) */}
                      <div className="p-3 rounded-xl bg-emerald-50/70 border border-[#00D67D]/30 mb-3">
                        <span className="text-[11px] font-bold text-[#00B368] block mb-0.5">專屬禮遇</span>
                        <p className="text-sm font-black text-[#00B368] leading-tight">
                          {offer.highlightValue}
                        </p>
                      </div>

                      {/* 專屬優惠碼標籤 (Promo Code Tag) with One-Click Copy */}
                      {offer.promoCode && (
                        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-dashed border-[#00B368]/60 mb-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-500 text-[11px] font-medium">優惠碼:</span>
                            <span className="text-xs font-black font-mono text-[#00B368]">
                              {offer.promoCode}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopyCode(offer.promoCode!)}
                            className="text-[11px] font-bold text-[#1A1E26] hover:text-[#00B368] flex items-center gap-0.5 px-2 py-0.5 rounded bg-white border border-slate-200 hover:border-[#00D67D] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">content_copy</span>
                            <span>{copiedCode === offer.promoCode ? '已複製' : '複製'}</span>
                          </button>
                        </div>
                      )}

                      {/* 門檻摘要 */}
                      <div className="text-xs text-slate-500 space-y-1 mb-4">
                        <p className="flex items-start gap-1">
                          <span className="material-symbols-outlined text-[15px] text-[#00B368] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>門檻：{offer.condition}</span>
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-slate-400">
                          <span className="material-symbols-outlined text-[14px] shrink-0">event</span>
                          <span>有效至：{offer.deadline}</span>
                        </p>
                      </div>
                    </div>

                    {/* 雙按鈕：立即出卡領取 (主按鈕) | 優惠詳情 (次要按鈕) */}
                    <div className="pt-3 border-t border-[#E2E8F0] grid grid-cols-2 gap-2 mt-auto">
                      <button
                        type="button"
                        onClick={() => setModalOffer(offer)}
                        className="py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer text-center"
                      >
                        優惠詳情
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenApplyModal('platinum')}
                        className="py-2.5 rounded-xl bg-[#00D67D] hover:bg-[#00b86b] text-[#1A1E26] text-xs font-black shadow-xs transition-all hover:scale-102 cursor-pointer text-center"
                      >
                        立即出卡領取
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300 max-w-lg mx-auto">
              <span className="material-symbols-outlined text-slate-400 text-[48px] mb-3">search_off</span>
              <h4 className="text-base font-bold text-[#1A1E26] mb-1">找不到符合此分類的推廣</h4>
              <p className="text-xs text-slate-500 mb-4">請嘗試切換至「全部優惠」或清除搜尋字詞</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setSelectedSubCategory('all');
                  setSearchQuery('');
                  setSelectedChip(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#00D67D] text-[#1A1E26] text-xs font-bold cursor-pointer"
              >
                重設所有條件
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 4. Merchant Partners Grid (強大商戶陣容展示牆) */}
      <section className="w-full bg-[#F4F6F9] py-16 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#00B368] border border-emerald-200 text-xs font-bold inline-block mb-2">
              持卡特權生態圈
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1A1E26] tracking-tight">
              超過 40+ 跨界知名品牌強強聯手
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              全港吃喝玩樂、潮流科技、機票出行與居家生活一卡盡享特約折扣
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {merchantPartners.map((partner, idx) => (
              <div
                key={idx}
                className="bg-white p-3.5 rounded-xl border border-[#E2E8F0] flex flex-col items-center justify-center text-center shadow-xs hover:border-[#00D67D] transition-colors"
              >
                <span className="material-symbols-outlined text-[#00B368] text-[26px] mb-1.5">
                  {partner.icon}
                </span>
                <span className="text-xs font-bold text-[#1A1E26] truncate w-full">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              * 商戶標誌及品牌商標版權均屬個別合作商戶所有。優惠受各商戶特定條款及細則約束。
            </p>
          </div>

        </div>
      </section>

      {/* 5. Floating Bottom Application Strip (底部懸浮引導條) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1A1E26] border-t-2 border-[#00D67D] text-white py-3.5 px-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D67D] animate-ping shrink-0 hidden sm:block"></span>
            <p className="text-xs sm:text-sm font-semibold">
              尚未持有 PayKool 卡？即時申請，最快 <strong className="text-[#00D67D]">3 分鐘出卡</strong> 領取上述迎新獎賞！
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenApplyModal('platinum')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#00D67D] hover:bg-[#00b86b] text-[#1A1E26] text-xs sm:text-sm font-black transition-all hover:scale-105 shadow-md cursor-pointer shrink-0"
          >
            立即申請 PayKool 卡
          </button>
        </div>
      </div>

      {/* 6. Terms & Details Modal (彈出優惠條款與細則) */}
      {modalOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0] relative max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setModalOffer(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded text-xs font-bold ${modalOffer.categoryBadgeColor}`}>
                {modalOffer.categoryLabel}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {modalOffer.merchant} · {modalOffer.subCategoryLabel}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-[#1A1E26] leading-snug mb-3">
              {modalOffer.title}
            </h3>

            {/* Highlight Value in Modal */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-[#00D67D]/30 mb-4">
              <span className="text-xs text-[#00B368] font-bold block mb-0.5">專屬禮遇</span>
              <p className="text-base font-black text-[#00B368]">{modalOffer.highlightValue}</p>
            </div>

            {/* Promo Code Box */}
            {modalOffer.promoCode && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-dashed border-[#00D67D] mb-4">
                <div>
                  <span className="text-xs text-slate-500 block">專屬推廣邀請碼</span>
                  <span className="text-base font-black font-mono text-[#00B368]">
                    {modalOffer.promoCode}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(modalOffer.promoCode!)}
                  className="px-3 py-1.5 rounded-lg bg-[#00D67D] text-[#1A1E26] text-xs font-bold hover:bg-[#00b86b] cursor-pointer"
                >
                  {copiedCode === modalOffer.promoCode ? '已複製' : '複製代碼'}
                </button>
              </div>
            )}

            {/* Specific Terms List */}
            <div className="mb-6">
              <h5 className="text-xs font-bold text-[#1A1E26] uppercase tracking-wider mb-2">
                優惠條款及細則 (Terms & Conditions)
              </h5>
              <ul className="space-y-2 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
                {modalOffer.terms.map((term, i) => (
                  <li key={i}>{term}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setModalOffer(null)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                關閉
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOffer(null);
                  onOpenApplyModal('platinum');
                }}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-[#E83375] to-[#5B459B] text-white text-xs font-black hover:opacity-95 shadow-sm cursor-pointer"
              >
                以此優惠申請出卡
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
