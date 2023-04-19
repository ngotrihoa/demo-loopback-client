import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3001/',
  responseType: 'json',
  timeout: 10000,
  // withCredentials: true,
});

axiosApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem('access_token') || null;
  if (accessToken) {
    request.headers['Authorization'] = 'Bearer ' + accessToken;
  }

  return request;
});

axiosApi.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error.response.data;
  }
);

const mergeConfigHeader = async (config = null) => {
  const defaultHeaders = axiosApi.defaults.headers;
  let headers = {};
  if (config) {
    headers = { ...defaultHeaders, ...config };
  }

  return { ...defaultHeaders, headers };
};

export async function get(url, data = {}, config = {}) {
  const headers = mergeConfigHeader(config);
  return axiosApi.get(url, data, { headers });
}

export async function post(url, data = {}, config = {}) {
  const headers = mergeConfigHeader(config);
  return axiosApi.post(url, data, { headers });
}
