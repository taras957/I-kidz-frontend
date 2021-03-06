import React, { FC, ReactNode } from 'react';
import { PlusIcon } from 'images/custom-icons';
import css from './style.module.css';
import Link from 'components/admin-page/common/link';

interface IItemLinkProps {
  children: ReactNode;
  path: string;
}

const NewItemLink: FC<IItemLinkProps> = ({
  children,
  path,
}: IItemLinkProps) => {
  return (
    <Link cls={css['add-new-link']} path={path}>
      <div className={css['add-new-button']}>
        <div className={css['add-new-button-label']}>{children}</div>
        <div className={css['add-new-button-icon']}>
          <i>
            <PlusIcon />
          </i>
        </div>
      </div>
    </Link>
  );
};

export default NewItemLink;
