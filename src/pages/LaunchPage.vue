<template>
  <q-layout>
  <q-page-container >
    <q-page >
      <q-carousel
      class="window-height"
      swipeable
      animated
      transition-prev ="slide-right"
      transition-next ="slide-left"
      v-model="slide"
      :autoplay="autoplay"
      ref="carousel"
    >
      <q-carousel-slide :name="1" >
        <div class="full-height flex flex-center">
            <h5 class="text-center ">Bienvenue sur {{ appName }} ! L'appli qui vous facilite la vie ! </h5>
            <img style="width:300px;margin-top: -100px;" src="./../assets/91620-jumping-lottie-animation.gif"/>
        </div>
      </q-carousel-slide >
      <q-carousel-slide :name="2" >
        <div class="full-height flex flex-center">
            <h5 class="text-center">Recharger votre compteur Edan sans vous déplacer ! </h5>
            <img style="width:300px;margin-top: -100px;" src="./../assets/91620-jumping-lottie-animation.gif"/>
        </div>
      </q-carousel-slide >


      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
          class="q-gutter-xs"
        >
        <q-btn flat color="primary" :disable = "slide === 1" label="Précédent"  @click="$refs.carousel.previous()" />
        <q-btn flat color="primary" :label="slide == 2 ? 'Commencer' : 'Suivant'"    @click="handleClick()" />


        </q-carousel-control>
      </template>
    </q-carousel>
   </q-page>
  </q-page-container>
</q-layout>
</template>
<script>

import { ref, defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router';
import {LocalStorage} from "quasar";
export default defineComponent({
  name: 'LaunchPage',

  setup () {
    const  slide    = ref(1)
    const  carousel = ref(null)
    const autoplay  = ref(false)
    const router    = useRouter()
    const appName   = inject('appName')

    /*const watchSlide = watch(slide, (sliden) => {console.log(sliden)});*/
    return {
      slide,
      carousel,
      appName,
      autoplay,
      async handleClick  (){
        if(slide.value == 2){
          await LocalStorage.set('firstLaunch','1');
          return router.push('/login')
        }
        return  carousel.value.next()
      }
    }
  }
})
</script>
