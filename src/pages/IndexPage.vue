<template>
  <q-page class="q-pa-md" >
    <q-input
      :loading="loadingState"
      v-model="qs"
      debounce="500"
      filled
      placeholder="Rechercher dans libreville ..."
      @blur      = "search()"
    >
      <template v-slot:append>
        <q-icon @click="clearSearch()" :name="qs ? 'close' : 'search'" />
      </template>
    </q-input>
   <div id = "map">

   </div>
  </q-page>

</template>
<style>
#map{width:100%; height:70vh; margin-top: 5px}
</style>
<script>
import {defineComponent, h, onMounted, ref} from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import {storeToRefs} from "pinia";
import   * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '/src/js/AccuratePosition'
export default defineComponent({
  name: 'IndexPage',
  components: {
  },
  setup(){
    const $q   = useQuasar()
    const qs   = ref('')
    const loadingState   = ref(false)
    let map = null;
    let myLayer = null

    onMounted(() => {
      initMap()
    })

    function  initMap(){
      const popup = L.popup()

      map = L.map('map').fitWorld()
      // myLayer = L.geoJSON().addTo(map)


      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }

      map.on('click', onMapClick);
      // initialise la carte
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 30,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // géolocalise automatiquement le user et indique sa position sur la carte
      map.locate({setView: true, enableHighAccuracy : true});

      function onLocationFound(e) {
        const  radius = e.accuracy;
        L.marker(e.latlng).addTo(map)
          .bindPopup("Vous être dans un rayon de " + radius + " m d'ici").openPopup();

        L.circle(e.latlng, radius).addTo(map);

      }

      map.on('locationfound', onLocationFound);

      function onLocationError(e) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'error',
          message: e.message,
          position: 'top'
        })
      }

    }

    return {
      qs,
      loadingState,
      clearSearch(){
        if(qs.value){
          qs.value = ''
          loadingState.value = false
        }
      },
     async search(){
        if(qs.value){
          loadingState.value = true
          const prefix = 'Libreville+Owendo+Akanda'

          const q = prefix+','+qs.value.split(" ").join('+')
          console.log ("https://nominatim.openstreetmap.org/search?q="+q+"&format=geojson&addressdetails=1&extratags=1&namedetails=1&countrycodes=GA")

          const response = await fetch('https://nominatim.openstreetmap.org/search?q='+q+'&format=geojson&addressdetails=1&extratags=1&namedetails=1&countrycodes=GA');
          const geojsonFeatures = await response.json()
          console.log (geojsonFeatures)

          loadingState.value = false
          L.geoJSON(geojsonFeatures.features, {
            onEachFeature: (feature, layer) => {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.display_name) {
              layer.bindPopup(feature.properties.display_name);
            }
          }
          }).addTo(map);

        }
      }
    }
  }

})
</script>
