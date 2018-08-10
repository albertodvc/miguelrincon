<template>

  <div>
    <vue-markdown>{{ parameters.bio }}</vue-markdown>
  </div>

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
