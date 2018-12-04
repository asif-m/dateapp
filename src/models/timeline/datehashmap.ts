import DoubleLinkedListNode from './doublelinkedlistnode';
interface IDateObject {
    year: number;
    month: number;
    date: number;
}
export default class DateHashMap {
    private hashMap: any;
    private beginDate: IDateObject;
    private endDate: IDateObject;
    constructor() {
        this.hashMap = {};
    }
    public addDate(nodeData: DoubleLinkedListNode) {
        const d = this.getDateObjectRep(nodeData.data.date);
        let map;
        map = this.hashMap;
        map = map[d.year] = map[d.year] ? map[d.year] : {};
        map = map[d.month] = map[d.month] ? map[d.month] : {};
        map[d.date] = nodeData;
        if (!this.beginDate) {
            this.beginDate = d;
            this.endDate = d;
        }
        if (this.isLeftItemSmallerOrEqual(d, this.beginDate)) {
            this.beginDate = d;
        }
        if (this.isLeftItemSmallerOrEqual(this.endDate, d)) {
            this.endDate = d;
        }
    }
    public getNodeWithDate(date: Date): DoubleLinkedListNode {
        const d = this.getDateObjectRep(date);
        let result = null;
        try {
            result = this.hashMap[d.year][d.month][d.date];
        } catch (e) {
            result = null;
        }
        return result;
    }
    public getFirstExistingNodeAfterDate(date: Date): DoubleLinkedListNode {
        let d = this.getDateObjectRep(date);
        if (this.isLeftItemSmallerOrEqual(d, this.beginDate)) {
            d = this.beginDate;
        }
        while (d.year <= this.endDate.year) {
            if (!this.hashMap[d.year]) {
                d.year++;
                d.month = 1;
                d.date = 1;
                continue;
            }
            while (d.month <= 12) {
                if (!this.hashMap[d.year][d.month]) {
                    d.month++;
                    d.date = 1;
                    continue;
                }
                while (d.date <= 31) {
                    if (!this.hashMap[d.year][d.month][d.date]) {
                        d.date++;
                        continue;
                    }
                    return this.hashMap[d.year][d.month][d.date];
                }
                d.month++;
                d.date = 1;
            }
            d.year++;
            d.month = 1;
            d.date = 1;
        }
        return null;
    }
    private isLeftItemSmallerOrEqual(l: IDateObject, r: IDateObject): boolean {
        if (l.year !== r.year) {
            return l.year < r.year;
        }
        if (l.month !== r.month) {
            return l.month < r.month;
        }
        if (l.date !== r.date) {
            return l.date < r.date;
        }
        return true;
    }
    private getDateObjectRep(date: Date): IDateObject {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            date: date.getDate(),
        };
    }
}
