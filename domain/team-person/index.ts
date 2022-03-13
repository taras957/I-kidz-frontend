import {
  iTeamMember,
  iTeamMemberData,
  ITeamMemberTranslation,
} from './interfaces/team-member';

export class TeamMember implements iTeamMember {
  public imgPath: number;
  public isActive: boolean;
  public id: string;
  public translations: {
    ua: ITeamMemberTranslation;
    rus: ITeamMemberTranslation;
    eng: ITeamMemberTranslation;
  };

  constructor(params: iTeamMemberData) {
    this.imgPath = params.img_path;
    this.id = params._id;
    this.isActive = params.is_active;
    this.translations = params.translations;
  }
}
