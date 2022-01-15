import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export default {
  // 扁平化数组
  flatten(arr: any) {
    return arr.reduce((result: any, item: any) => {
      return result.concat(Array.isArray(item) ? this.flatten(item) : item);
    }, []);
  },

  // 时间转换
  formatTime(value: string, fmt: any = 'YYYY-MM-DD hh:mm:ss') {
    return dayjs.utc(value).utcOffset(8).format(fmt)
  },

  // 将字符串的首字母转大写
  upperFrist(value: string) {
    return `${value.slice(0, 1).toUpperCase() + value.slice(1, value.length)}`
  }
}
