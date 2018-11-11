export default class DateTimeFormatFilter {
  public static formatDate(date: Date) {
      return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
        DateTimeFormatFilter._getMonthString(date.getMonth()) + ' ' +
        date.getFullYear();
  }
  public static formatDateTime(date: Date) {
    const timeStr = DateTimeFormatFilter._getTimeString(date);
    return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
      DateTimeFormatFilter._getMonthString(date.getMonth()) + ' ' +
      date.getFullYear() +
      (timeStr ? ' @ ' + timeStr : '');
  }
  public static formatDateTime12Hrs(date: Date) {
    const timeStr = DateTimeFormatFilter._getTimeString12Hrs(date);
    return DateTimeFormatFilter._getZeroAppendedString(date.getDate()) + ' ' +
      DateTimeFormatFilter._getMonthString(date.getMonth()) + ' ' +
      date.getFullYear() +
      (timeStr ? ' @ ' + timeStr : '');
  }
  private static _getMonthString(month: number) {
    switch(month) {
      case 0: return 'Jan';
      case 1: return 'Feb';
      case 2: return 'Mar';
      case 3: return 'Apr';
      case 4: return 'May';
      case 5: return 'Jun';
      case 6: return 'Jul';
      case 7: return 'Aug';
      case 8: return 'Sep';
      case 9: return 'Oct';
      case 10: return 'Nov';
      case 11: return 'Dec';
      default : return '';
    }
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
