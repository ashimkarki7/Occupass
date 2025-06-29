import axios from 'axios';

export const httpBase = () => {
  const baseURL3001 = import.meta.env.VITE_APP_URL;
  const V2Headers = {
    Accept: '*',
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  };

  const api = axios.create({
    baseURL: `${baseURL3001}`,
    headers: { ...V2Headers },
    responseType: 'json',
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (401 === error.response.status) {
        console.log(error, '401');
      }
      if (404 === error.response.status) {
        console.log(error, '404');
      }
      if (500 === error.response.status) {
        console.log(error, '500');
      }
      return Promise.reject(JSON.stringify(error));
    }
  );

  return api;
};
