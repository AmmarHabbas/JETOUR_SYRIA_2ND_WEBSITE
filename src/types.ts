export type Locale = 'en' | 'es' | 'ar';

export type VehicleId = 'g700' | 't2' | 't1' | 't1idm' | 't2idm' | 'dashing' | 'x70Plus' | 'x90Plus';

export type SeriesId = 'gSeries' | 'tSeries' | 'jmkSeries' | 'familySeries';

export type PageRoute =
  | '/'
  | '/g700'
  | '/t2'
  | '/t1'
  | '/t1idm'
  | '/t1-i-dm'
  | '/t2idm'
  | '/t2-i-dm'
  | '/dashing'
  | '/x70Plus'
  | '/x70plus'
  | '/x90Plus'
  | '/x90plus'
  | '/gSeries'
  | '/tSeries'
  | '/jmkSeries'
  | '/familySeries'
  | '/brand'
  | '/technology'
  | '/jetourlife'
  | '/jetourfamily'
  | '/ourjourney'
  | '/news'
  | '/moments'
  | '/jma'
  | '/contactus'
  | '/globalnetwork'
  | '/faqs'
  | '/privacypolicy'
  | '/cookie';

export interface VehicleColor {
  label: string;
  value: string;
  color: string;
}

export interface VehicleSpecItem {
  label: string;
  value: string | number;
}

export interface FeatureSlide {
  id?: string;
  title: string;
  description?: string;
  image: string;
}

export interface VideoItem {
  title: string;
  image: string;
  video: string;
}

export interface VehicleData {
  id: VehicleId;
  series: SeriesId;
  name: string;
  subtitle: string;
  badge: string;
  heroVideo?: string;
  heroMobileVideo?: string;
  heroImage: string;
  overviewSpecs: VehicleSpecItem[];
  exteriorColors: VehicleColor[];
  interiorColors?: VehicleColor[];
  exterior3d?: {
    num: number;
    defaultColor: string;
    folder: string;
    step?: number;
    endFrame?: number;
  };
  designTitle: string;
  designSlides: FeatureSlide[];
  performanceTitle: string;
  performanceSlides: FeatureSlide[];
  experienceTitle: string;
  experienceSlides: FeatureSlide[];
  techTitle: string;
  techSlides: FeatureSlide[];
  videos?: VideoItem[];
  galleryImages?: string[];
  fullSpecs: {
    category: string;
    items: { name: string; value: string }[];
  }[];
}

export interface PartnerDealer {
  id: string;
  country: string;
  countryCode: string;
  city: string;
  region: 'Asia' | 'Europe' | 'Africa' | 'North America' | 'South America' | 'Oceania' | 'Middle East';
  company: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'Press Release' | 'Event' | 'Global Launch' | 'Brand Story';
  summary: string;
  content: string[];
  image: string;
}

export interface MomentItem {
  id: string;
  title: string;
  year: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

export interface MilestoneItem {
  year: string;
  date?: string;
  title: string;
  description: string;
  image?: string;
}
