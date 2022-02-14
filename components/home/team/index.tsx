import React, { useRef } from 'react';
import Slider from 'react-slick';
import { NextArrow, PrevArrow } from 'components/common/slider-arrows';

import { useResizeObserver } from 'hooks/useResizeObserver';
import css from './style.module.css';
import { useHomePage } from 'hooks/useHomePage';
import ErrorBanner from '@/components/common/error-banner';

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

  const { members: teamMembers, isError } = useHomePage();

  const [width] = useResizeObserver(ref);

  if (isError) {
    return <ErrorBanner>Error While Loading. Please Reload page.</ErrorBanner>;
  }

  return (
    <section ref={ref} className={css['root']}>
      <h2 className={css['title']}>Наша команда</h2>
      {width > 700 ? (
        <ul className={css['cards']}>
          {teamMembers?.map((person) => {
            const path = `${process.env.NEXT_PUBLIC_API}/${person.img_path}`;
            return (
              <li key={person._id} className={css['card']}>
                <div className={css['avatar-wrapper']}>
                  <img
                    src={path}
                    width={80}
                    height={80}
                    style={{ borderRadius: '50% 50% 50% 5px' }}
                    alt="photo"
                  />
                </div>
                <p className={css['name']}>{person.title}</p>
                <p className={css['position']}>{person.position}</p>
                <p className={css['workplace']}>{person.description}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <Slider {...settings}>
          {teamMembers?.map((person) => {
            const path = `${process.env.NEXT_PUBLIC_API}/${person?.img_path}`;
            return (
              <div key={person._id}>
                <div className={css['card']}>
                  <div className={css['avatar-wrapper']}>
                    <img
                      src={path}
                      width={80}
                      height={80}
                      style={{ borderRadius: '50% 50% 50% 5px' }}
                      alt="photo"
                    />
                  </div>
                  <p className={css['name']}>{person.title}</p>
                  <p className={css['position']}>{person.position}</p>
                  <blockquote className={css['workplace']}>
                    {person.description}
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
