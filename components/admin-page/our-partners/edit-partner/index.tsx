import {
  IUpdatePartnerData,
  usePartnerMethods,
  useSingleItem,
} from 'api/partner/data';
import Form from 'components/admin-page/our-partners/partner-form';

const EditPersonForm = () => {
  const { updatePartnerInfo, isUpdateLoading } = usePartnerMethods();
  const { data } = useSingleItem();

  const onSubmit = ({ image, ...params }: IUpdatePartnerData) => {
    console.log(params);
    updatePartnerInfo({ ...params, image });
  };
  return <Form values={data} onSubmit={onSubmit} isLoading={isUpdateLoading} />;
};

export default EditPersonForm;
