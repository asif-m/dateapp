import DateUtil from '../utils/dateutil';

export default class DateTimeFormatFilter {
  public static formatDate(date: Date) {
    return DateUtil.formatDate(date);
  }
  public static formatDateTime(date: Date) {
    return DateUtil.formatDateTime(date);
  }
  public static formatDateTimeWithWeek(date: Date) {
    return DateUtil.formatDateTimeWithWeek(date);
  }
  public static formatDateTime12Hrs(date: Date) {
    return DateUtil.formatDateTime12Hrs(date);
  }
}
