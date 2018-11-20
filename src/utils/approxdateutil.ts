export default class ApproxDateUtil {
    public static getApproximateDays(
        years = 0,
        months = 0,
        weeks = 0,
        days = 0,
        hours = 0,
        minutes = 0,
        seconds = 0): number {
        const daysInSeconds = 1. / 86400;
        const daysInMinute = 60.0 / 86400; // 1000 * 60;
        const daysInHour = 3600.0 / 86400; // 1000 * 60 * 60;
        const daysInDay = 1; // 1000 * 60 * 60 * 24;
        const daysInWeek = 7; // 1000 * 60 * 60 * 24 * 7;
        const daysInMonth = 2629746.0 / 86400; // 1000 * 60 * 60 * 24 * 146097.0 / 4800;
        const daysInYear = 31556952.0 / 86400; // 1000 * 60 * 60 * 24 * 146097.0 / 400;

        return Math.floor (
            seconds * daysInSeconds +
            minutes * daysInMinute +
            hours * daysInHour +
            days * daysInDay +
            weeks * daysInWeek +
            months * daysInMonth +
            years * daysInYear,
          );
    }
  }
