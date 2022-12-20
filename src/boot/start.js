import { boot } from "quasar/wrappers";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import {LocalStorage} from "quasar";
//
// import { Plugins, StatusBarStyle } from '@capacitor/core';
//
// const { StatusBar } = Plugins;
//
// StatusBar.setOverlaysWebView(false);
//
// // set status bar to white
// StatusBar.setBackgroundColor('#1976D2')

/*const setName = async () => {
  await Preferences.set({
    key: 'firstLaunch',
    value: '1',
  });
};

 */
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router, app }) => {
  const pinia =  createPinia().use(piniaPluginPersistedstate)
  app.use(pinia);
  app.provide(/* key */ 'appName', /* value */ 'Leaflet')


 /* router.beforeEach(async (to, from, next) => {
    const   user             = useUserStore()
    const  {status, data }   = await authService.getUser()
    if(status == 200 ){
      user.setUsername (data.username)
      user.setAccess_token ( data.access_token)
    }
    next()
  })*/




});
