import 'primereact/resources/themes/lara-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../styles/globals.css'

import { AuthContextProvider } from '../global/context/auth'
import { Fragment } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import store from '../global/redux'

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<Head>
				<title>Calorie Calculator</title>
				<meta name='description' content='Calculate daily total nutrition facts with ease' />
			</Head>
			<Provider store={store}>
				<AuthContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthContextProvider>
			</Provider>
		</Fragment>
	)
}

export default appWithTranslation(MyApp)
