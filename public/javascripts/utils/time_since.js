export function timeSince(date) {
  date = new Date(date)

  var seconds = Math.abs(Math.floor((new Date() - date) / 1000))

  var interval = Math.floor(seconds / 31536000)

  if (interval >= 1) {
      return interval + " 年前"
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      return interval + " 月前"
  }
  interval = Math.floor(seconds / 86400)
  if (interval >= 1) {
      return interval + " 天前"
  }
  interval = Math.floor(seconds / 3600)
  if (interval >= 1) {
      return interval + " 小時"
  }
  interval = Math.floor(seconds / 60)
  if (interval >= 1) {
      return interval + " 分鐘"
  }
  return Math.floor(seconds) + " 秒"
}
