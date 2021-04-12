import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import { useResizeObserver } from "hooks/useResizeObserver";
import css from "./style.module.css";

const mock = [
  {
    name: "Олена",
    position: "Викладач курсу Scretch",
    img: `https://via.placeholder.com/300.png/09f/fff`,
    workplace: "Google",
  },
  {
    name: "Олена",
    position: "Викладач курсу Scretch",
    img: `https://via.placeholder.com/300.png/09f/fff`,
    workplace: "Google",
  },
  {
    name: "Олена",
    position: "Викладач курсу Scretch",
    img: `https://via.placeholder.com/300.png/09f/fff`,
    workplace: "Google",
  },
  {
    name: "Олена",
    position: "Викладач курсу Scretch",
    img: `https://via.placeholder.com/300.png/09f/fff`,
    workplace: "Google",
  },
  {
    name: "Олена",
    position: "Викладач курсу Scretch",
    img: `https://via.placeholder.com/300.png/09f/fff`,
    workplace: "Google",
  },
];
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
const Team = () => {
  const ref = useRef(null);

  const [width] = useResizeObserver(ref);

  return (
    <section ref={ref} className={css["root"]}>
      <h2 className={css["title"]}>Наша команда</h2>
      {width > 700 ? (
        <ul className={css["cards"]}>
          {mock.map((c) => {
            return (
              <li className={css["card"]}>
                <div className={css["avatar-wrapper"]}>
                  <img
                    src={c.img}
                    width={80}
                    height={80}
                    style={{ borderRadius: "50% 50% 50% 5px" }}
                  />
                </div>
                <p className={css["name"]}>{c.name}</p>
                <p className={css["position"]}>{c.position}</p>
                <blockquote className={css["workplace"]}>
                  {c.workplace}
                </blockquote>
              </li>
            );
          })}
        </ul>
      ) : (
        <Slider {...settings}>
          {mock.map((c) => {
            return (
              <div>
                <div className={css["card"]}>
                  <div className={css["avatar-wrapper"]}>
                    <img
                      src={c.img}
                      width={80}
                      height={80}
                      style={{ borderRadius: "50% 50% 50% 5px" }}
                    />
                  </div>
                  <p className={css["name"]}>{c.name}</p>
                  <p className={css["position"]}>{c.position}</p>
                  <blockquote className={css["workplace"]}>
                    {c.workplace}
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
