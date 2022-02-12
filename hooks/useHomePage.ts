import {
  ICourse,
  ICourseTranslation,
  IPartner,
  IPartnerTranslation,
  IProjectBootstrap,
  iTeamMember,
  ITeamMemberTranslation,
  ITestimonial,
  ITestimonialTranslation,
} from 'interfaces/home';
import { projectBootstrapQuery } from 'queries';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';

let flatten = {
  categories: [],
  courses: [],
  hero: null,
  members: [],
  partners: [],
  testimonials: [],
};

type languages = 'ua' | 'rus' | 'eng';
interface ITranslationParse<T> {
  translations: {
    [key in languages]: T;
  };
}

export function useHomePage() {
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const queryClient = useQueryClient();

  const projectInfo = queryClient.getQueryData<IProjectBootstrap>(
    projectBootstrapQuery
  );

  function parseTranslation<T extends ITranslationParse<K>, K>(list: T[]) {
    return list.map(({ translations, ...course }) => ({
      ...course,
      ...translations[language],
    }));
  }

  if (projectInfo) {
    const {
      HomeInfo,
      categories,
      members,
      partners,
      testimonials,
      ...restInfo
    } = projectInfo;
    const { courses, hero } = HomeInfo[0];

    return {
      ...restInfo,
      ...HomeInfo[0],
      categories: categories.map((c) => ({ ...c[language] })),
      courses: parseTranslation<ICourse, ICourseTranslation>(courses),
      hero: hero[language],
      members: parseTranslation<iTeamMember, ITeamMemberTranslation>(members),
      partners: parseTranslation<IPartner, IPartnerTranslation>(partners),
      testimonials: parseTranslation<ITestimonial, ITestimonialTranslation>(
        testimonials
      ),
    };
  }

  return flatten;
}
