import { boot } from 'quasar/wrappers'
import axios from 'axios'
import authService from 'src/services/auth.service';
import {useUserStore} from '../stores/user'

/** Default config for axios instance */
const API_ENDPOINT = process.env.VUE_APP_API_ENDPOINT || 'http://10.253.114.9:9080/';
let config = {
  baseURL: `${API_ENDPOINT}api/`
};

/** Creating the instance for axios */
const api = axios.create(config);

/** Auth token interceptors */
const authInterceptor = config => {
  config.headers.Authorization = `Bearer ${useUserStore().getAccess_token}`;
  return config;
};


/** Adding the request interceptors */
api.interceptors.request.use(authInterceptor);




export default boot(({ app, router }) => {

  api.interceptors.response.use(
    response => {
      /** TODO: Add any response interceptors */
      return response;
    },
    error => {
     /** if (error.response.status === 401){
        router.push({name: 'login'})
      }
       TODO: Do something with response error */
      return Promise.reject(error);
    }
  )
;})

export { axios, api }
