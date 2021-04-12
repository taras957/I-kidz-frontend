import React from 'react'
import css from './style.module.css'
const Spinner = ({isLoading}) => {
    return (
      isLoading ? <div className={css["loader-circle"]}></div> :null

    )
}

export default Spinner
