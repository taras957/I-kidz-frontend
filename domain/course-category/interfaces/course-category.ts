export interface ICouseCategoryOption {
  label: string;
  value: string;
}
export interface ICourseCategory {
  eng: ICouseCategoryOption;
  rus: ICouseCategoryOption;
  ua: ICouseCategoryOption;
  id: string;
}
export interface ICourseCategoryData {
  eng: ICouseCategoryOption;
  rus: ICouseCategoryOption;
  ua: ICouseCategoryOption;
  _id: string;
}
