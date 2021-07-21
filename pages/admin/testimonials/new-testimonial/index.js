import React from 'react'
import NewTestimonialForm from 'components/admin-page/testimonials/new-testimonial'
import Layout from "components/admin-page/common/layout";
import { AuthProvider } from "context/auth-provider";

const NewTestimonial = () => {
    return (
        <AuthProvider>
        <Layout>
            <NewTestimonialForm  />
        </Layout>
        </AuthProvider>
    )
}

export default NewTestimonial
