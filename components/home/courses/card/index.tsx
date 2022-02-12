import React, { FC } from 'react';
import cx from 'classnames';
import { ICourseWithTranslation } from '../courseWithTranslation.interface';
import css from './style.module.css';

interface ICardProps {
  course: ICourseWithTranslation;
}
const Card: FC<ICardProps> = (props: ICardProps) => {
  const { course } = props;

  const path = `${process.env.NEXT_PUBLIC_API}/${course.path}`;
  return (
    <li key={course.description} className={css.card}>
      <div
        className={`${css.ccard} ${css[' card__side']} ${css[' card__side--front']}`}
      >
        <div>
          <div>
            <img className={css.cimg} src={path} alt="course image" />
          </div>
          <h4 className={css.cname}>{course.title}</h4>
          <div className={css.cdesc}>{course.subtitle}</div>
          <div className={css.cbord}></div>
          <p className={cx(css['card-text'])}>{course.description}</p>
        </div>

        <div>
          <div className={`${css['cname ']} ${css.cprice}`}>{course.price}</div>
          <div className={`${css.cage} ${css[' cdur']}`}>{course.duration}</div>
        </div>
      </div>
    </li>
  );
};

export default Card;
