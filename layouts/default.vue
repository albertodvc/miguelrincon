<template>
  <div itemscope itemtype="http://schema.org/MusicGroup">
    <app-header/>
    <nuxt/>
    <app-footer/>
  </div>
</template>

<script>

  import AppHeader from '~/components/AppHeader.vue'
  import AppFooter from '~/components/AppFooter.vue'

  export default {
    components: {
      AppHeader,
      AppFooter
    }
  }

</script>

<style>
</style>
