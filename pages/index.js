import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AppLayout from '../layouts';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, []);

  return null;
}

Home.Layout = AppLayout;
