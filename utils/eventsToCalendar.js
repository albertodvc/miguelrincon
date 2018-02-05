export default (events) => {
  const years = []
  const year = null
  const month = null

  events.map( perfo => {
    perfo.date = new Date(perfo.date)
    return perfo
  }).forEach( (perfo, idx) => {
    let prevEvent = events[idx-1]
    if (!prevEvent || prevEvent.date.getYear() != perfo.date.getYear()) {
      years.push({
        year: perfo.date.getFullYear(),
        months: [
          {
            month: perfo.date.getMonth(),
            perfoes: [perfo]
          }
        ]
      })
    } else if (!prevEvent || prevEvent.date.getMonth() != perfo.date.getMonth()) {
      years[years.length-1].months.push({
        month: perfo.date.getMonth(),
        perfoes: [perfo]
      })
    } else {
      years[years.length-1].months[years[years.length-1].months.length-1].perfoes.push(perfo)
    }
  });
  return years
}
