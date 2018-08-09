<template>

  <section :id="section">
    <header>
      <h2>{{ section }}</h2>
    </header>
    <article>
      <component class="content" :is="section" v-bind="{ parameters: parameters }"></component>
      <blockquote>
        <p>{{ parameters.quote.text }}</p>
        <p>{{ parameters.quote.author }}</p>
      </blockquote>
    </article>

  </section>

</template>

<script>

  import FrontPage from '~/components/FrontPage.vue'
  import Performances from '~/components/Performances.vue'
  import Records from '~/components/Records.vue'

  export default {
    components: {
      FrontPage,
      Performances,
      Records
    },
    props: ['section', 'parameters']
  }

</script>
