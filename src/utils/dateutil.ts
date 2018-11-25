import { ReminderDataNode } from '../models/reminderdatanode';

export default class DateUtil {
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
    public static getMonthString(month: number) {
        switch (month) {
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
    public static getWeekDayName(date: Date): string {
        switch (date.getDay()) {
            case 0: return 'Sun';
            case 1: return 'Mon';
            case 2: return 'Tue';
            case 3: return 'Wed';
            case 4: return 'Thu';
            case 5: return 'Fri';
            case 6: return 'Sat';
            default: return '';
        }
    }
    public static getHijriMonthName(month: number): string {
        switch (month) {
            case 0: return `Muharram`;
            case 1: return `Safar`;
            case 2: return `Rabi'ul Awwal`;
            case 3: return `Rabi'ul Akhir`;
            case 4: return `Jumadal Ula`;
            case 5: return `Jumadal Akhira`;
            case 6: return `Rajab`;
            case 7: return `Sha'ban`;
            case 8: return `Ramadan`;
            case 9: return `Shawwal`;
            case 10: return `Dhul Qa'ada`;
            case 11: return `Dhul Hijja`;
            default : return '' ;
        }
    }
    public static addReminderToDate(orgDate: Date, reminder: ReminderDataNode): Date {
        const date = new Date(orgDate);
        if (reminder.years) {
          date.setFullYear(orgDate.getFullYear() + reminder.years);
        }
        if (reminder.months) {
          date.setMonth(orgDate.getMonth() + reminder.months);
        }
        if (reminder.days + 7 * reminder.weeks) {
          date.setDate(orgDate.getDate() + reminder.days + 7 * reminder.weeks);
        }
        if (reminder.hours) {
          date.setHours(date.getHours() + reminder.hours);
        }
        if (reminder.minutes) {
          date.setMinutes(date.getMinutes() + reminder.minutes);
        }
        if (reminder.seconds) {
          date.setSeconds(date.getSeconds() + reminder.seconds);
        }
        return date;
    }
    public static getHijriDateTime(date: Date, adjustments = 0) {
        const hijriDate = DateUtil.calculateHijriDate(date, adjustments);
        return  hijriDate.day + ' ' + DateUtil.getHijriMonthName(hijriDate.month) + ' ' + hijriDate.year;
    }
    public static formatDate(date: Date) {
      return DateUtil.getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear();
    }
    public static formatDateWithWeek(date: Date) {
      return  DateUtil.getWeekDayName(date) + ', ' +
        DateUtil.getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear();
    }
    public static formatDateTime(date: Date) {
      const timeStr = DateUtil.getTimeString(date);
      return DateUtil.getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear() +
        (timeStr ? ' @ ' + timeStr : '');
    }
    public static formatDateTimeWithWeek(date: Date) {
      const timeStr = DateUtil.getTimeString(date);
      return DateUtil.getWeekDayName(date) + ', ' +
        DateUtil.getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear() +
        (timeStr ? ' @ ' + timeStr : '');
    }
    public static formatDateTime12Hrs(date: Date) {
      const timeStr = DateUtil.getTimeString12Hrs(date);
      return DateUtil.getZeroAppendedString(date.getDate()) + ' ' +
        DateUtil.getMonthString(date.getMonth()) + ' ' +
        date.getFullYear() +
        (timeStr ? ' @ ' + timeStr : '');
    }
    private static getTimeString(date: Date) {
      const hours = date.getHours();
      const mins = date.getMinutes();
      if (hours === 0 && mins === 0) {
        return '';
      }
      return DateUtil.getZeroAppendedString(hours) + ':' +
      DateUtil.getZeroAppendedString(mins);
    }
    private static getTimeString12Hrs(date: Date) {
      const hours = date.getHours();
      const mins = date.getMinutes();
      if (hours === 0 && mins === 0) {
        return '';
      }
      return  DateUtil.getZeroAppendedString((hours > 12 ? (hours - 12) : hours)) + ':' +
        DateUtil.getZeroAppendedString(mins) + ' ' +
        (hours >= 12 ? 'PM' : 'AM');
    }
    private static getZeroAppendedString(n: number) {
      return n < 10 ? '0' + n : n;
    }
    private static calculateHijriDate(date: Date, adjustDays: number) {
        const gmod = (n: number, mod: number) => ((n % mod) + mod ) % mod;
        if (adjustDays) {
          date = new Date(date.getTime() + 1000 * 60 * 60 * 24 * adjustDays);
        }
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        let m = month + 1;
        let y = year;
        if (m < 3) {
          y -= 1;
          m += 12;
        }
        let a = Math.floor(y / 100.);
        let b = 2 - a + Math.floor(a / 4.);
        if (y < 1583) {
          b = 0;
        }
        if (y === 1582) {
          if (m > 10) {
            b = -10;
          }
          if (m === 10) {
            b = 0;
            if (day > 4) {
              b = -10;
            }
          }
        }
        const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * ( m + 1)) + day + b - 1524;
        b = 0;
        if (jd > 2299160) {
          a = Math.floor((jd - 1867216.25) / 36524.25);
          b = 1 + a - Math.floor(a / 4.);
        }
        const bb = jd + b + 1524;
        let cc = Math.floor((bb - 122.1) / 365.25);
        const dd = Math.floor(365.25 * cc);
        const ee = Math.floor((bb - dd) / 30.6001);
        day = (bb - dd) - Math.floor(30.6001 * ee);
        month = ee - 1;
        if (ee > 13) {
          cc += 1;
          month = ee - 13;
        }
        year = cc - 4716;
        let wd;
        if (adjustDays) {
          wd = gmod(jd + 1 - adjustDays, 7) + 1;
        } else {
          wd = gmod(jd + 1 , 7 ) + 1;
        }
        const iyear = 10631. / 30.;
        const epochastro = 1948084;
        // let epochcivil = 1948085;
        const shift1 = 8.01 / 60.;
        let z = jd - epochastro;
        const cyc = Math.floor(z / 10631.);
        z = z - 10631 * cyc;
        const j = Math.floor((z - shift1 ) / iyear);
        const iy = 30 * cyc + j;
        z = z - Math.floor( j * iyear + shift1);
        let im = Math.floor((z + 28.5001) / 29.5);
        if (im === 13) {
          im = 12;
        }
        const id = z - Math.floor(29.5001 * im - 29);
        return {
          day: id,
          month: im - 1,
          year : iy,
          weekDayNumber : wd - 1,
          julianDayNumber : jd - 1,
          CEDay  : day,
          CEMonth : month - 1,
          CEYear : year,
        };
    }
  }
