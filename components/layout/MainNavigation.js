import { /*useContext,*/ useState } from 'react';
// import { useDispatch } from 'react-redux';
import { TabMenu } from 'primereact/tabmenu';
// import { modalActions } from '../../global/redux/modal';
// import AuthContext from '../../global/context/auth';
import styles from './MainNavigation.module.css';
import { useRouter } from 'next/router';

export default function MainNavigation() {
   const [activeIndex, setActiveIndex] = useState(0);
   // const dispatch = useDispatch();
   // const auth = useContext(AuthContext);
   const router = useRouter();

   const loginButton = { label: 'Login', icon: 'pi pi-fw pi-sign-in' };
   // const logoutButton = { label: 'Logout', icon: 'pi pi-fw pi-sign-out' };

   const items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Nutrient List', icon: 'pi pi-fw pi-list' },
      { label: 'Data Settings', icon: 'pi pi-fw pi-cog' },
      loginButton
      // auth.isLoggedIn ? logoutButton : loginButton
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
            console.log('data settings');
            break;
         case 3:
            console.log('login');
            break;
         default:
            break;
      }
   }

   return (
      <TabMenu
         className={styles.header}
         model={items}
         activeIndex={activeIndex}
         onTabChange={tabChangeHandler}
      />
   );
}