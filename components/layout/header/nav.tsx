import React from 'react';
import LanguageSelect from 'components/common/language-select';
import { PhoneIcon } from 'images/custom-icons';

import css from './style.module.css';
import { useHomePage } from 'hooks/useHomePage';
const Navigation = () => {
  const { contacts } = useHomePage();

  const phoneNumber = contacts?.tel?.tel_number || 'n/a';
  return (
    <nav>
      <ul className={`${css['nav-list']}`}>
        <li className={css['nav-item']}>
          <a href="#about-us" className={css['nav-link']}>
            {' '}
            Про нас{' '}
          </a>
        </li>
        <li className={css['nav-item']}>
          <a href="#development" className={css['nav-link']}>
            {' '}
            Розвиток
          </a>
        </li>
        <li className={css['nav-item']}>
          <a href="#courses" className={css['nav-link']}>
            {' '}
            Курси
          </a>
        </li>
        <li className={css['nav-item']}>
          <a href="#contacts" className={css['nav-link']}>
            {' '}
            Контакти
          </a>
        </li>
        <li className={css['nav-item']}>
          <a className={css['nav-link']} href={`tel:${phoneNumber}`}>
            <PhoneIcon cls={css['phone-icon']} /> {phoneNumber}
          </a>
        </li>
        <li className={css['nav-item']}>
          <LanguageSelect />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
