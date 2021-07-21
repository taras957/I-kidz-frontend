import React from "react";
import { useTranslation } from "react-i18next";
import { useTestimonials } from "hooks/useTestimonials";

import Layout from "components/admin-page/common/layout";
import TestimonialsList from "components/admin-page/testimonials";
import NewItemLink from "components/admin-page/common/new-item-link";
import { AuthProvider } from "context/auth-provider";

const Testimonials = () => {
  const { i18n } = useTranslation();
  const { data } = useTestimonials();
  const { language } = i18n;
  const withTranslations = data?.map(({ translations, _id, is_active }) => ({
    _id,
    is_active,
    ...translations[language],
  }));
  return (
    <AuthProvider>
      <Layout>
        <NewItemLink path={"testimonials/new-testimonial"}> Додати</NewItemLink>
        <TestimonialsList testimonials={withTranslations} />
      </Layout>
    </AuthProvider>
  );
};

export default Testimonials;
