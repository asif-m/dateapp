import EventDataNode from '../models/eventdatanode';
import { ReminderDataNode } from '../models/reminderdatanode';
import UniqueIDUtil from './uniqueidutil';
import DateUtil from './dateutil';
import MONTH from '../constants/month';
import EVENTTYPE from '../constants/eventtype';
import RandomGeneratorUtil from '../utils/randomgenutil';
import DefaultReminders from '../defaults/defaultreminder';
import { HashedDoubleLinkedList } from '../models/timeline/hasheddoublelinkedlist';
export default class StoreHelper {
    public static initialize(store: any) {
        StoreHelper.store = store;
        StoreHelper.initEvents();
        StoreHelper.initReminders();
        StoreHelper.initTimeline();
    }
    public static addRandomEvent() {
        StoreHelper.store.dispatch('addEvent',
          new EventDataNode(
              UniqueIDUtil.generate(),
              'Random',
              new Date(
                  RandomGeneratorUtil.generate(1970, 2018),
                  RandomGeneratorUtil.generate(0, 11),
                  RandomGeneratorUtil.generate(1, 28),
                  RandomGeneratorUtil.generate(0, 23),
                  RandomGeneratorUtil.generate(0, 59),
              ),
              StoreHelper.getRandomEventType(),
          ),
        );
    }
    private static events: any;
    private static reminders: any;
    private static store: any;
    private static getEventOccurances(events: EventDataNode[], reminders: ReminderDataNode[]): HashedDoubleLinkedList {
        const list = new HashedDoubleLinkedList();
        events.forEach((event: EventDataNode) => {
            reminders.forEach((reminder: ReminderDataNode) => {
                const eventOccuranceData = {event, reminder, id: event.id + '~~~' + reminder.id };
                const date = DateUtil.addReminderToDate(event.date, reminder);
                list.addOrUpdateEventOccurance(date, eventOccuranceData);
            });
        });
        return list;
    }

    private static initEvents() {
        StoreHelper.events = [
            // new EventDataNode(UniqueIDUtil.generate(), 'Today',
            //     new Date()),
            new EventDataNode(UniqueIDUtil.generate(), 'Asif',
                new Date(1983, MONTH.DEC, 25, 12, 25), EVENTTYPE.BIRTHDAY),
            new EventDataNode(UniqueIDUtil.generate(), 'Shameeha',
                new Date(1994, MONTH.DEC, 29), EVENTTYPE.BIRTHDAY),
            new EventDataNode(UniqueIDUtil.generate(), 'Asif - Shameeha',
                new Date(2017, MONTH.APR, 29), EVENTTYPE.BIRTHDAY),
            new EventDataNode(UniqueIDUtil.generate(), 'Ahmed',
                new Date(1945, MONTH.SEP, 10), EVENTTYPE.BIRTHDAY),
            new EventDataNode(UniqueIDUtil.generate(), 'Nafeesa',
                new Date(1958, MONTH.JUN, 21), EVENTTYPE.BIRTHDAY),
            new EventDataNode(UniqueIDUtil.generate(), 'Ahmed - Nafeesa',
                new Date(1976, MONTH.MAY, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in JAN',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.JAN, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in FEB',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.FEB, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in MAR',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.MAR, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in APR',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.APR, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in MAY',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.MAY, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in JUN',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.JUN, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in JUL',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.JUL, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in AUG',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.AUG, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in SEP',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.SEP, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in OCT',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.OCT, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in NOV',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.NOV, 12), EVENTTYPE.ANNIVERSARY),
            // new EventDataNode(UniqueIDUtil.generate(), 'Random in DEC',
            //     new Date(RandomGeneratorUtil.generate(1970, 2018), MONTH.DEC, 12), EVENTTYPE.ANNIVERSARY),
            ];
        StoreHelper.store.dispatch('initList', StoreHelper.events);
    }
    private static getRandomEventType() {
        switch (RandomGeneratorUtil.generate(0, 2)) {
            case 0: return EVENTTYPE.NONE;
            case 1: return EVENTTYPE.BIRTHDAY;
            case 2: return EVENTTYPE.ANNIVERSARY;
        }
    }
    private static initReminders() {
        StoreHelper.reminders = Object.keys(DefaultReminders)
            .reduce((accumulator, data) => accumulator.concat(DefaultReminders[data]), []);
        StoreHelper.store.dispatch('initReminders', StoreHelper.reminders);
    }
    private static initTimeline() {
        const eventOccurances = StoreHelper.getEventOccurances(StoreHelper.events, StoreHelper.reminders);
        StoreHelper.store.dispatch('setCurrentTimelineList', eventOccurances.toArray());
    }
  }
