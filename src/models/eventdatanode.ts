export default class EventDataNode {
  private static currentUID = 0;
  public id: string;
  public name: string;
  public date: Date;
  constructor(name: string, date: Date) {
    EventDataNode.currentUID++;
    this.id = EventDataNode.currentUID + '_' + name + '_' + date.toDateString();
    this.name = name;
    this.date = date;
  }
}
