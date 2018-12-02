<template>
      <v-timeline align-top dense>
        <v-timeline-item v-for="timelinenodeData in this.$store.getters.timelineData" 
            color="rgba(102,51,153)" small>
            <v-card>
                <div class="timeline-card-date">{{timelinenodeData[0].occuranceDateString}}</div>
                <div>
                    <TimelinePacketComponent :timelinesData=timelinenodeData></TimelinePacketComponent>                    
                </div>
            </v-card>
        </v-timeline-item>       
      </v-timeline>

</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ReminderUtil from './../utils/reminderutil';
import EventDataNode from './../models/eventdatanode';
import {ReminderDataNode} from './../models/reminderdatanode';
import TimelinePacketComponent from './../components/timelinepacket.vue';

@Component({
  components: {TimelinePacketComponent},
})
export default class Timeline extends Vue {
    private sortedEvents: EventDataNode[];
    private sortedReminders: ReminderDataNode[];
    constructor() {
        super();
        this.sortedEvents = this.$store.getters.events
            .map((eventDataNode: EventDataNode) => eventDataNode);
        this.sortedEvents.sort((a: EventDataNode, b: EventDataNode) =>
                a.daysSince1900 === b.daysSince1900 ? 0 :
                (a.daysSince1900 > b.daysSince1900 ? -1 : 1));
        this.sortedReminders = this.$store.getters.reminders
            .map((reminderDataNode: ReminderDataNode) => reminderDataNode);
        this.sortedReminders.sort((a: ReminderDataNode, b: ReminderDataNode) =>
            a.approximateDays === b.approximateDays ? 0 :
            (a.approximateDays > b.approximateDays ? -1 : 1));
        this.$store.dispatch('addTimelineData',
            ReminderUtil.getRemindersArray(this.sortedEvents , this.sortedReminders, new Date(), true, 20));
    }
}
</script>

<style lang='scss'>
.timeline{
    &-card{
        &-date{
            font-size : 14px;
            text-align: left;
            padding:10px;
        }
    }
}
</style>