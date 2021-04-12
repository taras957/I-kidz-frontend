import React from 'react'
import LanguageSelect from "components/layout/header/language-select";
import { PhoneIcon } from "images/custom-icons";
import css from './style.module.css'
const Navigation = () => {
    return (
          <nav>
          <ul className={`${css["nav-list"]}`}>
            <li className={css["nav-item"]}>
              <a href="#" className={css["nav-link"]}>
                {" "}
                Про нас{" "}
              </a>
            </li>
            <li className={css["nav-item"]}>
              <a href="#" className={css["nav-link"]}>
                {" "}
                Розвиток
              </a>
            </li>
            <li className={css["nav-item"]}>
              <a href="#" className={css["nav-link"]}>
                {" "}
                Курси
              </a>
            </li>
            <li className={css["nav-item"]}>
              <a href="#" className={css["nav-link"]}>
                {" "}
                Контакти
              </a>
            </li>
            <li className={css["nav-item"]}>
              <a className={css["nav-link"]} href="tel:+38 (063) 99-576-09">
                <PhoneIcon cls={css['phone-icon']} /> +38 (063) 99-576-09
              </a>
            </li>
            <li className={css["nav-item"]}>
              <LanguageSelect />
            </li>
          </ul>
        </nav>
    )
}

export default Navigation
