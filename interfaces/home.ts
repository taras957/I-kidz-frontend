import { IPartner } from 'domain/partner/interfaces/partner';

export interface IContacts {
  email: string;
  facebook: string;
  instagram: string;
  tel: {
    responsible: string;
    tel_number: string;
  };
}

export interface ICourseTranslation {
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
}
export interface ICourse {
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

interface iHero {
  button: string;
  sub_title: string;
  title: string;
}

export interface IHomeInfo {
  contacts: IContacts;
  courses: ICourse[];
  development: [];
  hero: {
    eng: iHero;
    rus: iHero;
    ua: iHero;
  };
  ourTeam: [];
  id: string;
}

interface ICouseCategoryOption {
  label: string;
  value: string;
}
export interface ICourseCategory {
  eng: ICouseCategoryOption;
  rus: ICouseCategoryOption;
  ua: ICouseCategoryOption;
  _id: string;
}

export interface ITestimonialTranslation {
  title: string;
  date: string;
  description: string;
}
export interface ITestimonial {
  is_active: boolean;
  _id: string;
  translations: {
    ua: ITestimonialTranslation;
    rus: ITestimonialTranslation;
    eng: ITestimonialTranslation;
  };
}

export interface IProjectBootstrap {
  HomeInfo: IHomeInfo[];
  contacts: IContacts[];
  categories: ICourseCategory[];
  members: iTeamMember[];
  partners: IPartner[];
  testimonials: ITestimonial[];
}

export type TProjectBootstrap = IProjectBootstrap | undefined;
