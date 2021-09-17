import Head from "next/head";
import { Provider } from "next-auth/client";
// add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import Layout from "../components/Layout";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
