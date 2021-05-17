import React from "react";
import cx from "classnames";
import css from "./style.module.css";
import Link from "next/link";

const CustomLink = (props) => {
  const { children, ...rest } = props;
  const { path, cls } = rest;
  return (
    <Link href={path}>
      <a className={cx(css["link"], cls)}>{children}</a>
    </Link>
  );
};

export default CustomLink;
