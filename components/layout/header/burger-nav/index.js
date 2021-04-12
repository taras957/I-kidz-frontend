import React,{useState} from 'react'
import {Burger, CloseIcon } from "images/custom-icons";
import Navigation from 'components/layout/header/nav'
import css from './style.module.css'

const BurgerNavigation = () => {
    const [state,setState] = useState(false)
    return (
      <div className={css['burger-nav']}>
                          <button className={css['burger-btn']} onClick={ () => setState(!state)}>
  { state ? <CloseIcon /> : <Burger />  }

          </button>
          {
            state ? <Navigation  /> :null

          }
 
        </div>
    )
}
export default BurgerNavigation
