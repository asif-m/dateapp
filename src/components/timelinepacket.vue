<template>
    <div class ="timelineContainer">
        <div class="timelineLeft"> {{timelinesData[0].occuranceDateString}}
        </div>
        <div class="timelineRight">
            <div v-for="timelineData in timelinesData" xs4>              
                 <div class= "timelineCapsuleContainer">
                    <div class ="timelineCapsuleLabel">{{timelineData.eventData.name}}</div> 
                    <div class ="timelineCapsuleValue">{{getReminderString(timelineData.reminderData)}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import TimelineDataNode from '../models/timelinedatanode';
import { ReminderDataNode } from '../models/reminderdatanode';
@Component({
})
export default class TimelinePacketComponent extends Vue {
    @Prop() private timelinesData: TimelineDataNode[];
    public getReminderString(reminder: ReminderDataNode) {
        return reminder.toString();
    }
}
</script>

<style lang='scss'>
.timelineContainer{
    padding :10px;
    display: flex;
    flex-flow: row wrap;
}
.timelineLeft{
    flex: 1 0 calc(25%);
}
.timelineRight{
    flex: 1 0 calc(75%);
}
.timelineCapsuleContainer{
    padding :4px;
    display: flex;
    flex-flow: row wrap;
}
.timelineCapsuleLabel{
    background: chocolate;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-left-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-left-radius: 15px;    
}
.timelineCapsuleValue{
    background: antiquewhite;
    color: black;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-right-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-right-radius: 15px;
}
</style>

