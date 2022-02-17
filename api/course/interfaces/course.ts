export interface ICourseData {
  category: string;
  is_active: boolean;
  path: string;
  translations: {
    eng: ICourseTranslation;
    rus: ICourseTranslation;
    ua: ICourseTranslation;
  };
  _id: string;
}
export type translationsType = 'ua' | 'eng' | 'rus';
export interface ICourse {
  category: string;
  isActive: boolean;
  path: string;
  translations: { [key in translationsType]: ICourseTranslation };
  id: string;
}
export interface ICourseTranslation {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
}
