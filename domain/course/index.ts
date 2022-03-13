import { ICourse, ICourseData, ICourseTranslation } from './interfaces/course';

export class Course implements ICourse {
  readonly category: string;
  readonly isActive: boolean;
  readonly path: string;
  translations: {
    eng: ICourseTranslation;
    rus: ICourseTranslation;
    ua: ICourseTranslation;
  };
  readonly id: string;

  constructor(params: ICourseData) {
    this.category = params.category;
    this.isActive = params.is_active;
    this.path = params.path;
    this.translations = params.translations;
    this.id = params._id;
  }
}
