<template>
  <div>
    <app-section v-for="section in sections"
      :key="section.key"
      :parameters="section.params"
      :section="section.key">
      <video-player v-if="section.video" :video="section.video">
        <span v-if="section.title" class="miguel">{{ section.title }}</span>
      </video-player>
    </app-section>
  </div>
</template>

<script>

  import {createClient} from '~/lib/contentful.js'
  import perfoMap from '~/utils/perfoMap.js'
  import recordMap from '~/utils/recordMap.js'
  import AppSection from '~/components/AppSection.vue'
  import VideoPlayer from '~/components/VideoPlayer.vue'

  const API = createClient()

  export default {
    components: {
      AppSection,
      VideoPlayer
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
        order: '-fields.date',
        include: 3
      })
      const quotes = await API.getEntries({
        'content_type': 'quote',
        locale: store.state.locale,
      })
      return {
        sections: [
          {
            key: 'frontPage',
            title: 'Miguel Rincón',
            video: {
              id: 'vJPVS_uZitI'
            },
            params: {
              preloadImg: '~/assets/images/frontPageBg.jpg',
              bio: bio.items[0].fields.text,
              quote: quotes.items.find( quote => quote.fields.section === 'Front Page').fields
            }
          },
          {
            key: 'performances',
            params: {
              performances: perfoes.items.map(perfoMap).slice(0, 10),
              quote: quotes.items.find( quote => quote.fields.section === 'Performances').fields
            }
          },
          {
            key: 'records',
            params: {
              records: records.items.map(recordMap),
              quote: quotes.items.find( quote => quote.fields.section === 'Records').fields
            }
          }
        ]
      }
    },
    head () {
      return {
        title: this.$t('meta.title'),
        meta: [
          { hid: 'description', name: 'description', content: this.$t('meta.keywords') }
        ]
      }
    }
  }
</script>


