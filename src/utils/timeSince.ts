export const timeSince = (date: number) => {
  let dateNow = Math.floor(Date.now() / 1000)
  let seconds = Math.floor(dateNow - date)
  let interval = seconds / 31536000

  if (interval > 1) {
    if (Math.floor(interval) === 1) return Math.floor(interval) + ' year'
    return Math.floor(interval) + ' years'
  }
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
