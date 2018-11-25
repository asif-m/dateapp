import DateUtil from '../utils/dateutil';

export default class DateTimeFormatFilter {
  public static formatDate(date: Date) {
      return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear();
  }
  public static formatDateTime(date: Date) {
    const timeStr = DateTimeFormatFilter._getTimeString(date);
    return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
      DateUtil.getMonthString(date.getMonth()) + ' ' +
      date.getFullYear() +
      (timeStr ? ' @ ' + timeStr : '');
  }
  public static formatDateTimeWithWeek(date: Date) {
    const timeStr = DateTimeFormatFilter._getTimeString(date);
    return DateUtil.getWeekDayName(date) + ', ' +
      DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
      DateUtil.getMonthString(date.getMonth()) + ' ' +
      date.getFullYear() +
      (timeStr ? ' @ ' + timeStr : '');
  }
  public static formatDateTime12Hrs(date: Date) {
    const timeStr = DateTimeFormatFilter._getTimeString12Hrs(date);
    return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
      DateUtil.getMonthString(date.getMonth()) + ' ' +
      date.getFullYear() +
      (timeStr ? ' @ ' + timeStr : '');
  }
  private static _getZeroAppendedString(n: number) {
    return n < 10 ? '0' + n : n;
  }
  private static _getTimeString(date: Date) {
    const hours = date.getHours();
    const mins = date.getMinutes();
    if (hours === 0 && mins === 0) {
      return '';
    }
    return DateTimeFormatFilter._getZeroAppendedString(hours) + ':' +
    DateTimeFormatFilter._getZeroAppendedString(mins);
  }
  private static _getTimeString12Hrs(date: Date) {
    const hours = date.getHours();
    const mins = date.getMinutes();
    if (hours === 0 && mins === 0) {
      return '';
    }
    return  DateTimeFormatFilter._getZeroAppendedString((hours > 12 ? (hours - 12) : hours)) + ':' +
    DateTimeFormatFilter._getZeroAppendedString(mins) + ' ' +
      (hours >= 12 ? 'PM' : 'AM');
  }
}
