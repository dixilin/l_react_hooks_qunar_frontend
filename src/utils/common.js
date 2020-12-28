import dayjs from 'dayjs'

export const formatWeek = (date) => {
  const names = ['日', '一', '二', '三', '四', '五', '六']
  return `周${names[Number(dayjs(date).format('d'))]}`
}

export const formatDate = (date) => {
  return dayjs(date).format('M月DD日')
}

export const getNextDate = (date) => {
  const d = dayjs(date).get('date') + 1
  return dayjs(date.slice(0, date.lastIndexOf('-') + 1) + d).format("YYYY-MM-DD")
}

export const getPrevDate = (date) => {
  const d = dayjs(date).get('date') - 1
  return dayjs(date.slice(0, date.lastIndexOf('-') + 1) + d).format("YYYY-MM-DD")
}
