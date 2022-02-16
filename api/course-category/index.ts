import {
  ICourseCategory,
  ICourseCategoryData,
  ICouseCategoryOption,
} from './interfaces/course-category';

export class CourseCategory implements ICourseCategory {
  readonly eng: ICouseCategoryOption;
  readonly rus: ICouseCategoryOption;
  readonly ua: ICouseCategoryOption;
  readonly id: string;

  constructor(params: ICourseCategoryData) {
    this.eng = params.eng;
    this.ua = params.ua;
    this.rus = params.rus;
    this.id = params._id;
  }
}
