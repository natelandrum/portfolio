// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import svgLoader from 'vite-svg-loader'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss(), svgLoader()]
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  runtimeConfig: {
    PUSHOVER_API_TOKEN: process.env.PUSHOVER_API_TOKEN,
    PUSHOVER_USER_KEY: process.env.PUSHOVER_USER_KEY,
  },
})