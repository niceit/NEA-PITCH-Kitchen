import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index'
import Toasted from 'vue-toasted'
import VueSweetalert2 from 'vue-sweetalert2'
import en from './locales/en.json'
import ar from './locales/ar.json'
import he from './locales/he.json'
import VueI18n from 'vue-i18n'
import BootstrapVue from 'bootstrap-vue'
import { constants } from './constants'
import { VueSelect } from 'vue-select'
import 'vue-select/dist/vue-select.css'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Toasted, {
    iconPack: 'fontawesome'
})
Vue.use(VueSweetalert2)
Vue.component('v-select', VueSelect)

const moment = require('moment')
Vue.use(require('vue-moment'), {
    moment
})

Vue.use(VueI18n)
const messages = { en: en, ar: ar, he: he }
const defaultLocale = constants.defaultLocale
const locale = localStorage.getItem('currentLanguage') ? localStorage.getItem('currentLanguage') : defaultLocale
const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: constants.defaultLocale,
    messages
})

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
