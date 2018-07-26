import Perfo from '../perfo/Perfo.vue'
import EventsToCalendar from '~/utils/eventsToCalendar.js'

export default {
  components: {
    Perfo
  },
  props: ['perfoes'],
  computed: {
    dates: function () {
      return EventsToCalendar(this.perfoes)
    }
  }
}
