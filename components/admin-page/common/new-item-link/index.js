import React from "react";
import { PlusIcon } from "images/custom-icons";
import css from "./style.module.css";
import Link from "components/admin-page/common/link";

const NewItemLink = ({children,path}) => {
  return (
    <Link cls={css["add-new-link"]} path={path}>
      <div className={css["add-new-button"]}>
        <div className={css["add-new-button-label"]}>{children}</div>
        <div className={css["add-new-button-icon"]}>
          <i>
            <PlusIcon />
          </i>
        </div>
      </div>
    </Link>
  );
};

export default NewItemLink;
