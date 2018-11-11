export default class Duration {
  public mseconds = 0;
  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public days = 0;
  public months = 0;
  public weeks = 0;
  public years = 0;
  constructor(dateTo?: Date, dateFrom?: Date) {
    if (dateTo && dateFrom) {
      this.updateDates(dateTo , dateFrom);
    }
  }

  public updateDates(dateTo: Date, dateFrom: Date) {
    const n = dateTo.getTime() - dateFrom.getTime();
    const msInSeconds = 1000;
    const msInMinute = 60000; // 1000 * 60;
    const msInHour = 3600000; // 1000 * 60 * 60;
    const msInDay = 86400000; // 1000 * 60 * 60 * 24;
    const msInWeek = 604800000; // 1000 * 60 * 60 * 24 * 7;
    const msInMonth = 2629746000; // 1000 * 60 * 60 * 24 * 146097.0 / 4800;
    const msInYear = 31556952000; // 1000 * 60 * 60 * 24 * 146097.0 / 400;

    this.mseconds = n < 0 ? Math.floor(n) : Math.ceil(n);
    this.seconds = Math.floor(this.mseconds / msInSeconds);
    this.minutes = Math.floor(this.mseconds / msInMinute);
    this.hours = Math.floor(this.mseconds / msInHour);
    this.days = Math.floor(this.mseconds / msInDay);
    this.weeks = Math.floor(this.mseconds / msInWeek);
    this.months = Math.floor(this.mseconds / msInMonth);
    this.years = Math.floor(this.mseconds / msInYear);
  }
}
