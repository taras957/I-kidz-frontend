import { useTranslation } from 'react-i18next';
import { parseTranslation } from 'utils/parse-translation';
import { useTeamPMembers } from '../data/repository';
import { iTeamMember, ITeamMemberTranslation } from '../interfaces/team-member';

export function useTeamMemberWithTranslation() {
  const teamMembers = useTeamPMembers() || [];
  const { i18n } = useTranslation();
  const language = i18n.language as 'eng' | 'ua' | 'rus';

  return parseTranslation<iTeamMember, ITeamMemberTranslation>(
    teamMembers,
    language
  );
}
