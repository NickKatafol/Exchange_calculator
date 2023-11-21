// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/scss/utils.scss"; 
                           @import "@/assets/scss/constants.scss";
                           `
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  extends: ['./domains/main', './domains/about']
})
