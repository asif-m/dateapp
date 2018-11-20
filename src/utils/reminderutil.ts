import EventDataNode from './../models/eventdatanode';
import {ReminderDataNode} from './../models/reminderdatanode';

export default class ReminderUtil {
  public static getRemindersArray(
    events: EventDataNode[], reminders: ReminderDataNode[], fromDate: Date, nRemindersWidth: number) {
      return {
          minDate : new Date(),
          maxDate : new Date(),
          isMinEnd :  true,
          isMaxEnd : true,
      };
  }
}
