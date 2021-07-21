import React from "react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import { useTestimonials, useSingleTestimonial } from "hooks/useTestimonials";
import { useTranslation } from "react-i18next";
import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import css from "./style.module.css";

const defaultValue = {
  description: "Переклад Відсутній",
  title: "Переклад Відсутній",
};

const Testimonials = () => {
  const queryClient = useQueryClient();

  const projectInfo = queryClient?.getQueryData(
    projectBootstrapQuery
  );
  const  { testimonials: data } =projectInfo || {testimonials:[] }
  const { i18n } = useTranslation();

  const { language } = i18n;
  const activeItems = data?.filter((node) => node.is_active);
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <section className={css["testimonial"]}>
      <Slider {...settings}>
        {activeItems?.map((node) => {
          const { description, title } =
            node.translations[language] || defaultValue;
          return (
            <div className={css["sd_master_wrapper"]}>
              <div className={css["sdtestBg2"]}></div>
              <div className={css["sdtestBg3"]}></div>
              <div className={css["slideshow"]}>
                <div className={css["content"]}>
                  <div className={css["btnNtxt"]}>
                    <div className={css["sdAllContent"]}>
                      <div className={css["sd_scroll"]}>
                        <h1 className={css["sdCustomSliderHeadig"]}>
                          {description}
                        </h1>
                      </div>
                      <p className={css["SdClientName"]}>{title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Testimonials;
