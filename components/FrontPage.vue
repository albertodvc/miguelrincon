<template>

  <p>
    <vue-markdown>{{ parameters.bio }}</vue-markdown>
  </p>

</template>

<script>

  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      VueMarkdown
    },
    props: ['parameters'],
  }

</script>
