import {
  IPartner,
  IPartnerData,
  IPartnerTranslation,
} from './interfaces/partner';

export class Partner implements IPartner {
  readonly imgPath: string;
  readonly isActive: boolean;
  readonly link: string;
  readonly id: string;
  public translations: {
    eng: IPartnerTranslation;
    ua: IPartnerTranslation;
    rus: IPartnerTranslation;
  };
  constructor(params: IPartnerData) {
    this.imgPath = params.img_path;
    this.isActive = params.is_active;
    this.link = params.link;
    this.id = params._id;
    this.translations = params.translations;
  }
}
