import Vue from 'vue';
import Vuex from 'vuex';
// import { addRenderMergeStrategy } from './utility';
import store from './store';
import App from './App';

// addRenderMergeStrategy();

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  render: h => h(App),
  store: new Vuex.Store(store),
}).$mount('#app');
