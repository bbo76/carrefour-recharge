// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // Homepage pre-rendered at build time
    '/*': { cors: true },
  },
  modules: ['@nuxt/ui', '@nuxtjs/apollo'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://api.recharge.carrefour.fr/graphql',
        httpLinkOptions: {
          fetchOptions: {
            mode: 'cors' //Cors Needed for external Cross origins, need to allow headers from server
          },
        },
      }
    },
  },
})
