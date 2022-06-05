import { Fragment } from 'react';
import MainNavigation from './MainNavigation';
import styles from './Layout.module.css';

export default function Layout(props) {
   return (
      <Fragment>
         <MainNavigation />
         <main className={styles.container}>{props.children}</main>
      </Fragment>
   );
}