<template>

  <ul class="perfo-list">
    <li class="perfo-list__year"
      v-for="year in dates"
      :key="year.year">
      <h3 class="perfo-list__year-label $$ year">{{ year.year }}</h3>
      <ul class="perfo-list__months $$ year-performances">
        <li class="perfo-list__month"
          v-for="month in year.months"
          :key="year.year+month.month">
          <h4 class="perfo-list__month-label $$ month">{{ $t('dates.months.'+month.month) }}</h4>
          <ul class="perfo-list__perfoes $$ month-performances">
            <li class="perfo-list__perfo $$ performance"
              v-for="perfo in month.perfoes"
              :key="perfo._id"
              itemprop="event" itemscope itemtype="http://schema.org/MusicEvent">
              <perfo class="perfo-list__perfo__component"
                :perfo="perfo"/>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

</template>

<script>

  import Perfo from '~/components/Perfo.vue'
  import EventsToCalendar from '~/utils/eventsToCalendar.js'

  export default {
    components: {
      Perfo
    },
    props: ['parameters'],
    computed: {
      dates: function () {
        return EventsToCalendar(this.parameters.performances)
      }
    }
  }

</script>
