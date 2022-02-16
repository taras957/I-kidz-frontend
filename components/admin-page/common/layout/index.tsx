import React, { FC } from 'react';
import AdminNavigation from 'components/admin-page/admin-navigation';
import LanguageSelect from 'components/common/language-select';
import { useUser } from 'context/auth-provider';
import { LogOutIcon, Home } from 'images/custom-icons';

import css from './style.module.css';
const AdminLayout: FC = ({ children }) => {
  const { user, logOut, moveHome } = useUser();

  return (
    <div className={css['admin-layout-grid']}>
      <div className={css['top-bar']}>
        <button onClick={moveHome} className={css['header-btn']}>
          <Home />
        </button>
        <div className={css['user-name']}>{user.name}</div>
        <div className={css['language-select-wrapper']}>
          <LanguageSelect />
        </div>
        <div className={css['language-select-wrapper']}>
          <button onClick={logOut} className={css['header-btn']}>
            <LogOutIcon />
          </button>
        </div>
      </div>
      <div className={css['side-nav']}>
        <AdminNavigation />
      </div>
      <div className={css['content']}>{children}</div>
    </div>
  );
};

export default AdminLayout;
