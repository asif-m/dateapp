<template>
    <div>                
        <div v-for="timelineData in eventOccurenaces" :key="timelineData.id">              
            <div class= "timelineCapsuleContainer">
                <div class ="timelineCapsuleLabel">{{timelineData.event.name}}</div> 
                <div class ="timelineCapsuleValue">{{timelineData.reminder.toString()}}</div>
            </div>
        </div>        
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IEventOccurance } from '../models/timeline/timelineeventnode';
import { ReminderDataNode } from '../models/reminderdatanode';
@Component({
})
export default class TimelinePacketComponent extends Vue {
    @Prop() public eventOccurenaces: IEventOccurance[];
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
    color:white;
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

