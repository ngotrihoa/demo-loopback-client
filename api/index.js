import { get, post } from './axios';

export const authApi = {
  login: async (payload) => {
    return post('login', payload);
  },
  signup: (payload) => {
    return post('signup', payload);
  },
};
