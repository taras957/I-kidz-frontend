import React from 'react'
import Layout from "components/admin-page/common/layout";
import EditForm from 'components/admin-page/testimonials/edit-testimonial'
import { AuthProvider } from "context/auth-provider";

const EditTestimonial = () => {
    return (
        <AuthProvider>
        <Layout>
           <EditForm /> 
        </Layout>
        </AuthProvider>
    )
}

export default EditTestimonial
