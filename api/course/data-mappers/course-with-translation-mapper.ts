import { parseTranslation } from 'utils/parse-translation';
import { useTranslation } from 'react-i18next';
import { ICourse, ICourseTranslation } from '../interfaces/course';
import { useCourseInfo } from '../data';

export function useCourseTranslation() {
  const { data } = useCourseInfo();
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const courses = parseTranslation<ICourse, ICourseTranslation>(data, language);

  return courses;
}
