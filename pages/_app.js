import Head from 'next/head';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from '../global/redux/index';
import Layout from '../components/layout/Layout';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Calorie Calculator</title>
        <meta name='description' content='Calculate daily total nutrition facts with ease' />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </Fragment>
  );
}

export default MyApp;
