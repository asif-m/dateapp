import EventDataNode from './../models/eventdatanode';
import {ReminderDataNode} from './../models/reminderdatanode';
import DateUtil from './dateutil';
import TimelineDataNode from '../models/timelinedatanode';

export default class ReminderUtil {
  public static getRemindersArray(
    events: EventDataNode[], reminders: ReminderDataNode[], date: Date, isBack: boolean, nRemindersWidth: number) {
      const daysSince1900 = DateUtil.getApproximateDays(
        date.getFullYear() - 1900,
        date.getMonth() + 1,
        0,
        date.getDate());
      const result: any = [];
      events.forEach((event: EventDataNode) => {
        if (daysSince1900 >= event.daysSince1900) {
          // ReminderUtil.getKClosest(reminders, event.daysSince1900, nRemindersWidth)
          //   .forEach((reminder) => result.push(new TimelineDataNode(event, reminder)));
            reminders.forEach((reminder) => result.push(new TimelineDataNode(event, reminder)));
        }
      });
      result.sort((a: TimelineDataNode, b: TimelineDataNode) =>
        a.occuranceDaysSince1900 === b.occuranceDaysSince1900 ? 0 :
          (a.occuranceDaysSince1900 > b.occuranceDaysSince1900 ? 1 : -1),
      );
      return result;
  }
  private static findCrossOver(arr: ReminderDataNode[], low: number, high: number, x: number): number {
        if (arr[high].approximateDays <= x) {return high; }
        if (arr[low].approximateDays > x)  {return low; }
        const mid = (low + high) / 2;
        if (arr[mid].approximateDays <= x && arr[mid + 1].approximateDays > x) {return mid; }
        if (arr[mid].approximateDays < x) {return ReminderUtil.findCrossOver(arr, mid + 1, high, x); }
        return ReminderUtil.findCrossOver(arr, low, mid - 1, x);
    }
    private static getKClosest(arr: ReminderDataNode[], x: number, k: number): ReminderDataNode[] {
        const n = arr.length;
        let l = ReminderUtil.findCrossOver(arr, 0, n - 1, x);
        let r = l + 1;
        let count = 0;
        const result = [];
        const x2 = 2 * x;
        if (arr[l].approximateDays === x) { l--; }
        while (l >= 0 && r < n && count < k) {
          result.push(x2 < arr[l].approximateDays + arr[r].approximateDays ? arr[ l-- ] : arr[ r++ ]);
          count++;
        }
        while (count < k && l >= 0) { result.push(arr[l--]); count++; }
        while (count < k && r < n) {result.push(arr[r++]); count++; }
        return result;
    }
}
