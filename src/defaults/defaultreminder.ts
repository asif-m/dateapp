import {ReminderDataNode} from './../models/reminderdatanode';

export default  {
 yearsOnly : [
     new ReminderDataNode({years: 1}),
 ],
 monthsOnly : [
    new ReminderDataNode({months: 1}),
 ],
 weeksOnly : [
    new ReminderDataNode({weeks: 1}),
 ],
 daysOnly: [
    new ReminderDataNode({days: 1}),
 ],
 hoursOnly: [
    new ReminderDataNode({hours: 1}),
 ],
 minutesOnly : [
    new ReminderDataNode({minutes: 1}),
 ],
 secondsOnly : [
    new ReminderDataNode({seconds: 1}),
 ],
 combinatory : [
    new ReminderDataNode({years : 1, months: 1, weeks : 1, days : 1, hours : 1, minutes : 1, seconds : 1}),
 ],
};
