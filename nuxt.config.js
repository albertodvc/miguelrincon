const webpack = require('webpack');
const path = require('path');
const fs = require('fs')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'miguelrincon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
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
  router: {
    middleware: 'i18n'
  },
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/parallax.js'
  ],
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  generate: {
    dir: 'dist',
    routes: ['/', '/es-ES']
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },

  build: {
    /*
    ** Run ESLint on save
    */
      extend (config, { isDev, isClient }) {
        config.module.rules.find((rule) => rule.loader === 'url-loader').options.limit = 20000
        const vueLoader = config.module.rules.find(
          ({loader}) => loader === 'vue-loader')
        const { options: {loaders} } = vueLoader || { options: {} }
        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }
        config.module.rules.forEach(rule => {
          changeLoaderOptions(rule.use)
          if (rule.loader && rule.loader === 'vue-loader') {
            rule.options.loaders.html = {
              loader: "img-svg-inline-loader",
              options: {}
            }
          }
        })
      }
    }
}

function changeLoaderOptions(loaders) {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: [
            path.join(process.cwd(), 'node_modules', 'compass-mixins', 'lib'),
            path.join(process.cwd(), 'node_modules', 'modularscale-sass', 'stylesheets'),
            path.join(process.cwd(), "styles")
          ]
        })
      }
    }
  }
}
