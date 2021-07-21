import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowIcon } from "images/custom-icons";
import cx from "classnames";
import css from "./style.module.css";

const Card = (props) => {
  const { course } = props;
  const { t } = useTranslation();
  const [state, setState] = useState(false);

  const handleAccordion = () => {
    setState(!state);
  };

  const path = `${process.env.NEXT_PUBLIC_API}/${course.path}`;
  console.log(course);
  return (
    <li key={course.description} className={css["card"]}>
      <div
        className={`${css["ccard"]} ${css[" card__side"]} ${css[" card__side--front"]}`}
      >
        <div>
          <div>
            <img className={css["cimg"]} src={path} alt="course image" />
          </div>
          <div className={css["cname"]}>{course.title}</div>
          <div className={css["cdesc"]}>{course.subtitle}</div>
          <div className={css["cbord"]}></div>
          <p className={cx(css["card-text"])}>
            {course.description}
            {/* <p className={cx({ [css["blur"]]: !state })}></p> */}
          </p>
        </div>
        {/* {t(course.description).length ? (
          <div onClick={handleAccordion}>
            <ArrowIcon cl={cx(css["arrow"], { [css["arrow-up"]]: state })} />
          </div>
        ) : null} */}
        <div>
          <div className={`${css["cname "]} ${css["cprice"]}`}>
            {course.price}
          </div>
          {/* <div className={css["cage"]}>Вік 5-7 років</div> */}
          <div className={`${css["cage"]} ${css[" cdur"]}`}>
            {course.duration}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
