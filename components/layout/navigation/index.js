import { Fragment, useContext, useState } from 'react'

import AuthContext from '../../../global/context/auth'
import { CONSTANTS } from '../../../global/constants'
import Login from '../../overlays/login'
import Logout from '../../overlays/logout'
import { TabMenu } from 'primereact/tabmenu'
import styles from './styles.module.css'
import { useRouter } from 'next/router'

const { HOME, NUTRIENTS } = CONSTANTS

export default function MainNavigation() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [displayLogin, setDisplayLogin] = useState(false)
	const [displayLogout, setDisplayLogout] = useState(false)
	const auth = useContext(AuthContext)
	const router = useRouter()

	const loginButton = { label: 'Login', icon: 'pi pi-fw pi-sign-in' }
	const logoutButton = { label: 'Logout', icon: 'pi pi-fw pi-sign-out' }

	const items = [
		{ label: 'Home', icon: 'pi pi-fw pi-home' },
		{ label: 'Nutrient List', icon: 'pi pi-fw pi-list' },
		auth.isLoggedIn ? logoutButton : loginButton,
	]

	let mobileItems = []
	items.forEach(item => mobileItems.push({ label: '', icon: item.icon }))

	function tabChangeHandler(event) {
		setActiveIndex(event.index)

		switch (event.index) {
			case 0:
				router.push(HOME)
				break
			case 1:
				router.push(NUTRIENTS)
				break
			case 2:
				if (!auth.isLoggedIn) setDisplayLogin(true)
				else setDisplayLogout(true)
				break
			default:
				break
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
			<Login visible={displayLogin} onHide={setDisplayLogin.bind(null, false)} />
			<Logout visible={displayLogout} onHide={setDisplayLogout.bind(null, false)} />
		</Fragment>
	)
}
