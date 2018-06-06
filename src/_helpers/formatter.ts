// @ts-ignore
import numeral from 'numeral'

function always2DigitNumber(number: number) {
  if (number >= 10) { return '' + number; }
  return '0' + number;
}

function hour24ToAmPm(hour: number) {
  if (hour === 0) { return { time: 'AM', hour: 12 } }
  else if (hour < 12) { return { time: 'AM', hour } }
  else if (hour === 12) { return { time: 'PM', hour } }
  return { time: 'PM', hour: hour - 12 }
}

export function convertToPriceFormat(number?: number) {
  if (number === undefined) { return '-'; }
  return numeral(number).format('$0,0');
}

export function convertToDateFormat(isoDate: string) {
  const date = new Date(isoDate);

  const year = always2DigitNumber(date.getFullYear());
  const month = always2DigitNumber(date.getMonth() + 1);
  const day = always2DigitNumber(date.getDate());
  const hour = always2DigitNumber(date.getHours());
  const min = always2DigitNumber(date.getMinutes());
  return `${year}-${month}-${day} ${hour}:${min}`
}
