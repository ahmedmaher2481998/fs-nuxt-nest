export default defineNuxtConfig({
  compatibilityDate: '2024-11-17',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  runtimeConfig: {
    public: {
      backendApiUrl: process.env.BACKEND_API_URL || 'http://localhost:3001',
    },
  },

  app: {
    head: {
      title: 'نظام طلبات التصاريح - Permit Request Service',
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'نظام طلبات التصاريح - Permit Request Service Portal',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: '/main.css',
        },
      ],
    },
  },

  nitro: {
    devServer: {
      host: '0.0.0.0',
      port: 3000,
    },
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 3000,
      watch: {
        usePolling: true,
      },
    },
  },
})
