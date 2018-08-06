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
    <section id="discography" class="alt">
      <header>
        <h2>REcords</h2>
      </header>
      <article>
        <record-list class="content" :records="records"/>
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
  import recordMap from '~/utils/recordMap.js'
  import PerfoList from '~/components/perfoes/perfoList/PerfoList.vue'
  import RecordList from '~/components/RecordList.vue'

  const API = createClient()


  export default {
    components: {
      VueMarkdown,
      PerfoList,
      RecordList
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
        const records = await API.getEntries({
          'content_type': 'record',
          locale: store.state.locale,
          include: 3
        })
        return {
          perfoes: perfoes.items.map(perfoMap),
          records: records.items.map(recordMap),
          bio: bio.items[0].fields.text

        }
      }
  }
</script>


