import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../global/context/auth';
import { TabMenu } from 'primereact/tabmenu';
import DataSettingsModal from '../modals/DataSettingsModal/DataSettingsModal';
import LoginModal from '../modals/LoginModal/LoginModal';
import styles from './MainNavigation.module.css';

export default function MainNavigation() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [displayLogin, setDisplayLogin] = useState(false);
   const [displayDataSettings, setDisplayDataSettings] = useState(false);
   const auth = useContext(AuthContext);
   const router = useRouter();

   const loginButton = { label: 'Login', icon: 'pi pi-fw pi-sign-in' };
   const logoutButton = { label: 'Logout', icon: 'pi pi-fw pi-sign-out' };

   const items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Nutrient List', icon: 'pi pi-fw pi-list' },
      { label: 'Data Settings', icon: 'pi pi-fw pi-cog' },
      auth.isLoggedIn ? logoutButton : loginButton
   ];

   function tabChangeHandler(event) {
      setActiveIndex(event.index);

      switch (event.index) {
         case 0:
            router.push('/');
            break;
         case 1:
            router.push('/nutrients');
            break;
         case 2:
            setDisplayDataSettings(true);
            break;
         case 3:
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
            className={styles.header}
            model={items}
            activeIndex={activeIndex}
            onTabChange={tabChangeHandler}
         />
         <DataSettingsModal
            visible={displayDataSettings}
            onHide={setDisplayDataSettings.bind(null, false)}
         />
         <LoginModal
            visible={displayLogin}
            onHide={setDisplayLogin.bind(null, false)}
         />
      </Fragment>
   );
}