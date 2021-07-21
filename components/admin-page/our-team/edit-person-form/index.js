
import { useTeamPersons,useSinglePerson } from "hooks/useTeamPersons";
import PersonForm from 'components/admin-page/our-team/person-form'

const EditPersonForm = () => {
  const { updatePerson, isLoading } = useTeamPersons();
const {data}= useSinglePerson()


  const onSubmit = ({image,...params}) => {
    updatePerson({ ...params, image: image[0] });
  };
  return (
    <PersonForm values={data?.[0]} onSubmit={onSubmit} isLoading={isLoading } />
  );
};

export default EditPersonForm;
