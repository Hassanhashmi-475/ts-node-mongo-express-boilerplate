export function formatTimestamp(timestamp: number): string {
  
  const date = new Date(timestamp * 1000)

  
  const year = date.getFullYear()
  const month = date.getMonth() + 1 
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return formattedDateTime
}

