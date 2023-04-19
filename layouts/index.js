import useAuthService from '@/common/hooks/useAuthService';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import SideBar from '../common/components/sidebar';

const AppLayout = ({ children }) => {
  const { authData, setAuthData, checkLogin } = useAuthService();
  const router = useRouter();

  const isLogin = checkLogin();

  useEffect(() => {
    let dataToken = localStorage.getItem('data-token');
    if (typeof dataToken === 'string') dataToken = JSON.parse(dataToken);

    let userInfo = localStorage.getItem('user-info');
    if (typeof userInfo === 'string') userInfo = JSON.parse(userInfo);

    const checkUserLogin = () => {
      if (!dataToken?.token || !dataToken?.exp || !userInfo) return false;
      const isTokenExp = dataToken.exp * 1000 < Date.now();
      if (isTokenExp) return false;

      return true;
    };

    if (checkUserLogin()) {
      setAuthData((prev) => ({ ...prev, dataToken, userInfo }));
    } else {
      router.replace('/login');
    }
  }, []);

  if (!isLogin) return null;

  return <SideBar>{children}</SideBar>;
};

export default AppLayout;
