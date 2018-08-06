<template>
  <ul class="record-list && records">
    <li
      v-for="record in records"
      :key="record.title">
      <record :record="record"/>
    </li>
  </ul>
</template>

<script>

  import Record from './Record.vue'

  export default {
    components: {
      Record
    },
    props: ['records']
  }
</script>
