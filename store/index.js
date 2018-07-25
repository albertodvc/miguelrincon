export const state = () => ({
  locales: ['en-US', 'es-ES'],
  locale: 'en-US'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.indexOf(locale) !== -1) {
      state.locale = locale
    }
  }
}
