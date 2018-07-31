const webpack = require('webpack');
const path = require('path');

console.log("init", process.env.CTF_SPACE_ID)

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'miguelrincon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Miguel rincon isomorphic website' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '@/assets/sass/style.scss'
  ],
  router: {
    middleware: 'i18n'
  },
  plugins: ['~/plugins/i18n.js'],
  generate: {
    dir: 'dist',
    routes: ['/', '/es-ES']
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
  build: {
    extend(config) {
      for (const rule of config.module.rules) {
        if (rule.use) {
          for (const use of rule.use) {
            if (use.loader === 'sass-loader') {
              use.options = use.options || {};
              use.options.includePaths = [
                path.join(process.cwd(), 'node_modules', 'compass-mixins', 'lib'),
                path.join(process.cwd(), 'node_modules', 'modularscale-sass', 'stylesheets')
              ];
            }
          }
        }
      }
    },
  }
}
