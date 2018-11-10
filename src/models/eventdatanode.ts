import EVENTTYPE from '@/constants/eventtype';

export default class EventDataNode {
  public id: string;
  public name: string;
  public eventType: string;
  public date: Date;
  constructor(
    id: string,
    name: string,
    date: Date,
    eventType = EVENTTYPE.NONE,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.eventType = eventType;
  }
}
