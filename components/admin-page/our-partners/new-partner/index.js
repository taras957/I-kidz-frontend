import React from 'react'
import Form from 'components/admin-page//our-partners/partner-form'
import { usePartnersInfo } from "hooks/usePartnerInfo";

const NewPartner = () => {
    const {addPartner,isLoading} = usePartnersInfo()
    return (
        <Form onSubmit={addPartner} isLoading={isLoading}/>
    )
}

export default NewPartner
