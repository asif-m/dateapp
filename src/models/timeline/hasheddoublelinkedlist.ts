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
    public getTimelineDataAroundDate(aroundDate: Date , k: number): ITimelineData {
        const firstExistingNodeAfterDate = this.hashMap.getFirstExistingNodeAfterDate(aroundDate);
        if (firstExistingNodeAfterDate === null) {
            return {
                timelineData : [this.tail],
                reachedEnd : true,
                reachedBeginning: true,
            };
        }
        const half = Math.floor(k / 2);
        let i = 0;
        const result = {
            timelineData: [],
            reachedEnd: false,
            reachedBeginning: false,
        };
        let prevNode = firstExistingNodeAfterDate;
        while (i < half) {
            i++;
            if (prevNode.prev !== null) {
                result.reachedBeginning = true;
                break;
            }
            prevNode = prevNode.prev;
        }
        return this.getkItemsFromNode(prevNode, k, result);
    }
    public getPrevTimelineDataFromNode(node: DoubleLinkedListNode , k: number): ITimelineData {
        let prevNode = node;
        let i = 0;
        const result = {
            timelineData : [],
            reachedEnd : false,
            reachedBeginning: false,
        };
        while (i < k) {
            i++;
            if (prevNode.prev !== null) {
                result.reachedBeginning = true;
                break;
            }
            prevNode = prevNode.prev;
        }
        return this.getkItemsFromNode(prevNode, k, result);
    }
    public getNextTimelineDataFromNode(node: DoubleLinkedListNode , k: number): ITimelineData {
        const prevNode = node;
        const result = {
            timelineData : [],
            reachedEnd : false,
            reachedBeginning: false,
        };
        return this.getkItemsFromNode(prevNode, k, result);
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
    private getkItemsFromNode(prevNode: DoubleLinkedListNode , k: number, result: ITimelineData): ITimelineData {
        for (let i = 0; i < k; i++) {
            result.timelineData.push(prevNode);
            if (prevNode.next === null) {
                result.reachedEnd = true;
                break;
            }
            prevNode = prevNode.next;
        }
        return result;
    }
    private isEmpty() {
        return this.head === null;
    }
}
