// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr : false,
  runtimeConfig : {
    public : {
      base_url : process.env.BASE_URL || 'http://localhost:8000',
      env: process.env.ENV || 'local'
    }
  },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon"]
})
