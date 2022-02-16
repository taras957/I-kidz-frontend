import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';
import css from './style.module.css';
const config = [
  {
    name: 'Basic Info',
    href: '/admin/basic',
  },
  {
    name: 'Courses',
    href: '/admin/courses',
  },
  // {
  //     name:'Development',
  //     href:"/admin/developments"
  // },
  {
    name: 'Our Friends',
    href: '/admin/partners',
  },
  {
    name: 'Team',
    href: '/admin/team',
  },
  {
    name: 'Testimonials',
    href: '/admin/testimonials',
  },
];

const AdminNavigation = () => {
  const router = useRouter();
  return (
    <nav className={css['nav-container']}>
      <ul className={css['navigation']}>
        {config.map((node) => {
          return (
            <li key={node.name} className={css['nav-item']}>
              <Link href={node.href} replace>
                <a
                  className={cx(css['nav-item_link'], {
                    [css['active']]: router.asPath.includes(node.href),
                  })}
                >
                  {node.name}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default AdminNavigation;
