import type { UserModule } from './types'
import VueCarousel from '@chenfengyuan/vue-carousel'
import { setupLayouts } from 'virtual:generated-layouts'

import { ViteSSG } from 'vite-ssg'
import Vue3TouchEvents from 'vue3-touch-events'
import { trackRouter } from 'vue-gtag-next'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'leaflet/dist/leaflet.css'
import './styles/css-vars.scss'
import './styles/index.scss'

import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))

    // track pageview
    trackRouter(ctx.router)

    ctx.app.use(Vue3TouchEvents)
  },
)
