export interface IPartnerTranslation {
  title: string;
}

export interface IPartnerData {
  img_path: string;
  is_active: boolean;
  link: string;
  _id: string;
  translations: {
    ua: IPartnerTranslation;
    rus: IPartnerTranslation;
    eng: IPartnerTranslation;
  };
}
export interface IPartner {
  imgPath: string;
  isActive: boolean;
  link: string;
  id: string;
  translations: {
    ua: IPartnerTranslation;
    rus: IPartnerTranslation;
    eng: IPartnerTranslation;
  };
}
