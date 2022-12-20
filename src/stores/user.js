import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {useCompteurStore} from "stores/compteur";

export const useUserStore = defineStore('user', {
  state: () => ({ users : [{id : 1, username : 'abdel', mdp : 'abdeli12'}], loggedUser: {}, compteur : useCompteurStore()}),
  getters: {
    getUsername:     (state) => state.loggedUser.username,
    getMdp:          (state) => state.loggedUser.mdp,
    isLoggedIn:      (state) =>  state.loggedUser.id !== undefined
  },
  actions: {
    findByKey(key, value){
     return  this.users.find(function(user) { return user[`${key}`] === value })
    },
    login({username, mdp}){
     let  u = this.findByKey('username', username)
      if(u !== undefined && u.mdp === mdp){
        this.loggedUser = u
        return {
          success : true,
          error   : '',
        }
      }
      else{
        return {
          success: false,
          error  : 'Nom d\'utilisateur ou mot de passe incorrect'
        }
      }
    },
    async  register({username, mdp}){
      if(this.findByKey('username', username)){
       // if(this.users.find( user =>  user.username === username )){
          return{
          success : false,
          error   : 'Ce nom d\'utilisateur existe déjà.'
        }
      }
      let i = this.users.length
      this.users.push({id :++i, username : username, mdp: mdp})
      return{
         success : true,
         error   : ''
      }
    },
   async update(user){
     for (const obj of this.users) {
       if (obj.id === user.id) {
         obj.username = user.username;
         break;
       }
     }
     // const newArr = this.users.map(obj => {
     //   if (obj.username === this.loggedUser.username) {
     //     return {...obj, username: username};
     //   }
     //
     //   return obj;
     // });

    },
     setUsername( u ) {
      this.loggedUser.username = u
    }
  },
  persist: {
    enabled: true
  }
})
/*export const useUserStore = defineStore('user', () => {

// state
  const username       = ref('')
  const access_token = ref('')
// getter
  const getUsername       = computed(() => username.value)
  const getAccess_token = computed(() => access_token.value )
  const isLoggedIn        = computed(() => username.value !== '' && access_token.value !== '' )

//actions
  function setUsername( u ) {
    username.value = u
  }
  function setAccess_token( t ) {
    access_token.value = t
  }

  return { getAccess_token, getUsername, setUsername, setAccess_token, isLoggedIn }
})*/
