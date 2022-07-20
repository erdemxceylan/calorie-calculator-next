import { useRouter } from 'next/router';
import { Fragment, useContext, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { CONSTANTS } from '../../global/constants';
import AuthContext from '../../global/context/auth';
import Login from '../modals/Login';
import Logout from '../modals/Logout';
import styles from './MainNavigation.module.css';

export default function MainNavigation() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [displayLogin, setDisplayLogin] = useState(false);
   const [displayLogout, setDisplayLogout] = useState(false);
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
            if (!auth.isLoggedIn)
               setDisplayLogin(true);
            else
               setDisplayLogout(true);
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
         <Logout
            visible={displayLogout}
            onHide={setDisplayLogout.bind(null, false)}
         />
      </Fragment>
   );
}