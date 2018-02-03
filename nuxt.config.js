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
    dir: 'docs'
  },
  router: {
    base: '/miguelrincon/'
  },
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        config.plugins.push(
          new webpack.DefinePlugin({
            'process.env.CTF_SPACE_ID': JSON.stringify(process.env.CTF_SPACE_ID),
            'process.env.CTF_CDA_ACCESS_TOKEN': JSON.stringify(process.env.CTF_CDA_ACCESS_TOKEN)
          })
        )
      }
    }
  }
}
