import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useResizeObserver } from "hooks/useResizeObserver";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "components/common/slider-arrows";

import { client } from "utils/api-client";
import { useQuery } from "react-query";
import css from "./style.module.css";
const config = [
  {
    key1: "development.math-title",
    key2: "development.math-subtitle",
    src: "images/s4i1.png",
  },
  {
    key1: "development.english-title",
    key2: "development.english-subtitle",
    src: "images/s4i2.png",
  },
  {
    key1: "development.search-title",
    key2: "development.search-subtitle",
    src: "images/s4i3.png",
  },
  {
    key1: "development.logic-title",
    key2: "development.logic-subtitle",
    src: "images/s4i4.png",
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
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
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
const getPhotos = async () => {
  const photoURL = process.env.NEXT_PUBLIC_FLIKR_API_URL;
  const flikrApiKey = process.env.NEXT_PUBLIC_FLIKR_API_KEY;
  const flikruserId = process.env.NEXT_PUBLIC_FLIKR_USER_ID;
  const query = `flickr.people.getPhotos&api_key=${flikrApiKey}&user_id=${flikruserId}`;
  const url = `${photoURL}${query}&format=json&nojsoncallback=?`;
  const res = await client(url, { url: url });
  //  console.log(JSON.parse(res.data.photos),'query777');

  return res.data.photos.photo;
};

const Gallery = () => {
  const { t } = useTranslation();
  const ref = useRef(null);

  const [width] = useResizeObserver(ref);

  const { data } = useQuery("photos", getPhotos);

  return (
    <section ref={ref} className={css["root"]}>
      <h5 className={css["section-title"]}> {t("gallery.title")} </h5>

      {width > 1280 ? (
        <div className={css["container"]}>
          {(data || []).map((photo) => {
            const imgPath = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            return (
              <figure key={photo.id} className={css["card"]}>
                {/* <div className={css["icon-wrapper"]}> */}
                <img src={imgPath} className={css["icon"]} />
                {/* </div> */}
                {/* <p className={css["title"]}>{photo.title} </p> */}
              </figure>
            );
          })}
        </div>
      ) : (
        <Slider {...settings}>
          {(data || []).map((photo) => {
            const imgPath = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            return (
              <div>
                <div className={css["card"]}>
                  <img src={imgPath} />
                </div>
              </div>
            );
          })}
        </Slider>
      )}
    </section>
  );
};

export default Gallery;
