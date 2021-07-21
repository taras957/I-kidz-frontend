
import { useTeamPersons } from "hooks/useTeamPersons";

import PersonForm from 'components/admin-page/our-team/person-form'





const NewPersonForm = () => {
  const { createPerson, isLoading } = useTeamPersons();


  const onSubmit = ({image,...params}) => {
    createPerson({ ...params, image: image[0] });
  };
  
  return (
    <PersonForm onSubmit={onSubmit} isLoading={isLoading } />
  );
};

export default NewPersonForm;
