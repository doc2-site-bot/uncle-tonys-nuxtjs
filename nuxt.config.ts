// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      project: '1yAR0vQ6Di6va7X4Rtd-004iajFdNSH_v',
      mapsKey: 'AIzaSyDVLquTAWKVDTDeJn9_HRK6OAemT_UOb14'
    }
  },
  typescript: {
    strict: true
  }
});
