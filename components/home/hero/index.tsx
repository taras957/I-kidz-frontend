import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import FloatingClouds from 'components/home/hero/clouds';
import Button from 'components/common/button';
import { TelegramIcon } from 'images/custom-icons';
import OpenModalButton from 'components/common/modal/open-modal';
import { useHomePage } from 'hooks/useHomePage';

import cx from 'classnames';
import css from './style.module.css';

const Hero = () => {
  const { hero } = useHomePage();

  const textInfo = hero;

  const [hiddenRef, setHiddenRef] = useState<HTMLButtonElement | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    if (!hiddenRef) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          console.log('Element has just become not visible in screen', entries);
          setIsFlying(true);
        } else {
          setIsFlying(false);
        }
      },
      { threshold: [0] }
    );

    observer.observe(hiddenRef);
  }, [hiddenRef]);

  const formatTitle = () => {
    let titleText = textInfo!.title;
    const firstWord = titleText.split(' ')[0];
    titleText = titleText.replace(firstWord, ' ');
    return (
      <>
        <span className={css['first-word-wrap']}>{firstWord}</span>
        {titleText}
      </>
    );
  };

  return (
    <section data-testid="hero" className={css.root}>
      {!isFlying ? <FloatingClouds /> : null}
      <div>
        <h1 className={`${css.title} ${css.mt}`}>{formatTitle()}</h1>
        <p className={css.subtitle}>{textInfo.sub_title}</p>
        {isFlying ? (
          <OpenModalButton>
            <Button
              styles={cx(
                css.tada,
                css['button-text'],
                css.animated,
                css.infinite,
                css['flying-btn']
              )}
            >
              {textInfo.button}
              <div className={css.icon}>
                <TelegramIcon />
              </div>
            </Button>
          </OpenModalButton>
        ) : null}
        <OpenModalButton>
          <Button setRef={(ref) => setHiddenRef(ref)}>
            <p className={css['button-text']}> {textInfo.button}</p>
            <div className={css.icon}>
              <TelegramIcon />
            </div>
          </Button>
        </OpenModalButton>
      </div>
      <div className={css['float-hero-boy']}>
        <Image
          src="/images/hero-boy.png"
          alt="boy with computer"
          width="615"
          height="515"
        />
      </div>
    </section>
  );
};

export default Hero;
