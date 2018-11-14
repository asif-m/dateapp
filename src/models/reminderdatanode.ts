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
      }
  }
}
