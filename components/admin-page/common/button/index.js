import React from 'react'
import cx from 'classnames'
import css from './style.module.css'

const Button = (props) => {
    const {  children,cls, onClick, color='#4285F4' }=props
    return (
        <button className={cx(css['button'], cls)} style={{backgroundColor:color}} onClick={onClick}>
           {children} 
        </button>
    )
}

export default Button
