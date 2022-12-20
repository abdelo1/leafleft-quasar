<template>
  <div class="">
    <q-list separator>
      <q-item-label clickable header class="flex" style="background:rgb(119 136 153 / 7%)">
        <div>
          <q-btn flat @click="$router.back()"  color="primary" icon="arrow_back_ios" />
          <span class="">Compteurs</span>
        </div>
        <q-btn style="margin-left: auto" @click="() => { compteur_id =  null;headerFormCompteur = 'Enregistrer compteur '; formCompteur = true }" round color="primary" icon="add" />
      </q-item-label>
      <q-input
        v-model="qs"
        debounce="500"
        filled
        placeholder="Rechercher"
        hint="Debouncing 500ms"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <template v-for=" compteur in getUserCompteurFilter(user.loggedUser.id, qs)" :key="compteur.id" >
        <q-item   class="q-my-sm">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ compteur.name.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>{{ compteur.name }}</q-item-section>
          <q-item-section>
            <p style="margin-left: 3px"><q-icon :color="compteur.unite <= compteur.seuil ? 'red-3' : 'green-3'"  size="30px"  :name="compteur.unite <= compteur.seuil ? 'mood_bad' : 'mood' "/></p>
          </q-item-section>
          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn @click ="removeItem(compteur.id)" size="12px" flat dense round icon="delete" />
              <q-btn @click ="() => { compteur_id = compteur.id; headerFormCompteur = 'Modifier compteur ';formCompteur = true; }" size="12px" flat dense round icon="edit" />
              <q-btn-dropdown class="q-pa-none" dropdown-icon="more_vert" flat >
                <q-list>
                  <q-item clickable class="text-primary">
                    <q-item-section>
                      <q-item-label class="text-bold">Recharger</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item @click = "compteur.home ? RemoveMainCompteur(compteur.id) : setMainCompteur(compteur.id)" clickable class="text-primary">
                    <q-item-section>
                      <q-item-label class="text-bold">{{ compteur.home ? 'Retirer de l\'écran d\'accueil' :  'Ajouter à l\'écran d\'accueil'  }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

            </div>
          </q-item-section>
        </q-item>
      </template>

    </q-list>
    <q-dialog v-model="formCompteur" full-width>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ headerFormCompteur }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <compteur-form :id = "compteur_id" @compteurSaved = "handleCompteurSaved"/>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

import {defineComponent, ref, watch} from "vue"
import { useRouter}   from 'vue-router'
import CompteurForm from "../components/CompteurForm.vue";
import {useUserStore} from "stores/user";
import {useCompteurStore} from "stores/compteur";
import {storeToRefs} from "pinia";

export default defineComponent({
  components:{
    CompteurForm,
  },
  setup() {
    const qs           = ref('')
    const $q           = useQuasar()
    const router       = useRouter()
    const user         = useUserStore()
    const compteur     = useCompteurStore()
    const {getUserCompteurFilter}     = storeToRefs(compteur)
    const formCompteur = ref(false)
    const compteur_id  =  ref(null)
    const headerFormCompteur = ref('Modifier compteur')
    return {
    router,
    user,
    qs,
    getUserCompteurFilter,
    headerFormCompteur,
    formCompteur,
    removeItem(id) {
      $q.dialog({
        title: 'Suppression',
        message: 'Voulez vous vraiment supprimer ce compteur ? Toutes les données seront perdues.',
        cancel: 'Annuler',
        persistent: true
      }).onOk(() => {
        user.compteur.removeItem(id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    setMainCompteur(id){
    // let  c = user.compteur.compteurs.find((list) =>  list.home === true )
    //      c = {...c, home : false}
    //      user.compteur.saveItem(c)
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
        // let  c = user.compteur.compteurs.find((list) =>  list.home === true )
        //      c = {...c, home : false}
        //      user.compteur.saveItem(c)
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
    handleCompteurSaved(){
      formCompteur.value = false
      $q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'success',
        message: 'Compteur ajouté avec succès !',
        position: 'top'
      })
    }
    };
  },
});
</script>
