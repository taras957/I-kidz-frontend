import Image from "next/image";
import Link from "next/link";
import {useContentWidth} from 'context/content-width'
import Navigation from 'components/layout/header/nav'
import BurgerNavigation from 'components/layout/header/burger-nav'
import css from "./style.module.css";

const Header = () => {
const width =useContentWidth()
  return  <div className={css.root}>
  { width > 1024 ?  
    <div className={css["wrapper"]}>
        <div className={css.logo}>
          <Link href="/">
            <a className={css["nav-link"]}>
              <Image
                src="/images/logo.png"
                alt="logo"
                width="115"
                height="45"
              />
            </a>
          </Link>
        </div>
      <Navigation />
      </div> : <BurgerNavigation />
  }
    </div>   
    
    
   
   
  
};

export default Header;
