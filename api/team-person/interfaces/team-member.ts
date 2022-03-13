export interface ITeamMemberTranslation {
  title: string;
  position: string;
  description: string;
}
export interface iTeamMember {
  imgPath: number;
  isActive: boolean;
  id: string;
  translations: {
    ua: ITeamMemberTranslation;
    rus: ITeamMemberTranslation;
    eng: ITeamMemberTranslation;
  };
}
export interface iTeamMemberData {
  img_path: number;
  is_active: boolean;
  _id: string;
  translations: {
    ua: ITeamMemberTranslation;
    rus: ITeamMemberTranslation;
    eng: ITeamMemberTranslation;
  };
}
