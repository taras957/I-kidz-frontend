import React from 'react';
import Image from 'next/image';

import { mockData } from './mock';
import css from './style.module.css';

const AboutUs = () => {
  return (
    <section id="about-us" data-testid="about-us" className={css.root}>
      <div className={css['side-pic']}>
        <Image
          src="/images/about-us-pic.png"
          alt="girl with laptop"
          width="513"
          height="484"
        />
      </div>
      <div className={css['side-content']}>
        <h2 className={css.title}>Про Нас</h2>
        <p className={css.subtitle}>{mockData.description}</p>
        <ul className={css['pros-list']}>
          {mockData.pros.map((node) => {
            return (
              <li key={node.text} className={css['pros-item']}>
                {node.text}
              </li>
            );
          })}
        </ul>
        <p className={css.motto}>{mockData.motto}</p>
      </div>
    </section>
  );
};

export default AboutUs;
