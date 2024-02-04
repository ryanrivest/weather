// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Weather',
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    weather: {
      apiKey: '',
      apiBaseUrl: 'https://api.weatherapi.com/v1/',
    },
    public: {
      apiBaseUrl: '/api/',
    },
  },
});
