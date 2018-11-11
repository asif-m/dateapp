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
  public static formatDateInHijri(date: Date, adjustments = 0) {
    const iMonthNames = [
      `Muharram`, `Safar`, `Rabi'ul Awwal`, `Rabi'ul Akhir`,
      `Jumadal Ula`, `Jumadal Akhira`, `Rajab`, `Sha'ban`,
      `Ramadan`, `Shawwal`, `Dhul Qa'ada`, `Dhul Hijja`];
    const hijriDate = DateTimeFormatFilter.calculateHijriDate(date, adjustments);
    return  hijriDate.day + ' ' + iMonthNames[hijriDate.month] + ' ' + hijriDate.year;
  }

  private static gmod(n: number, m: number) {
    return ((n % m) + m ) % m;
  }

  private static calculateHijriDate(date: Date, adjustDays: number){
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
      if(m === 10) {
        b = 0;
        if (day > 4){
          b = -10;
        }
      }
    }
  
    let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * ( m + 1)) + day + b - 1524;
  
    b = 0;
    if (jd > 2299160){
      a = Math.floor((jd - 1867216.25) / 36524.25);
      b = 1 + a - Math.floor(a / 4.);
    }
    let bb = jd + b + 1524;
    let cc = Math.floor((bb - 122.1) / 365.25);
    let dd = Math.floor(365.25 * cc);
    let ee = Math.floor((bb-dd) / 30.6001);
    day =(bb - dd) - Math.floor(30.6001 * ee);
    month = ee - 1;
    if (ee > 13) {
      cc += 1;
      month = ee - 13;
    }
    year = cc - 4716;
  
    if (adjustDays) {
      var wd = DateTimeFormatFilter.gmod(jd + 1 - adjustDays, 7) + 1;
    } else {
      var wd = DateTimeFormatFilter.gmod(jd + 1 , 7 ) + 1;
    }
  
    let iyear = 10631./ 30.;
    let epochastro = 1948084;
    let epochcivil = 1948085;
  
    let shift1 = 8.01 / 60.;
    
    let z = jd - epochastro;
    let cyc = Math.floor(z / 10631.);
    z = z - 10631 * cyc;
    let j = Math.floor((z - shift1 ) / iyear);
    let iy = 30 * cyc + j;
    z = z - Math.floor( j * iyear + shift1);
    let im = Math.floor((z + 28.5001) / 29.5);
    if (im === 13) {
      im = 12;
    }
    let id = z - Math.floor(29.5001 * im - 29);
  
    return {
      day: id,
      month: im - 1,
      year : iy,
    }
    // var myRes = new Array(8);
  
    // myRes[0] = day; //calculated day (CE)
    // myRes[1] = month - 1; //calculated month (CE)
    // myRes[2] = year; //calculated year (CE)
    // myRes[3] = jd - 1; //julian day number
    // myRes[4] = wd - 1; //weekday number
    // myRes[5] = id; //islamic date
    // myRes[6] = im - 1; //islamic month
    // myRes[7] = iy; //islamic year
  
    // return myRes;
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
