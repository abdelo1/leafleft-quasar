import { api } from 'boot/axios'
import router from "../router";
import { useQuasar } from "quasar";
import { ref } from 'vue';

/**
 * Created by Abdel_san on 30/10/2022.
 */

const authService = {
  // async login(formData) {
  //   try {
  //     const {status, data} = await api.post('user/login', formData);
  //
  //     return {
  //       success: true,
  //       data: data,
  //       status: status
  //     }
  //   } catch (e) {
  //     return {
  //       success: false,
  //       errors: e.response.data.errors ?? e.response.data.message
  //     }
  //   }
  // },
  async login(formData) {
    try {
      const {status, data} = await api.post('user/login', formData);

      return {
        success: true,
        data: data,
        status: status
      }
    } catch (e) {
      return {
        success: false,
        errors: e.response.data.errors ?? e.response.data.message
      }
    }
  },
  async register(formData) {
    try {
      const {status, data} = await api.post('user/register', formData);
      if (status === 200) {
        localStorage.setItem('ACCESS_TOKEN', data.access_token)
      }
      return {
        success: true
      }
    } catch (e) {
      return {
        success: false,
        errors: e ? e.response.data.errors : {error : 'Une erreur est survenue veuillez réessayer'}
      }
    }
  },
  logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  },
  async getUser() {
    try {
      const {status, data} = await api.get('/user/data');
      return{
        status : status,
        data   : data
      }
    } catch (e) {
      return{
        status : 401,
        data   : null
      }
    }
  },
  async updateUser(formData) {
    try {
      const {status, data} = await api.post('/user/data', formData);
      return{
        success : status === 200,
        data   : data
      }
    } catch (e) {
      return {
        success: false,
        errors: e ? e.response.data.errors : {error : 'Une erreur est survenue veuillez réessayer'}
      }
    }
  },
  async updateMdp(formData) {
    try {
      const {status, data} = await api.post('/user/data', formData);
      return{
        success : status === 200,
        data   : data
      }
    } catch (e) {
      return {
        success: false,
        errors: e ? e.response.data.errors : {error : 'Une erreur est survenue veuillez réessayer'}
      }
    }
  }
}

export default authService;
