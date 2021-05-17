import React from "react";
import { PlusIcon } from "images/custom-icons";
import css from "./style.module.css";
import Link from "components/admin-page/common/link";

const NewCourse = () => {
  return (
    <Link cls={css["add-new-link"]} path={"courses/new-course"}>
      <div className={css["add-new-button"]}>
        <div className={css["add-new-button-label"]}>Додати Курс</div>
        <div className={css["add-new-button-icon"]}>
          <i>
            <PlusIcon />
          </i>
        </div>
      </div>
    </Link>
  );
};

export default NewCourse;
