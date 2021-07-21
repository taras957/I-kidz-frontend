import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import { useTranslation } from "react-i18next";
import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import { useResizeObserver } from "hooks/useResizeObserver";
import css from "./style.module.css";

const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const defaultPackage = {
  title: "Переклад відсутній",
  position: "Переклад відсутній",
  description: "Переклад відсутній",
};
const Team = () => {
  const ref = useRef(null);

  const queryClient = useQueryClient();

  const projectInfo = queryClient.getQueryData(
    projectBootstrapQuery
  );
const  { members: teamMembers } = projectInfo || {members:[] }
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [width] = useResizeObserver(ref);
  console.log(teamMembers);
  return (
    <section ref={ref} className={css["root"]}>
      <h2 className={css["title"]}>Наша команда</h2>
      {width > 700 ? (
        <ul className={css["cards"]}>
          {teamMembers?.map((person) => {
            const path = `${process.env.NEXT_PUBLIC_API}/${person.img_path}`;
            const translated = person.translations[language] || defaultPackage;
            return (
              <li className={css["card"]}>
                <div className={css["avatar-wrapper"]}>
                  <img
                    src={path}
                    width={80}
                    height={80}
                    style={{ borderRadius: "50% 50% 50% 5px" }}
                  />
                </div>
                <p className={css["name"]}>{translated.title}</p>
                <p className={css["position"]}>{translated.position}</p>
                <p className={css["workplace"]}>{translated.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <Slider {...settings}>
          {teamMembers?.map((person) => {
            const path = `${process.env.NEXT_PUBLIC_API}/${person?.img_path}`;
            const translated = person.translations[language] || defaultPackage;
            return (
              <div>
                <div className={css["card"]}>
                  <div className={css["avatar-wrapper"]}>
                    <img
                      src={path}
                      width={80}
                      height={80}
                      style={{ borderRadius: "50% 50% 50% 5px" }}
                    />
                  </div>
                  <p className={css["name"]}>{translated.title}</p>
                  <p className={css["position"]}>{translated.position}</p>
                  <blockquote className={css["workplace"]}>
                    {translated.description}
                  </blockquote>
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </section>
  );
};

export default Team;
