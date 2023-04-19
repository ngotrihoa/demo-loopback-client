import { useEffect } from 'react';
import AppLayout from '../layouts';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

const EmptyLayout = ({ children }) => <>{children}</>;
