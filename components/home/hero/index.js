import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { projectBootstrapQuery } from "queries/index";
import { useQueryClient } from "react-query";

import FloatingClouds from "components/home/hero/clouds";
import Button from "components/common/button";
import { TelegramIcon } from "images/custom-icons";
import OpenModalButton from "components/common/modal/open-modal";

import cx from "classnames";
import css from "./style.module.css";

const Hero = () => {
  const { i18n } = useTranslation();

  const queryClient = useQueryClient();

  const { HomeInfo } = queryClient.getQueryData(projectBootstrapQuery);
  const { language } = i18n;
  const { button, title, sub_title } = HomeInfo[0]?.hero[language] || {
    button: " ",
    title: " ",
    sub_title: " ",
  };

  const [hiddenRef, setHiddenRef] = useState(null);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    if (!hiddenRef) return;
    const observer = new IntersectionObserver(
      function (entries) {
        // isIntersecting is true when element and viewport are overlapping
        // isIntersecting is false when element and viewport don't overlap
        if (!entries[0].isIntersecting) {
          console.log("Element has just become not visible in screen", entries);
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
    let titleText = title;
    const firstWord = titleText.split(" ")[0];
    titleText = titleText.replace(firstWord, " ");
    return (
      <>
        <span className={css["first-word-wrap"]}>{firstWord}</span>
        {titleText}
      </>
    );
  };

  return (
    <section className={css["root"]}>
      <FloatingClouds />
      <div>
        <h1 className={`${css["title"]} ${css["mt"]}`}>{formatTitle()}</h1>
        <p className={css["subtitle"]}>{sub_title}</p>
        {isFlying ? (
          <OpenModalButton>
            <Button
              styles={cx(
                css["tada"],
                css["animated"],
                css["infinite"],
                css["flying-btn"]
              )}
            >
              <p className={css["button-text"]}> {button}</p>
              <div className={css["icon"]}>
                <TelegramIcon />
              </div>
            </Button>
          </OpenModalButton>
        ) : null}
        <OpenModalButton>
          <Button setRef={setHiddenRef}>
            <p className={css["button-text"]}> {button}</p>
            <div className={css["icon"]}>
              <TelegramIcon />
            </div>
          </Button>
        </OpenModalButton>
      </div>
      <div className={css["float-hero-boy"]}>
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
