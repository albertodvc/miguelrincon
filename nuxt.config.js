const webpack = require('webpack');

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
  generate: {
    dir: 'dist'
    //dir: '/Users/nano/tmp/dist'
  },
  router: {
    base: '/miguelrincon/'
  },
  env: {
    CTF_SPACE_ID: "wq03v81twbog",//process.env.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: "b5939dc4dd96813e43c64eefd0743a2b273b7ad94d449d4621183823ab897f65"//process.env.CTF_CDA_ACCESS_TOKEN
  },
  buildDir: 'tmp',
  //buildDir: '/Users/nano/tmp/build',
}
