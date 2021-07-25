import React from "react";
import { useTranslation } from "react-i18next";
// import { projectBootstrapQuery } from "queries/index";
// import { useQueryClient } from "react-query";

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

const Development = () => {
  const { t } = useTranslation();
  // const queryClient = useQueryClient();

  // const { HomeInfo } = queryClient.getQueryData(projectBootstrapQuery);
  return (
    <section id="development" className={css["root"]}>
      <h5 className={css["section-title"]}> {t("development.title")} </h5>
      <ul className={css["cards"]}>
        {config.map((c) => {
          return (
            <li key={c.key1} className={css["card"]}>
              <div className={css["icon-wrapper"]}>
                <img alt='development pic' src={c.src} className={css["icon"]} />
              </div>
              <p className={css["title"]}>{t(c.key1)} </p>
              <p className={css["subtitle"]}>{t(c.key2)} </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Development;
