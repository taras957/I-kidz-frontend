import React, { useRef } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";

import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import css from "./style.module.css";

const mock = [
  {
    name: "Вінницька торгово-промислова палата",
    img: `/images/s6i4.jpeg`,
    link:'https://cci.vn.ua/'
  },
  {
    name: "Beetroot Academy",
    img: `/images/s6i1.jpg`,
        link:'https://beetroot.academy/ru/'

  },
  {
    name: "Подільська агенція регіонального розвитку",
    img: `/images/s6i2.png`,
            link:'http://pard.org.ua/'

  },
  {
    name: "NotFound",
    img: `/images/s6i3.jpg`,
  },
  {
    name: "Вінницька ІТ Асоціація",
    img: `/images/s6i6.png`,
    link:"https://www.it-vn.org.ua/"
  },
];
const settings = {
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
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
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },

        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
};
const Team = () => {
  const { t } = useTranslation();


  return (
    <section  className={css["root"]}>
      <h2 className={css["title"]}>{t('friends.title')}</h2>
        <Slider {...settings}>
          {mock.map((c) => {
            return (
              <div>
              <a target='_blank' href={c.link}>
                <div className={css["card"]}>
                  <div className={css["avatar-wrapper"]}>
                    <img
                    className={css['avatar']}
                      src={c.img}
                      width={150}
                      height={150}
                    />
                  </div>
                  <p className={css["name"]}>{c.name}</p>
                </div>
                 </a>
              </div>
            );
          })}
        </Slider>
    </section>
  );
};

export default Team;
