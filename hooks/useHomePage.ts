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
import { useQuery } from 'react-query';
import { parseTranslation } from 'utils/parse-translation';
import { bootstrapApp } from '../pages';

const flatten = {
  categories: [],
  courses: [],
  contacts: {},
  hero: null,
  members: [],
  partners: [],
  testimonials: [],
};

export function useHomePage() {
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  const {
    data: projectInfo,
    isLoading,
    isError,
  } = useQuery<IProjectBootstrap, Error>(projectBootstrapQuery, bootstrapApp, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

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
      courses: parseTranslation<ICourse, ICourseTranslation>(courses, language),
      hero: hero[language],
      members: parseTranslation<iTeamMember, ITeamMemberTranslation>(
        members,
        language
      ),
      partners: parseTranslation<IPartner, IPartnerTranslation>(
        partners,
        language
      ),
      testimonials: parseTranslation<ITestimonial, ITestimonialTranslation>(
        testimonials,
        language
      ),
      isError,
      isLoading,
    };
  }

  return { ...flatten, isError, isLoading };
}
