import { TimelineEventNode } from './timelineeventnode';
export default class DoubleLinkedListNode {
    public data: TimelineEventNode;
    public next: DoubleLinkedListNode;
    public prev: DoubleLinkedListNode;
    constructor(data: TimelineEventNode) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}
