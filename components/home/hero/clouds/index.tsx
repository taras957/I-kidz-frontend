import React, { useState, useEffect } from 'react';
import css from './style.module.css';

const FloatingClouds = () => {
  return (
    <>
      <div id={css['clouds']}>
        <div className={`${css['cloud']} ${css['x1']}`}></div>
        <div className={`${css['cloud']} ${css['x2']}`}></div>
        <div className={`${css['cloud']} ${css['x3']}`}></div>
        <div className={`${css['cloud']} ${css['x4']}`}></div>
        <div className={`${css['cloud']} ${css['x5']}`}></div>
      </div>
    </>
  );
};

export default FloatingClouds;
