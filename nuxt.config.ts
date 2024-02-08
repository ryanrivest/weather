// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Weather',
      link: [
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: 'https://fonts.googleapis.com/css?family=Nunito:400,600,700&display=swap',
        },
      ],
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', 'nuxt-headlessui'],
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
