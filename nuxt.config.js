const bodyParser = require('body-parser');
const axios = require('axios');

export default {
  mode: 'universal',//'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Open+Sans" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/core-components.js',
    '~plugins/date-filter.js',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    baseFirebaseUrl: 'https://nuxttest-29d28.firebaseio.com',
    fbAPIKey: ''
  },
  transition:{
    name: 'fade',
    mode: 'out-in'
  },
  serverMiddleware:[
    bodyParser.json(),
    '~/api'
  ],
  generate:{
    routes: function () {

      return axios.get('https://nuxttest-29d28.firebaseio.com/posts.json')
        .then(res=>{
          const routes=[];
          for(const key in res.data){
            routes.push({
              route: '/posts/'+key,
              payload:{
                postData:res.data[key]
              }});
          }
          return routes;
        });
    }
  }
  // router:{
  //   middleware:'log',
  // }
}
