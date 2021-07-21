import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { usePartnersInfo } from "hooks/usePartnerInfo";
import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import css from "./style.module.css";

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  adaptiveHeight: true,

  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const defaultTitle = { title: " Переклад відсутній" };

const Friends = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  const queryClient = useQueryClient();

  const { partners: data } = queryClient.getQueryData(projectBootstrapQuery);

  return (
    <section className={css["root"]}>
      <h2 className={css["title"]}>{t("friends.title")}</h2>
      <Slider {...settings}>
        {data?.map((c) => {
          const withTranslations = c.translations[language];
          const path = `${process.env.NEXT_PUBLIC_API}/${c.img_path}`;
          return (
            <div>
              <a target="_blank" href={c.link}>
                <div className={css["card"]}>
                  <div className={css["avatar-wrapper"]}>
                    <img
                      className={css["avatar"]}
                      src={path}
                      // width={150}
                      height={200}
                    />
                  </div>
                  <p className={css["name"]}>
                    {withTranslations?.title || defaultTitle.title}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Friends;
