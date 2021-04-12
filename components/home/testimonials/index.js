import React from "react";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/common/slider-arrows";
import { reviews } from "./mock";
import css from "./style.module.css";

const Testimonials = () => {
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
        {reviews.map((node) => {
          const { text, name } = node;
          return (
            <div className={css["sd_master_wrapper"]}>
              <div className={css["sdtestBg2"]}></div>
              <div className={css["sdtestBg3"]}></div>
              <div className={css["slideshow"]}>
                <div className={css["content"]}>
                  <div className={css["btnNtxt"]}>
                    <div className={css["sdAllContent"]}>
                      <div className={css["sd_scroll"]}>
                        <h1 className={css["sdCustomSliderHeadig"]}>{text}</h1>
                      </div>
                      <p className={css["SdClientName"]}>{name}</p>
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
