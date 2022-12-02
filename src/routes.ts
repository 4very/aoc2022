import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'
import Day from './views/Day.vue'

export const routes = [
  { path: '/', component: Home, meta: { title: 'Home' }},
  { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' }},
  { path: '/day/:dayNumber', component: Day},

]
