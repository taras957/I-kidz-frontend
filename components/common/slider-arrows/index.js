import { PrevIcon, NextIcon } from 'images/custom-icons';

export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <NextIcon />
    </div>
  );
}

export function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={className}
      style={{ display: 'block', background: 'transparent' }}
      onClick={onClick}
    >
      <PrevIcon />{' '}
    </div>
  );
}
