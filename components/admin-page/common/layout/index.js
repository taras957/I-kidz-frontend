import React from "react";
import AdminNavigation from "components/admin-page/admin-navigation";
import LanguageSelect from "components/common/language-select";
import { useUser } from "context/auth-provider";

import css from "./style.module.css";
const AdminLayout = ({ children }) => {
  const { user } = useUser();

  return (
    <div className={css["admin-layout-grid"]}>
      <div className={css["top-bar"]}>
        <div className={css["language-select-wrapper"]}>{user.name}</div>
        <div className={css["language-select-wrapper"]}>
          <LanguageSelect />
        </div>
      </div>
      <div className={css["side-nav"]}>
        <AdminNavigation />
      </div>
      <div className={css["content"]}>{children}</div>
    </div>
  );
};

export default AdminLayout;
