import utils from '@/common/utils';
import { authApi } from '../api';

let _state = {
  dataToken: {
    token: null,
    exp: null,
  },

  userInfo: null,
  isLoading: false,
};

let callbacks = [];

const onChange = (fn) => {
  callbacks.push(fn);
  return () => (callbacks = callbacks.filter((f) => f !== fn));
};

const emitChange = () => {
  callbacks.forEach((f) => f(_state));
};

const getData = () => _state;

const setData = (newData) => {
  if (typeof newData === 'function') {
    newData = newData(_state);
  }

  _state = newData;
  emitChange();
};

const login = async (options) => {
  try {
    setData({ ..._state, isLoading: true });
    const response = await authApi.login({
      user_name: options.username,
      password: options.password,
    });

    if (response && response.token) {
      const parsedToken = utils.parseJwt(response.token);
      const dataToken = { token: response.token, exp: parsedToken.exp };
      const userInfo = utils.objectWithoutProperties(parsedToken, ['exp', 'iat']);

      localStorage.setItem('data-token', JSON.stringify(dataToken));
      localStorage.setItem('user-info', JSON.stringify(userInfo));

      setData({
        ..._state,
        dataToken,
        userInfo,
        isLoading: false,
      });
    }

    return [response, null];
  } catch (error) {
    localStorage.removeItem('data-token');
    localStorage.removeItem('user-info');
    setData({
      ..._state,
      isLoading: false,
    });

    return [null, error.error];
  }
};

const authService = {
  onChange,
  getData,
  setData,
  emitChange,
  login,
};

export default authService;
