export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  env:{
    PGREST : 'https://api.fd49.synology.me:5001/',
    FILESAPI : 'http://localhost:3001/'
  },
  head: {
    title: 'webform_emp',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  publicRuntimeConfig: {
    PGREST: process.env.PGREST,
    FILESAPI : process.env.FILESAPI
  },
  privateRuntimeConfig: {
    PGREST: process.env.PGREST,
    FILESAPI : process.env.FILESAPI
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
  ],
  bootstrapVue: {
    icons: true,
},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {}) {
        config.node = {
            fs: 'empty'
        }
    }
},
}
