
import { usePartnersInfo, useSingleItem } from "hooks/usePartnerInfo";
import Form from 'components/admin-page/our-partners/partner-form'

const EditPersonForm = () => {
  const { updatePartnerInfo, isLoading } = usePartnersInfo();
const {data}= useSingleItem()


  const onSubmit = ({image,...params}) => {
    updatePartnerInfo({ ...params, image: image[0] });
  };
  return (
    <Form values={data?.[0]} onSubmit={onSubmit} isLoading={isLoading } />
  );
};

export default EditPersonForm;
