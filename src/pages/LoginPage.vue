<template>
  <q-page class="flex justify-center">
      <div class="q-pa-md" style="min-width: 350px">
        <h4 class="text-center">Connexion</h4>
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
         filled
        :type="isPwd ? 'password' : 'text'"
        v-model="mdp"
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

      <div style =" margin-top:0;" class="flex justify-between">
        <router-link to="/reset-mdp">Mot de passe oublié ?</router-link>
        <router-link to="/register">S'incrire</router-link>
      </div>

      <div class="">
        <q-btn class="full-width" label="valider" type="submit" color="primary" :loading = "isSubmitting">
          <template v-slot:loading>
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
import { useRouter } from 'vue-router'
import { useUserStore} from '../stores/user'
import authService from '../services/auth.service'

export default defineComponent({
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const user   = useUserStore()
    const username = ref(null)
    const mdp      = ref(null)
    const isSubmitting = ref(false)
    const isPwd      = ref(true)

    async function login() {
        const {success, error} = await user.login({username : username.value, mdp : mdp.value });
        if (success) {
          return router.push('/');
        } else {
             $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: error,
              position : 'top'
            })
          }
          isSubmitting.value = false
        }

     return {
      username,
      mdp,
      isSubmitting,
      isPwd,

      onSubmit () {
        isSubmitting.value = true
        login()
       /* $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
            position : 'top'
          })*/
      },
    }
  }
})
</script>
