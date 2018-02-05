const getCalendarDay = (date) => {
  let day = date.getDay()
  return day < 10 ? '0'+day : String(day)
}

export default getCalendarDay
