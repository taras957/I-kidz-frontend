import { parseTranslation } from 'utils/parse-translation';
import { useTranslation } from 'react-i18next';
import { usePartnersInfo } from '../data';
import { IPartner, IPartnerTranslation } from '../interfaces/partner';

export function usePartnerTranslation() {
  const partners = usePartnersInfo();
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const courses = parseTranslation<IPartner, IPartnerTranslation>(
    partners,
    language
  );

  return courses;
}
