<template>
  <div>
    <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        miguelrincon
      </h1>
      <h2 class="subtitle">
        {{ $t('index.pilla') }} {{$store.locale}}
      </h2>
      <div class="links">
        <nuxt-link class="button--green" to="/performances">About</nuxt-link>
      </div>
    </div>
  </section>
  <section>
    <perfo-list :perfoes="perfoes"/>
  </section>
  </div>
</template>
<style lang="scss">

  .container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
  }

  .links {
    padding-top: 15px;
  }

</style>

<script>
  import AppLogo from '~/components/AppLogo.vue'
  import {createClient} from '~/lib/contentful.js'
  import perfoMap from '~/utils/perfoMap.js'
  import PerfoList from '~/components/perfoes/perfoList/PerfoList.vue'

  const API = createClient()


  export default {
    components: {
      AppLogo,
      PerfoList
    },
    fetch({ store }) {
        store.commit('increment')
      },
      asyncData: async ({store}) => {
        const { items } = await API.getEntries({
          'content_type': 'performance',
          locale: store.state.locale,
          include: 3
        })
        return {
          perfoes: items.map(perfoMap)
        }
      }
  }
</script>


