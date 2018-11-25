import EVENTTYPE from '@/constants/eventtype';
import DateUtil from '../utils/dateutil';
export default class EventDataNode {
  public id: string;
  public name: string;
  public eventType: string;
  public date: Date;
  public readonly daysSince1900: number;
  constructor(
    id: string,
    name: string,
    date: Date,
    eventType = EVENTTYPE.NONE,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.daysSince1900 = DateUtil.getApproximateDays(
      date.getFullYear() - 1900,
      date.getMonth() + 1,
      0,
      date.getDate());
  }
}
