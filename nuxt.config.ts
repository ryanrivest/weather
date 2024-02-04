// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
