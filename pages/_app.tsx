import type { AppProps /*, AppContext */ } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'fontawesome';
import 'styles/main.css';
import 'styles/utils.css';

NProgress.configure({
  showSpinner: false
});

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const client = new ApolloClient({
  uri: 'http://localhost:5000/admin/api',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allProducts: {
            keyArgs: ['where', 'search'],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
  connectToDevTools: process.env.NODE_ENV === 'development' ? true : false
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.onbeforeunload = () => {
      Cookies.remove('onload');
    };
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
