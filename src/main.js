import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import router from './routes'
import store from './store';

import { MdCard,MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueResource);
Vue.use(MdCard);
Vue.use(MdButton);
Vue.use(MdField);

Vue.http.options.root = "https://user-application-abd6a.firebaseio.com/";



new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
