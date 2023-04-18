import { useEffect } from 'react';
import AppLayout from '../layouts';

export default function Home({ onChangeTab }) {
  useEffect(() => {
    if (typeof onChangeTab === 'function') {
      onChangeTab('Dashboard');
    }
  }, []);

  return null;
}

Home.Layout = AppLayout;
