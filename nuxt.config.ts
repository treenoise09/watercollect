// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr : false,
  runtimeConfig : {
    public : {
      apiURL : process.env.NUXT_API_URL || 'http://localhost:8000'
    }
  },
  modules: ["@nuxtjs/tailwindcss","nuxt-icon"]
})
