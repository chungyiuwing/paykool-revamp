export type PageType = 
  | 'home' 
  | 'cash-advance' 
  | 'promotions' 
  | 'tu-report' 
  | 'compare' 
  | 'visa-platinum' 
  | 'prop-card';

export interface CardProduct {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  maxLimit: string;
  feeRate: string;
  annualFee: string;
  tenor: string;
  gradient: string;
  imagePlaceholder?: string;
}
