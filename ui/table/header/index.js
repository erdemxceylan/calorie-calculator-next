import styles from './styles.module.css';

export default function Header(props) {
   return (
      <div className={styles.container}>
         <label>{props.title}</label>
         <div className={styles.content}>{props.content}</div>
      </div>
   );
}