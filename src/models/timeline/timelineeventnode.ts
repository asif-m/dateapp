import EventDataNode from '../eventdatanode';
import { ReminderDataNode } from '../reminderdatanode';
import DateUtil from './../../utils/dateutil';

export interface IEventOccurance {
    event: EventDataNode;
    reminder: ReminderDataNode;
    id: string;
}
export class TimelineEventNode {
    public readonly eventOccurenaces: IEventOccurance[];
    private occuranceDate: Date;
    private occuranceDateString: string;
    private occuranceDaysSince1900: number;
    private _id: string;
    public get date() {
        return this.occuranceDate;
    }
    public get dateString() {
        return this.occuranceDateString;
    }
    public get daysSince1900() {
        return this.occuranceDaysSince1900;
    }
    public get id() {
        return this._id;
    }
    constructor() {
        this.eventOccurenaces = [];
    }
    public addEventOccurance(date: Date, eventOccurenace: IEventOccurance) {
        if (!this.occuranceDate) {
            this.occuranceDate = date;
            this.occuranceDateString = DateUtil.formatDateWithWeek(this.occuranceDate);
            this._id = this.occuranceDateString;
            this.occuranceDaysSince1900 = DateUtil.getApproximateDays(
                this.occuranceDate.getFullYear() - 1900,
                this.occuranceDate.getMonth() + 1,
                0,
                this.occuranceDate.getDate(),
            );
        }
        this.eventOccurenaces.push(eventOccurenace);
    }
}
