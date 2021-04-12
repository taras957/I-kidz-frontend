import React from 'react'
import css from './style.module.css'
const config = [
    {title:"Розділи сайту",
    children: [
        {
    title:'Про нас',
    link:'#'
},
    {
    title:'Розвиток',
    link:'#'
},
    {
    title:'Курси',
    link:'#'
},
    {
    title:'Контакти',
    link:'#'
}
    ]
},
    {title:"Категорії занять за віком",
    children: [
        {
    title:'Вікова категорія 5-7',
    link:'#'
},
    {
    title:'Вікова категорія 7-9',
    link:'#'
},{
    title:'Вікова категорія 7-10',
    link:'#'
},
    {
    title:'Вікова категорія 7-15',
    link:'#'
},
    {
    title:'Вікова категорія 8-12',
    link:'#'
},
  {
    title:'Вікова категорія 8-15',
    link:'#'
},
    {
    title:'Вікова категорія 5-15',
    link:'#'
},
    


    ]
},

]
const Footer = ({children}) => {
    return (
       
        <footer className={css['footer']}>
         
        {children(

            <div className={css['grid']}>
                {
                    config.map((node) => {

              return  <div>
                    <p className={css['footer-title']}>{node.title}</p>
                     <ul className={css['links']}>
                             
            {node.children.map((c)=> {
                    return    <li className={css['social-item']}>
                    <a  href={c.link}> {c.title} </a>
                </li>
            })}</ul>
                </div>
            } )
                }
                <p className ={css['copyrights']}>&#169; All rights reserved. IKiIDZ 2016</p>

            </div>
        )
           
        }
        </footer>
    )
}

export default Footer
