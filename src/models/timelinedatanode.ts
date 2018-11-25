import EventDataNode from './eventdatanode';
import { ReminderDataNode } from './reminderdatanode';
import DateUtil from '../utils/dateutil';

export default class TimelineDataNode {
  public eventData: EventDataNode;
  public reminderData: ReminderDataNode;
  public readonly occuranceDate: Date;
  public readonly occuranceDateString: string;
  public readonly occuranceDaysSince1900: number;
  constructor(
    eventData: EventDataNode,
    reminderData: ReminderDataNode,
  ) {
    this.eventData = eventData;
    this.reminderData = reminderData;
    this.occuranceDate = DateUtil.addReminderToDate(eventData.date, reminderData);
    this.occuranceDateString = DateUtil.formatDateWithWeek(this.occuranceDate);
    this.occuranceDaysSince1900 = DateUtil.getApproximateDays(
      this.occuranceDate.getFullYear() - 1900,
      this.occuranceDate.getMonth() + 1,
      0,
      this.occuranceDate.getDate());
  }
}
