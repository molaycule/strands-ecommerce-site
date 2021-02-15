import type { AppProps /*, AppContext */ } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'fontawesome';
import 'styles/main.css';
import 'styles/utils.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
