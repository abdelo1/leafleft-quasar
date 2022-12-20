<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
  >
    <q-input
      filled
      v-model="name"
      label="Nom du compteur"
      hint=""
      lazy-rules
      :rules="[ val => val !== '' || 'Veuillez saisir le nom du compteur']"
    />
    <q-input
      filled
      v-model="num"
      label="Numéro du compteur"
      hint=""
      lazy-rules
      :rules="[ val => val !== '' || 'Veuillez saisir le numéro du compteur']"
    />
    <q-input
      filled
      type="number"

      v-model="seuil"
      label="Seuil d'alerte du compteur"
      hint=""
      lazy-rules
      :rules="[ val => val && val !=  0 || 'Veuillez saisir le seuil d\'alerte']"
    />
    <q-checkbox  left-label v-model="home" label="Ajouter a l'écran d'accueil" />

    <div class="">
      <q-btn class="full-width" label="Enregistrer" type="submit" color="primary" :loading = "isSubmitting">
        <template v-slot:loading>
          <q-spinner-facebook />
        </template>
      </q-btn>
    </div>
  </q-form>

</template>

<script>
import { defineComponent, ref } from "vue";
import {useCompteurStore} from "stores/compteur";
import {useUserStore} from "stores/user";
export default defineComponent({
  name: "CompteurForm",
  props: {
    id: Number
  },
  setup(props ,{ emit }){
    const store = useCompteurStore()
    const c       = props.id ? store.compteurs.find((list) =>  list.id === props.id ) : null
    const seuil   =  c ? ref(c.seuil)  :  ref(null)
    const name    =  c ? ref(c.name)  :  ref(null)
    const num     =  c ? ref(c.ref)  :  ref(null)
    const id      =  c ? ref(c.id)  :  ref(null)
    const home    =  c ? ref(c.home)  :  ref(false)
    const isSubmitting   = ref(false)

    return {
      seuil,
      name,
      num,
      home,
      isSubmitting,
      onSubmit () {
        isSubmitting.value = true
          useCompteurStore().saveItem({
          id : id.value,
          ref : num.value,
          name: name.value,
          user_id: useUserStore().loggedUser.id,
          seuil : seuil.value,
          unite : Math.floor(Math.random() * (100 - seuil.value) + seuil.value),
          home : home.value
        })
        emit("compteurSaved")
      },
    }
  }
});
</script>
