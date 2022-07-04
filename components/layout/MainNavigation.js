import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../global/context/auth';
import { TabMenu } from 'primereact/tabmenu';
import DataSettingsModal from '../modals/DataSettingsModal/DataSettingsModal';
import LoginModal from '../modals/LoginModal/LoginModal';
import { CONSTANTS } from '../../global/constants';
import styles from './MainNavigation.module.css';

import DataSettings from './DataSettings';

export default function MainNavigation() {
   const [activeIndex, setActiveIndex] = useState(0);
   const [displayLogin, setDisplayLogin] = useState(false);
   const [displayDataSettings, setDisplayDataSettings] = useState(false);
   const auth = useContext(AuthContext);
   const router = useRouter();

   const [displayForm, setDisplayForm] = useState(false);

   const loginButton = { label: 'Login', icon: 'pi pi-fw pi-sign-in' };
   const logoutButton = { label: 'Logout', icon: 'pi pi-fw pi-sign-out' };

   const items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Nutrient List', icon: 'pi pi-fw pi-list' },
      { label: 'Data Settings', icon: 'pi pi-fw pi-cog' },
      { label: 'Form', icon: 'pi pi-fw pi-cog' },
      auth.isLoggedIn ? logoutButton : loginButton
   ];

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
            setDisplayDataSettings(true);
            break;
         case 3:
            setDisplayForm(state => !state);
            break;
         case 4:
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
         <DataSettings
            visible={displayForm}
            onHide={setDisplayForm.bind(null, false)}
         />
      </Fragment>
   );
}