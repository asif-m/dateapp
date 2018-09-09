export default class EventDataNode {
  public id: string;
  public name: string;
  public date: Date;
  constructor(name: string, date: Date) {
    this.id = name + '_' + date.toDateString() + date.toTimeString();
    this.name = name;
    this.date = date;
  }
}
