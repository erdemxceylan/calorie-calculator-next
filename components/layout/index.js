import { Fragment } from 'react'
import MainNavigation from './navigation'
import styles from './styles.module.css'

export default function Layout(props) {
	return (
		<Fragment>
			<MainNavigation />
			<main className={styles.container}>{props.children}</main>
		</Fragment>
	)
}
