function doubleDate(date) {
  return date < 10 ? '0' + date : date
}
export default function (input, type = 'yyyy-MM-dd HH:mm:ss') {
  if (typeof input === 'number' && input.toString().length === 10) {
    input = input * 1000
  }
  var date = new Date(input)
  var o = {
    yyyy: date.getUTCFullYear(),
    MM: doubleDate(date.getUTCMonth() + 1), // 月份
    dd: doubleDate(date.getUTCDate()), // 日
    hh: date.getUTCHours() >= 12 ? doubleDate(date.getUTCHours() - 12) : doubleDate(date.getUTCHours()), // 小时
    HH: doubleDate(date.getUTCHours()), // 小时
    mm: doubleDate(date.getUTCMinutes()), // 分
    ss: doubleDate(date.getUTCSeconds()) // 秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(type)) {
      type = type.replace(RegExp.$1, o[k])
    }
  }
  return type
}
