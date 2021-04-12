import React from "react";
import css from "./style.module.css";
import Header from "components/layout/header";

const Layout = ({ children }) => {
  return (
    <div className={css.root}>
      <Header />
      <main className={css.main}>{children}</main>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
