import { defineStore } from 'pinia'
import {ref, computed, toRaw} from 'vue'
import { Notify } from 'quasar'
export const useCompteurStore = defineStore('compteur', {
  state: () => ({ compteurs: []}),
  getters: {
    getCompteurs    :     (state) => state.compteurs,
    getUserCompteur :     (state) => {
      return              (user_id) =>  state.compteurs.filter(( obj ) =>   obj.user_id === user_id );
    },
    getUserCompteurFeatured :     (state) => {
      return              (user_id) =>  state.compteurs.filter(( obj ) =>   obj.user_id === user_id && obj.home === true );
    },
    getUserCompteurFilter :     (state) => {
      return              (user_id, qs) => {
        if(!qs){ return state.compteurs.filter(( obj ) =>   obj.user_id === user_id ) }
        return  state.compteurs.filter((obj) => obj.user_id === user_id &&  obj.name.toLowerCase().indexOf(qs.toLowerCase()) !== -1)
      }
    },
    findByKey:   (state) => {
      return (key, value) => state.compteurs.find((list) =>  list[`${key}`] === value )
    },

  },
  actions: {
    refreshCompteurs(){
     const  compteurs = toRaw(this.getCompteurs)
      compteurs.map((c) =>{
        if(c.unite > 0){
          let min = c.unite - 1
          let  unite  =  Math.floor(Math.random() * (c.unite - min) + min)
          if(unite <= c.seuil){
            Notify.create({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: `Le compteur ${c.name} a atteint son seuil de consommation. Veuillez le recharger`,
              position : 'top'
            })
          }
          this.saveItem({...c, unite : unite})
        }
      } )
      // for(let c in compteurs){
      //   console.info(c)
      //   if(c.unite > 0){
      //     let  unite  =  Math.floor(Math.random() * c.unite)
      //     this.saveItem({...c, unite : unite})
      //   }
      // }
    },
    saveItem(item) {
      if(this.findByKey('id', item.id)){
        this.removeItem(item.id)
        this.compteurs.push(item)
        return{
          success : true,
          error   : ''
        }
      }
      let i = this.compteurs.length

      this.compteurs.push({...item, id : ++i})
      return{
        success : true,
        error   : ''
      }
    },
   // findByKey(key, value){
   //    return  this.compteurs.find(function(list) { return list[`${key}`] === value })
   //  },
    /**
     * Remove item from the cart
     * @param {string} name
     */
   removeItem(id) {
    this.compteurs = this.compteurs.filter(function( obj ) {
        return obj.id !== id;
      });
    }
  },
  persist: {
    enabled: true
  }
})
