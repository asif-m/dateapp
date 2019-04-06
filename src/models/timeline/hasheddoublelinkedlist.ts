import DoubleLinkedListNode from './doublelinkedlistnode';
import DateHashMap from './datehashmap';
import {IEventOccurance, TimelineEventNode} from './timelineeventnode';

export interface ITimelineData {
    timelineData: DoubleLinkedListNode[];
    reachedEnd: boolean;
    reachedBeginning: boolean;
}
export class HashedDoubleLinkedList {
    private head: DoubleLinkedListNode;
    private tail: DoubleLinkedListNode;
    private hashMap: DateHashMap;
    constructor() {
        this.head = null;
        this.tail = null;
        this.hashMap = new DateHashMap();
    }
    public addOrUpdateEventOccurance(date: Date, eventOccurenace: IEventOccurance) {
        const existingNode = this.hashMap.getNodeWithDate(date);
        if (existingNode) {
            existingNode.data.addEventOccurance(date, eventOccurenace);
            return;
        }
        const timelineEventNode = new TimelineEventNode();
        timelineEventNode.addEventOccurance(date, eventOccurenace);
        const newNode = new DoubleLinkedListNode(timelineEventNode);
        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
            this.hashMap.addDate(newNode);
            return;
        }
        const insertBeforeNode = this.hashMap.getFirstExistingNodeAfterDate(date);
        if (insertBeforeNode) {
            newNode.prev = insertBeforeNode.prev;
            newNode.next = insertBeforeNode;
            insertBeforeNode.prev = newNode;
            if (newNode.prev !== null) {
                newNode.prev.next = newNode;
            } else {
                this.head = newNode;
            }
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.hashMap.addDate(newNode);
    }
    public toArray() {
        let node = this.head;
        const result = [];
        while (node !== null) {
            result.push(node.data);
            node = node.next;
        }
        return result;
    }
    public getFirstExistingNodeAfterDate(aroundDate: Date): DoubleLinkedListNode {
        return this.hashMap.getFirstExistingNodeAfterDate(aroundDate);
    }
    private isEmpty() {
        return this.head === null;
    }
}
