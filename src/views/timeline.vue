<template>
    <div>
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                          Timeline
                            <!-- <v-flex v-for="event in events" :key="event.id" xs4>
                                <div>
                                   Timeline
                                </div>
                            </v-flex> -->
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ReminderUtil from './../utils/reminderutil';
import EventDataNode from './../models/eventdatanode';
import {ReminderDataNode} from './../models/reminderdatanode';

@Component
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
        ReminderUtil.getRemindersArray(this.sortedEvents , this.sortedReminders, new Date(), true, 20);
    }
}
</script>

<style lang='scss'>
</style>