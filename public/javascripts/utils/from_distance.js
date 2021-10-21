
export function formatDistance(distance) {
  if (distance < 1000) {
    return Math.round(distance/100)*100 + '公尺'
  }
  else
    return Math.round(distance/1000) + '公里'
}
