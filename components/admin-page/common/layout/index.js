import React from 'react'
import AdminNavigation from 'components/admin-page/admin-navigation'
import css from './style.module.css'
const AdminLayout = ({children}) => {
    return (
        <div className={css['admin-layout-grid']}>
            <div className={css['top-bar']} ></div>
            <div className={css['side-nav']}>
                <AdminNavigation />
            </div>
            <div className={css['content']}>{children}</div>
        </div>
    )
}

export default AdminLayout
