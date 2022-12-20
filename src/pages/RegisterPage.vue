<template>
  <q-page class="flex justify-center">
      <div class="q-pa-md" style="min-width: 350px">
        <h4 class="text-center">Inscription</h4>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="username"
        label="Nom d'utilisateur "
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez saisir votre nom d\'utilisateur']"
      />
      <q-input
        v-model="mdp"
         filled
        :type="isPwd ? 'password' : 'text'"
        label="Mot de passe"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Veuillez saisir votre mot de passe',
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
          val => val !== null && val !== '' || 'Veuillez ressaisir votre mot de passe',
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


      <div style =" margin-top:0;" class="flex justify-center">
        <router-link to="/login">Déja inscris ? Connectez vous ici.</router-link>
      </div>

      <q-toggle v-model="accept" label="J'accepte les conditions d'utilisations" />


      <div class="">
        <q-btn class="full-width" label="valider" type="submit" color="primary" :loading = "isSubmitting">
          <template #loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
      </div>
    </q-form>

  </div>
  </q-page>

</template>

<script>
import { useQuasar } from 'quasar'
import { ref, defineComponent } from 'vue'
import {useUserStore} from "stores/user";
import { useRouter } from 'vue-router';

import authService from '../services/auth.service'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const user   = useUserStore()
    const accept   = ref(false)
    const username = ref(null)
    const mdp      = ref(null)
    const mdpConf      = ref(null)
    const isSubmitting = ref(false)
    const isPwd = ref(true)
    const isPwdconf = ref(true)
    async function register() {
        const {success, error} = await user.register({username : username.value, mdp : mdp.value });
        if (success) {
          $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'success',
            message: 'Votre compte a été créé ! Veuillez a présent vous connectez.',
            position : 'top'
          })
          setTimeout(() => {
            return router.push('/login');
          }, 2000);
        } else {
            $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error,
            position : 'top'
            })
          isSubmitting.value = false
        }
      }
     return {
      username,
      mdp,
      accept,
      mdpConf,
      isSubmitting,
      isPwd,
      isPwdconf,
      onSubmit () {

        if(accept.value){isSubmitting.value = true; return register()  }
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Veuillez accepter les conditions d\'utilisation.',
            position : 'top'
          })
      },
    }
  }
})
</script>
