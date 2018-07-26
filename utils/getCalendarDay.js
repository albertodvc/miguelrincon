const getCalendarDay = (date) => {
  let day = date.getDate()
  return Number(day) < 10 ? '0'+day : String(day)
}

export default getCalendarDay
