<template>
  <div class ="eventsummary-container">
      <div class ="eventsummary-container-inner">
        <div class ="eventsummary-card-header">
            <div class="eventsummary-card-header--name">
                {{eventData.name}}
            </div>
            <div class="eventsummary-card-header--date-julian">
                {{eventData.date | formatDateTimeWithWeek}}
            </div>              
            <div class="eventsummary-card-header--date-hijri">
                {{eventData.hijriDate}}
            </div>  
        </div>
        <div class ="eventsummary-card-content" v-if="elapsedDuration">         
            <InfoCapsuleComponent :label="'Y'" :value="elapsedDuration.years"/>
            <InfoCapsuleComponent :label="'M'" :value="elapsedDuration.months"/>
            <InfoCapsuleComponent :label="'W'" :value="elapsedDuration.weeks"/>
            <InfoCapsuleComponent :label="'D'" :value="elapsedDuration.days"/>
            <InfoCapsuleComponent :label="'hh'" :value="elapsedDuration.hours"/>
            <InfoCapsuleComponent :label="'mm'" :value="elapsedDuration.minutes"/>
            <InfoCapsuleComponent :label="'ss'" :value="elapsedDuration.seconds"/>        
        </div>    
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import TimerUtil from '../utils/timerutil';
import Duration from '../models/duration';
import InfoCapsuleComponent from './infocapsule.vue';
import EventDataNode from '../models/eventdatanode';

@Component({
  components: {InfoCapsuleComponent},
})
export default class EventSummaryComponent extends Vue {
    @Prop() private eventData: EventDataNode;
    private currentTime: Date;
    private elapsedDuration: Duration;
    constructor() {
        super();
        this.elapsedDuration = new Duration();
        this.currentTime = new Date();
        this.elapsedDuration.updateDates(this.currentTime, this.eventData.date);
        TimerUtil.subscribe({method: this.onTimer, scope: this});
    }
    private onTimer(date: Date) {
       this.currentTime = date;
       this.elapsedDuration.updateDates(this.currentTime, this.eventData.date);
    }
    private beforeDestroy() {
        TimerUtil.unsubscribe({method: this.onTimer, scope: this});
    }
    private removeEvent() {
        this.$store.dispatch('removeEvent', this.eventData.id);
    }
}
</script>

<style lang='scss'>
.eventsummary{
    &-container{
        min-width:220px;                
        padding: 3px;
        &-inner{
            padding:3px;
            background:blueviolet;
        }
    }
    &-card{
        &-header{
            background: rebeccapurple;
            color: white;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
            &--name{
                font-size : 21px;                
                text-align:left;
                padding-left:10px;
                padding-right:10px;
            }
            &--date{
                &-julian{
                    font-size : 14px;                
                    text-align:left;
                    padding-left:10px;
                    padding-right:10px;
                }
                &-hijri{
                    font-size : 12px;                
                    text-align:left;                    
                    background-color: green;
                    padding-left:10px;
                    padding-right:10px;     
                    color:white;               
                }
            }
        }
        &-content{
            background: rebeccapurple;
            padding: 0px 3px 0px 3px;
        }

    }
}
</style>

