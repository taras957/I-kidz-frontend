import { useTranslation } from 'react-i18next';
import { useCourseCategories } from 'hooks/useHomePageInfo';

export function useCourseCategoryMapper() {
  const { categories } = useCourseCategories();
  const { i18n } = useTranslation();

  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const mappedCategories = categories.map((c) => ({ ...c[language] }));

  return mappedCategories;
}
