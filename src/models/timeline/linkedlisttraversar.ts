import DoubleLinkedListNode from './doublelinkedlistnode';
import DateHashMap from './datehashmap';
import {IEventOccurance, TimelineEventNode} from './timelineeventnode';

export interface ITimelineData {
    timelineData: DoubleLinkedListNode[];
    reachedEnd: boolean;
    reachedBeginning: boolean;
}

export class LinkedListTraverser {
    public getTimelineDataAroundDate(aroundDate: Date , k: number, beginIndex: number): ITimelineData {
        const firstExistingNodeAfterDate = this.getFirstExistingNodeAfterDate(aroundDate);
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
}
