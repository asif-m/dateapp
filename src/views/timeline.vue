<template>
    <div class="timeline-container">
        <div class="timeline-fall-container">
            <TimelineFallComponent></TimelineFallComponent>
        </div>
        <div class="timeline-filter-container">
            <TimelineFilterComponent></TimelineFilterComponent>
        </div>
    </div>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ReminderUtil from './../utils/reminderutil';
import EventDataNode from './../models/eventdatanode';
import {ReminderDataNode} from './../models/reminderdatanode';
import TimelineFallComponent from './../components/timelinefall.vue';
import TimelineFilterComponent from './../components/timelinefilter.vue';
import DateUtil from './../utils/dateutil';
import TimelineNodeData from './../models/timelinedatanode';
@Component({
  components: {TimelineFallComponent, TimelineFilterComponent},
})
export default class Timeline extends Vue {
    private sortedEvents: EventDataNode[];
    private sortedReminders: ReminderDataNode[];
    constructor() {
        super();
        this.sortedEvents = this.$store.getters.events
            .map((eventDataNode: EventDataNode) => eventDataNode)
            .sort((a: EventDataNode, b: EventDataNode) =>
                a.daysSince1900 === b.daysSince1900 ? 0 :
                (a.daysSince1900 > b.daysSince1900 ? -1 : 1));
        this.sortedReminders = this.$store.getters.reminders
            .map((reminderDataNode: ReminderDataNode) => reminderDataNode)
            .sort((a: ReminderDataNode, b: ReminderDataNode) =>
            a.approximateDays === b.approximateDays ? 0 :
            (a.approximateDays > b.approximateDays ? -1 : 1));
        const data = ReminderUtil.getRemindersArray(this.sortedEvents , this.sortedReminders, new Date(), true, 20);
        const today = new Date();
        const todayApproxDays = DateUtil.getApproximateDays(
                    today.getFullYear() - 1900,
                    today.getMonth() + 1,
                    0,
                    today.getDate());
        let lastClosest: number;
        let lastClosestDateString: string;
        data.forEach((timelineNodeData: TimelineNodeData) => {
            if (!lastClosest && lastClosest !== 0) {
                lastClosest = Math.abs(timelineNodeData.occuranceDaysSince1900 - todayApproxDays);
                lastClosestDateString = timelineNodeData.occuranceDateString;
            }
            if (lastClosest > Math.abs(timelineNodeData.occuranceDaysSince1900 - todayApproxDays)) {
                lastClosest = Math.abs(timelineNodeData.occuranceDaysSince1900 - todayApproxDays);
                lastClosestDateString = timelineNodeData.occuranceDateString;
            }
        });
        if (lastClosestDateString) {
            setTimeout(() => {
                const items = Array.prototype.slice.call(document.getElementsByClassName('timeline-card-date'))
                    .filter((el: any) => el.textContent.trim() === lastClosestDateString);
                if (items && items.length > 0) {
                    items[0].scrollIntoView();
                }
            }, 10000);
        }
        this.$store.dispatch('addTimelineData', data) ;
    }
}
</script>

<style lang='scss'>
.timeline{
    &-container{
        display:flex;
        scroll:none;
    }
    &-fall-container{
        
    }
    &-filter-container{
        color: white;
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100%;
        overflow: auto;
    }
}


</style>