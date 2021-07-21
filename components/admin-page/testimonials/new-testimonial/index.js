import React from 'react'
import Form from 'components/admin-page/testimonials/testimonial-form'
import { useTestimonials } from "hooks/useTestimonials";

const NewTestimonial = () => {
    const {create,isLoading} = useTestimonials()
    return (
        <Form onSubmit={create} isLoading={isLoading}/>
    )
}

export default NewTestimonial
