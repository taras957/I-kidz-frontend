import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "images/custom-icons";
import cx from "classnames";
import css from "./style.module.css";

const Card = (props) => {
  const { c } = props;
  const { t } = useTranslation();
  const [state, setState] = useState(false);

  const handleAccordion = () => {
    setState(!state);
  };
  return (
    <li key={c.description} className={css["card"]}>
      <div
        className={`${css["ccard"]} ${css[" card__side"]} ${css[" card__side--front"]}`}
      >
        <div>
        <div>
          <img className={css["cimg"]} src={c.src} alt="scratch jr" /></div>
          <div className={css["cname"]}>{t(c.title)}</div>
          <div className={css["cdesc"]}>{t(c.subtitle)}</div>
          <div className={css["cbord"]}></div>
          <p
            className={cx(css["card-text"], {
              [css["expanded-description"]]: state,
            })}
          >
            {t(c.description)}
            <p className={cx({ [css["blur"]]: !state })}></p>
          </p>
        </div>
        {t(c.description).length ? (
          <div onClick={handleAccordion}>
            <ArrowIcon cl={cx(css["arrow"], { [css["arrow-up"]]: state })} />
          </div>
        ) : null}
        <div>
          <div className={`${css["cname "]} ${css["cprice"]}`}>
            {t(c.price)}
          </div>
          <div className={css["cage"]}>Вік 5-7 років</div>
          <div className={`${css["cage"]} ${css[" cdur"]}`}>
            {t(c.duration)}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
