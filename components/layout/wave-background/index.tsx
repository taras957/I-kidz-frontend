import { useState, useLayoutEffect } from 'react';
import css from './style.module.css';
const WaveBackground = ({ children }) => {
  const [ref, setRef] = useState(null);
  const [path, setPath] = useState(' ');

  function getClipPathString(w, h) {
    let width_px = w;
    let height_px = h;
    let offset = 100;
    let amplitude = 30;
    let frequency = 1.2;
    let units = (frequency * width_px) / 100;

    let clipPathString = 'polygon(100% 0%, 0% 0% ';

    for (let i = 0; i <= 100; i++) {
      let val = offset + amplitude * Math.cos(i / units);
      val = (Math.floor(val) / height_px) * 100;
      clipPathString += `, ${i}% ${val}% `;
    }
    return (clipPathString += ');');
  }
  useLayoutEffect(() => {
    if (ref) {
      const w = ref.clientWidth;
      const h = ref.clientHeight;

      setPath(getClipPathString(w, h));
    }
  }, [ref]);
  return (
    <div ref={(r) => setRef(r)} className={css['background']}>
      {children}
    </div>
  );
};

export default WaveBackground;
