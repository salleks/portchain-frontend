export const formatDate = (date : Date) => {
  const _date = new Date(date)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute:'2-digit'}
  return  new Intl.DateTimeFormat(undefined,options).format(_date)
}
