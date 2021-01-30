export const timeSince = (date: number | string) => {
  let parsedDate: number
  if (typeof date === 'string') {
    parsedDate = Date.parse(date)
  } else {
    parsedDate = date
  }
  let dateNow = Date.now()
  let seconds = Math.floor(dateNow - parsedDate) / 1000
  let interval = seconds / 31536000

  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' year'
    return Math.floor(interval) + ' years'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' month'
    return Math.floor(interval) + ' months'
  }
  interval = seconds / 86400
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' day'
    return Math.floor(interval) + ' days'
  }
  interval = seconds / 3600
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' hour'
    return Math.floor(interval) + ' hours'
  }
  interval = seconds / 60
  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' minute'
    return Math.floor(interval) + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}
