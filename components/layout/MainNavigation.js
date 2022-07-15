import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../global/context/auth';
import { TabMenu } from 'primereact/tabmenu';
import Login from '../modals/Login';
import { CONSTANTS } from '../../global/constants';
import styles from './MainNavigation.module.css';
import cn from 'classnames';

export default function MainNavigation() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [displayLogin, setDisplayLogin] = useState(false);
   const auth = useContext(AuthContext);
   const router = useRouter();

   const loginButton = { label: 'Login', icon: 'pi pi-fw pi-sign-in' };
   const logoutButton = { label: 'Logout', icon: 'pi pi-fw pi-sign-out' };

   const items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Nutrient List', icon: 'pi pi-fw pi-list' },
      auth.isLoggedIn ? logoutButton : loginButton
   ];

   let mobileItems = [];
   items.forEach(item => mobileItems.push({ label: '', icon: item.icon }));

   function tabChangeHandler(event) {
      setActiveIndex(event.index);

      switch (event.index) {
         case 0:
            router.push(CONSTANTS.HOME_PAGE);
            break;
         case 1:
            router.push(CONSTANTS.NUTRIENTS_PAGE);
            break;
         case 2:
            if (auth.isLoggedIn)
               auth.logout();
            else
               setDisplayLogin(true);
            break;
         default:
            break;
      }
   }

   return (
      <Fragment>
         <TabMenu
            className={styles['nav-mobile']}
            model={mobileItems}
            activeIndex={activeIndex}
            onTabChange={tabChangeHandler}
         />
         <TabMenu
            className={styles.nav}
            model={items}
            activeIndex={activeIndex}
            onTabChange={tabChangeHandler}
         />
         <Login
            visible={displayLogin}
            onHide={setDisplayLogin.bind(null, false)}
         />
      </Fragment>
   );
}