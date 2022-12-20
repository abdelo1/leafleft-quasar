<template>
  <q-page padding class="q-pa-md">
    <p class="text-h4">Profil</p>
    <q-input
        filled
        v-model="username"
        label="Nom d'utilisateur "
        :readonly="readonly"
        hint=""
        debounce="1000"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez saisir votre nom d\'utilisateur']"
        >
        <template v-slot:append>
          <q-icon
            name="edit"
            title="Cliquer pour modifier"
            class="cursor-pointer"
            @click="()=>{readonly = !readonly;}"
          />
        </template>
    </q-input>
    <p class="text-h6 mt-2">Mot de passe</p>
    <q-separator   />
      <q-input
        style="margin-top: 20px;"
        v-model="mdpAct"
         filled
        :type="isPwd_act ? 'password' : 'text'"
        label="Mot de passe actuel"
        lazy-rules
        :rules="[
          val =>  val !== '' || 'Veuillez saisir votre mot de passe actuel',
        ]"
        >
        <template v-slot:append>
          <q-icon
            :name="isPwd_act ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd_act = !isPwd_act"
          />
        </template>
      </q-input>
      <q-input
        v-model="mdp"
         filled
        :type="isPwd ? 'password' : 'text'"
        label="Nouveau mot de passe"
        lazy-rules
        :rules="[
          val =>  val !== '' || 'Veuillez saisir votre nouveau mot de passe',
        ]"
        >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
         filled
        :type="isPwdconf ? 'password' : 'text'"
        v-model="mdpConf"
        label="Confirmer mot de passe"
        lazy-rules
        :rules="[
          val =>  val !== '' || 'Veuillez ressaisir votre mot de passe',
          val => val === mdp || 'Les mots de passe ne correspondent pas',
        ]"
        >
        <template v-slot:append>
          <q-icon
            :name="isPwdconf ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdconf = !isPwdconf"
          />
        </template>
      </q-input>
    <div style="padding: 0.5rem" class="">
      <q-btn :disable ="!mdp || !mdpAct || !mdpConf"  class="full-width" @click="updateMdp" label="valider"  color="primary" :loading = "isSubmittingMdp">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router';
import {useUserStore} from '../stores/user';
import authService from '../services/auth.service'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const userStore  = useUserStore()
    const username = ref( userStore.getUsername)
    const router   = useRouter()
    const readonly  = ref(true)
    const mdp      = ref('')
    const mdpAct      = ref('')
    const mdpConf      = ref('')
    const isSubmittingMdp = ref(false)
    const isPwd_act = ref(true)
    const isPwd = ref(true)
    const isPwdconf = ref(true)

    watch(username, (newValue, oldValue)=>{ if(newValue != oldValue ) update('username') })
    async function update(field){
      if(field === 'username'){
        if(userStore.users.find(function(user) { return user.username === username.value && user.id !==  userStore.loggedUser.id })){
          username.value = userStore.loggedUser.username
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Ce nom d\'utilisateur existe déjà !',
            position: 'top'
          });
        }
        else{
          userStore.loggedUser.username = username.value
          await userStore.update(userStore.loggedUser)
          readonly.value = true

          $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'success',
            message: 'Nom d\'utilisateur modifié avec succès !',
            position: 'top'
          })
        }
      }
    }
    async function updateMdp(){
      if(userStore.loggedUser.mdp !== mdpAct.value){
       return $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Mot de passe actuel incorrect !',
          position : 'top'
        })
      }
      userStore.loggedUser.mdp =  mdp.value
      await  userStore.update(userStore.loggedUser)
      $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Mot de passe modifié avec succès !',
        position : 'top'
      })
      mdp.value     = null
      mdpAct.value  = null
      mdpConf.value = null

    }
    return {
      username,
      readonly,
      mdp,
      mdpAct,
      mdpConf,
      isSubmittingMdp,
      isPwd,
      isPwd_act,
      isPwdconf,
      updateMdp,

    }
  }
})
</script>
