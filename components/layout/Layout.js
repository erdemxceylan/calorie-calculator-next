import MainNavigation from './MainNavigation';
import styles from './Layout.module.css';

export default function Layout(props) {
   return (
      <div>
         <MainNavigation />
         <main className={styles.container}>{props.children}</main>
      </div>
   );
}