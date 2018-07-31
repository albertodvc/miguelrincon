<template>
  <div>
    <section id="front-page">
      <header>
        <h2>Miguel Rincón</h2>
      </header>
      <article>
        <div class="content">
          <p>
            <vue-markdown>{{ bio }}</vue-markdown>
          </p>
        </div>
      </article>
    </section>
    <section id="next-performances">
      <header>
        <h2>NExt perfoes</h2>
      </header>
      <article>
        <perfo-list class="content" :perfoes="perfoes"/>
      </article>
    </section>
  </div>
</template>
<style lang="scss">

  section {
    > header {
      height: 100vh;
    }
  }

</style>

<script>
  import VueMarkdown from 'vue-markdown'
  import {createClient} from '~/lib/contentful.js'
  import perfoMap from '~/utils/perfoMap.js'
  import PerfoList from '~/components/perfoes/perfoList/PerfoList.vue'

  const API = createClient()


  export default {
    components: {
      VueMarkdown,
      PerfoList
    },
    fetch({ store }) {
        store.commit('increment')
      },
      asyncData: async ({store}) => {
        const perfoes = await API.getEntries({
          'content_type': 'performance',
          locale: store.state.locale,
          order: 'fields.date',
          // 'fields.date[gte]': new Date(),
          include: 3
        })
        const bio = await API.getEntries({
          'content_type': 'bio',
          locale: store.state.locale,
        })
        console.log('biobio', bio);
        return {
          perfoes: perfoes.items.map(perfoMap),
          bio: bio.items[0].fields.text
        }
      }
  }
</script>


