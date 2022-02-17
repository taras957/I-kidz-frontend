import React, { useRef } from 'react';

import { useTranslation } from 'react-i18next';
import { useResizeObserver } from 'hooks/useResizeObserver';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from 'components/common/slider-arrows';

import { client } from 'utils/api-client';
import { useQuery } from 'react-query';
import css from './style.module.css';

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

interface IPhoto {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}
interface IPhotosResponse {
  photos: {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: IPhoto[];
  };
}

const getPhotos = async (): Promise<IPhoto[] | undefined> => {
  const photoURL = process.env.NEXT_PUBLIC_FLIKR_API_URL;
  const flikrApiKey = process.env.NEXT_PUBLIC_FLIKR_API_KEY;
  const flikruserId = process.env.NEXT_PUBLIC_FLIKR_USER_ID;
  const query = `flickr.people.getPhotos&api_key=${flikrApiKey}&user_id=${flikruserId}`;
  const url = `${photoURL}${query}&format=json&nojsoncallback=?`;
  const res = await client<IPhotosResponse>(url, { url });

  return res.data.photos.photo;
};

const Gallery = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const [width] = useResizeObserver(ref);

  const { data = [], isError } = useQuery<IPhoto[] | null>('photos', getPhotos);

  if (isError) {
    return <div> Sorry Happen Smth Bad reload the page </div>;
  }

  return (
    <section ref={ref} className={css.root}>
      <h5 className={css['section-title']}> {t('gallery.title')} </h5>

      {width > 1280 ? (
        <div className={css.container}>
          {data.map((photo) => {
            const imgPath = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            return (
              <figure key={photo.id} className={css.card}>
                <img src={imgPath} alt="gallery photo" className={css.icon} />
              </figure>
            );
          })}
        </div>
      ) : (
        <Slider {...settings}>
          {data.map((photo) => {
            const imgPath = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            return (
              <div key={photo.id}>
                <div className={css.card}>
                  <img src={imgPath} alt="gallery photo" />
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
