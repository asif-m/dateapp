import DateUtil from '../utils/dateutil';

export interface IReminderDataNode {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

export class ReminderDataNode {
  public years = 0;
  public months = 0;
  public weeks = 0;
  public days = 0;
  public hours = 0;
  public minutes = 0;
  public seconds = 0;
  public readonly approximateDays: number;
  public id = '';
  constructor(
   data: IReminderDataNode,
  ) {
    if (data) {
      this.years = data.years || 0;
      this.months = data.months || 0;
      this.weeks = data.weeks || 0;
      this.days = data.days || 0;
      this.hours = data.hours || 0;
      this.minutes = data.minutes || 0;
      this.seconds = data.seconds || 0;
      this.approximateDays = DateUtil.getApproximateDays(
        this.years, this.months, this.weeks, this.days , this.hours, this.minutes, this.seconds);
      const id = ((this.years ? ' ' + this.years + ' Y,' : '') +
        (this.months ? ' ' + this.months + ' M,' : '') +
        (this.weeks ? ' ' + this.weeks + ' W,' : '') +
        (this.days ? ' ' + this.days + ' D,' : '') +
        (this.hours ? ' ' + this.hours + ' hh,' : '') +
        (this.minutes ? ' ' + this.minutes + ' mm,' : '') +
        (this.seconds ? ' ' + this.seconds + ' ss,' : ''))
        .replace(/,\s*$/, '');
      this.id = id ? id : 'This day';
    }
  }
  public toString() {
    return this.id;
  }
}
