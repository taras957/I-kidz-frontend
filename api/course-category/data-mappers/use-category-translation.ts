import { useTranslation } from 'react-i18next';
import { useCourseCategories } from '../data';

export function useCategoryTranslation() {
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const categories = useCourseCategories();
  return categories.map((c) => ({ ...c[language] }));
}
