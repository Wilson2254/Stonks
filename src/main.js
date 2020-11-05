import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({
    projectId: "stonks-15f3f",
    databaseURL: "https://stonks-15f3f.firebaseio.com"
})
export const db = firebase.firestore()


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')