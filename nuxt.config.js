const webpack = require('webpack');

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
  router: {
    middleware: 'i18n'
  },
  plugins: ['~/plugins/i18n.js'],
  generate: {
    dir: 'dist',
    routes: ['/', '/performances', '/es-ES', '/es-ES/performances']
  },
  // router: {
  //   base: '/miguelrincon/'
  // },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
  buildDir: 'tmp',
  //buildDir: '/Users/nano/tmp/build',
}
