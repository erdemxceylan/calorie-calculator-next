import Head from 'next/head';
import { Fragment } from 'react';
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
        <meta name='description' content='Calculate total nutrition facts with ease' />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
