<template>
  <section class="container">
    <ul>
      <perfo-list :perfoes="perfoes"/>
    </ul>
  </section>
</template>

<script>
import {createClient} from '../lib/contentful.js'
import perfoMap from '../utils/perfoMap.js'
import PerfoList from '../components/perfoes/perfoList/PerfoList.vue'

const API = createClient()

export default {
  components: {
    PerfoList
  },
  asyncData: async () => {
    const { items } = await API.getEntries({
      'content_type': 'performance',
      include: 3
    })
    return {
      perfoes: items.map(perfoMap)
    }
  }
}
</script>

<style>
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
