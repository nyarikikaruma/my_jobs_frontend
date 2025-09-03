// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   modules: [
     '@nuxtjs/tailwindcss',
     '@pinia/nuxt'
  ],
   nitro: {
    devProxy: {
      '/api': {
        target: 'https://62.171.190.239',
        changeOrigin: true,
        secure: false, // Accept self-signed SSL certificates
      },
    },
  },
})
