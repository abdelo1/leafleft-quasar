<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
<!--        <q-btn-->
<!--          flat-->
<!--          dense-->
<!--          round-->
<!--          icon="menu"-->
<!--          aria-label="Menu"-->
<!--          @click="toggleLeftDrawer"-->
<!--        />-->

        <q-toolbar-title> {{appName}} </q-toolbar-title>
          <div class="q-pa-md">
            <q-btn-dropdown v-show="isLoggedIn" flat color="white" :label="getUsername">
              <q-list>
                <q-item @click.prevent=" logout()" clickable class="text-primary">
                  <q-item-section style="min-width: 40px;"  avatar>
                      <q-icon name='logout'/>
                  </q-item-section>
                  <q-item-section>
                      <q-item-label class="text-bold">Déconnexion</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item to="/profile" clickable class="text-primary">
                   <q-item-section style="min-width: 40px;"  avatar>
                      <q-icon name="person" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="text-bold">Mon compte</q-item-label>
                    </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-item v-show="!isLoggedIn" @click.prevent="$router.push('/login')" clickable class="text-white">
              <q-item-section style="min-width: 40px;"  avatar>
                  <q-icon name="person" />
                </q-item-section>
              <q-item-section>
                  <q-item-label class="">S'identifier</q-item-label>
                </q-item-section>
            </q-item>
          </div>


      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="primary" class="text-grey">
        <q-route-tab to="/" exact :ripple="{ early: true, center: true, color: 'teal', keyCodes: [] }" icon="home" name="accueil" label="Accueil" />
        <q-route-tab v-show="isLoggedIn" to="/compteurs" exact :ripple="{ early: true, center: true, color: 'teal', keyCodes: [] }" icon="dock" name="compteurs" label="Compteurs" />
        <q-route-tab v-show="isLoggedIn" to="/profile" exact :ripple="{ early: true, center: true, color: 'teal', keyCodes: [] }" icon="person" name="profil" label="Profil" />
      </q-tabs>
    </q-footer>
<!--    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>-->
<!--      <q-list>-->
<!--        <q-item-label header> {{appName}} </q-item-label>-->
<!--        <LienNav-->
<!--          v-for="link in linksList"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
<!--      </q-list>-->

<!--    </q-drawer>-->

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref, inject, onUpdated, onMounted} from "vue";
import {useRouter} from 'vue-router'
import {useUserStore} from '../stores/user'
import {storeToRefs} from 'pinia'
import LienNav from "src/components/LienNav.vue";
import {useQuasar} from 'quasar'

const linksList = [
  {
    title: "Accueil",
    caption: "",
    icon: "home",
    link: "/",
  },
  {
    title: "Gérer mes compteurs",
    caption: "",
    icon: "dock",
    link: "/compteurs",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    //LienNav,
  },

  setup() {
    const user           = useUserStore()
    const router         = useRouter()
    const leftDrawerOpen = ref(false)
    const appName        = inject('appName')
    const {isLoggedIn, getUsername}   =  storeToRefs(user)
    const tab          = ref('accueil')
    onMounted(() => {
        isLoggedIn && useQuasar().notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'waving_hand',
          message: 'Bienvenue ! '+user.getUsername,
          position: 'top'
        })

      }
    );
    return {
      linksList,
      appName,
      tab,
      isLoggedIn,
      getUsername,
      leftDrawerOpen,
      logout(){
        user.loggedUser = {}
        return router.push('/login')
      },
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

    };
  },
});
</script>
