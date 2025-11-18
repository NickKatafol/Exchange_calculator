// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils'],
  css: [
    '~/assets/scss/main.scss', 
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/utils.scss"; 
                           @import "@/assets/scss/constants.scss";
                           `
        },
      },
    },
  },
  extends: ['./app/domains/main', './app/domains/about']
})