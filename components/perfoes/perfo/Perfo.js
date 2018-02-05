
import getCalendarDay from '../../../utils/getCalendarDay'

export default {
  props: ['perfo'],
  computed: {
    day: function () {
      return getCalendarDay(this.perfo.date)
    }
  }
}
