import authService from '../../services/auth-service';
import React, { useEffect, useState } from 'react';

const useAuthService = () => {
  const [state, setState] = useState(authService.getData());

  const checkLogin = () => {
    if (!state.dataToken.token || !state.dataToken.exp || !state.userInfo) return false;
    const isTokenExp = state.dataToken.exp * 1000 < Date.now();
    if (isTokenExp) return false;

    return true;
  };

  useEffect(() => {
    return authService.onChange((prev) => setState(prev));
  }, []);

  return {
    authData: state,
    setAuthData: authService.setData,
    authService: authService,
    checkLogin,
  };
};

export default useAuthService;
