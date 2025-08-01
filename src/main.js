import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCoffee)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
