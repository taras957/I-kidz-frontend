import React from 'react'
import TestimonialForm from 'components/admin-page/testimonials/testimonial-form'
import {useTestimonials, useSingleTestimonial} from 'hooks/useTestimonials'
const EditForm = () => {
    const {data} = useSingleTestimonial()
    const {update, isLoading} = useTestimonials()
    return (
        <div>
         <TestimonialForm values={data?.[0]} onSubmit={update}  isLoading={isLoading}/>   
        </div>
    )
}

export default EditForm
