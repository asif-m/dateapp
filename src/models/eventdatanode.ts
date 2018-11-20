import EVENTTYPE from '@/constants/eventtype';
import ApproxDateUtil from '../utils/approxdateutil';
export default class EventDataNode {
  public id: string;
  public name: string;
  public eventType: string;
  public date: Date;
  public readonly approximateDaysSince1900: number;
  constructor(
    id: string,
    name: string,
    date: Date,
    eventType = EVENTTYPE.NONE,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.approximateDaysSince1900 = ApproxDateUtil.getApproximateDays(
      date.getFullYear() - 1900,
      date.getMonth() + 1,
      0,
      date.getDate());
  }
}
