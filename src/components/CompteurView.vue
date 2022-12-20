<template>
    <q-card
      class="my-card text-white col "
      style="background: #284e73;color: lightgreen"
    >
      <q-card-section class="flex row justify-between">
        <div>
          <div class="text-h6">{{ compteur.name }}</div>
          <div class="text-subtitle2"> Numéro : {{ compteur.ref }}</div>
        </div>
        <q-btn-dropdown class="q-pa-none" dropdown-icon="more_vert" flat >
          <q-list>
            <q-item clickable class="text-primary">
              <q-item-section>
                <q-item-label class="text-bold">Recharger</q-item-label>
              </q-item-section>
            </q-item>
            <q-item @click = "compteur.home ? RemoveMainCompteur(compteur.id) : setMainCompteur(compteur.id)" clickable class="text-primary">
              <q-item-section>
                <q-item-label class="text-bold">Retirer de l'écran d'accueil </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-card-section>

      <q-card-section class="q-mt-sm flex row ">

        <q-icon size="30px"  name="bolt"/>

        <span>{{ compteur.unite }} Kwh</span>
        <p style="margin-left: auto"><q-icon :color="compteur.unite <= compteur.seuil ? 'red-3' : 'green-3'"  size="30px"  :name="compteur.unite <= compteur.seuil ? 'mood_bad' : 'mood' "/></p>

      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from 'quasar'

import {useCompteurStore} from "stores/compteur";
import {useUserStore} from "stores/user";
export default defineComponent({
  name: "CompteurView",
  props: {
    compteur: {
      type : Object,
      required : true
    }
  },
  setup(props){
    const user = useUserStore()
    const $q   = useQuasar()
    return {
      setMainCompteur(id){
        let c = user.compteur.compteurs.find((list) =>  list.id === id )
        c = {...c, home : true}
        user.compteur.saveItem(c)
        $q.notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'success',
          message: 'Compteur ajouté a l\'écran d\'accueil !',
          position: 'top'
        })
      },
      RemoveMainCompteur(id){
        let c = user.compteur.compteurs.find((list) =>  list.id === id )
        c = {...c, home : false}
        user.compteur.saveItem(c)
        $q.notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'success',
          message: 'Compteur retiré de l\'écran d\'accueil !',
          position: 'top'
        })
      },
    }
  }

});
</script>
