<template>
  <div>
    <div class="cardsize">
        <v-card>
            <v-img>
                <div v-if="elapsedDuration" class ="capsuleParent">
                    <InfoCapsuleComponent :label="'Y'" :value="elapsedDuration.years" :labelFirst="true" class="capsule capsule-year"/>
                    <InfoCapsuleComponent :label="'D'" :value="elapsedDuration.days" :labelFirst="false" class="capsule capsule-date"/>
                    <InfoCapsuleComponent :label="'M'" :value="elapsedDuration.months" :labelFirst="true" class="capsule capsule-month"/>
                    <InfoCapsuleComponent :label="'hh'" :value="elapsedDuration.hours" :labelFirst="false"  class="capsule capsule-hour"/>
                    <InfoCapsuleComponent :label="'W'" :value="elapsedDuration.weeks" :labelFirst="true" class="capsule capsule-week"/>
                    <InfoCapsuleComponent :label="'mm'" :value="elapsedDuration.minutes" :labelFirst="false" class="capsule capsule-minute"/>
                    <InfoCapsuleComponent :label="'ss'" :value="elapsedDuration.seconds" :labelFirst="true" class="capsule capsule-second"/>
                </div>
            </v-img>

            <div class ="footer">
                <div class ="footerContents footerContents-left">
                        <span v-if="eventType === 'Birthday'">
                            <v-icon style="color:red">cake</v-icon>
                        </span>
                        <span v-else-if="eventType === 'Anniversary'">
                            <v-icon style="color:green">people</v-icon>
                        </span>
                        <span v-else></span>
                        {{name}}
                </div>
                <div class ="footerContents footerContents-center">
                    <div>{{date | formatDateTime}}</div>
                    <div class="hijriDate">{{date | formatDateInHijri}}</div>
                </div>
                <div class ="footerContents footerContents-right">
                    <v-btn icon  v-on:click.native='removeEvent()'>
                        <v-icon>create</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-card>
    </div>
</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import TimerUtil from '../utils/timerutil';
import Duration from '../models/duration';
import InfoCapsuleComponent from './infocapsule.vue'

@Component({
  components: {InfoCapsuleComponent},
})
export default class EventSummaryComponent extends Vue {
    @Prop() private name: string;
    @Prop() private date: Date;
    @Prop() private id: string;
    @Prop() private eventType: string;
    private currentTime: Date;
    private elapsedDuration: Duration;
    constructor() {
        super();
        this.elapsedDuration = new Duration();
        this.currentTime = new Date();
        this.elapsedDuration.updateDates(this.currentTime, this.date);
        this.updateCurrentTime(new Date());
        TimerUtil.subscribe({method: this.onTimer, scope: this});
    }
    private onTimer(date: Date) {
       this.currentTime = date;
        this.elapsedDuration.updateDates(this.currentTime, this.date);
    }
    private updateCurrentTime(date: Date) {
        
    }
    private beforeDestroy() {
        TimerUtil.unsubscribe({method: this.onTimer, scope: this});
    }
    private removeEvent() {
        this.$store.dispatch('removeEvent', this.id);
    }
}
</script>

<style lang='scss'>
$padding-capsule: 10px;
.cardsize{
    padding: 3px;
    background: rebeccapurple;
}
.capsuleParent{
    display: flex;
    flex-flow: row wrap;
}
.capsule{
    flex: 1 0 calc(50%);
    padding-left: $padding-capsule;
    padding-right: $padding-capsule;
    &-year{
        // background:#cc493f;
        padding-top:$padding-capsule;
        text-align:left;
    }
    &-date{
        padding-top:$padding-capsule;
        text-align:right;
    }
    &-month{
        text-align:left;
    }
    &-week{
          text-align:left;
    }
    
    &-hour{
        text-align:right;
    }
    &-minute{
        text-align:right;
    }
    &-second{
        text-align:center;
        padding-bottom:$padding-capsule;
    }
}
.footer{
    background: rebeccapurple;
    display: flex;
    flex-flow: row wrap;
}
.footerContents{
    align-self: center;
    &-left{
        flex: 1 0 calc(33.333%);
        padding-left: $padding-capsule;
        text-align: left;
    }
    &-center{
        flex: 1 0 calc(33.333%);
        text-align: center;
    }
    &-right{
        flex: 1 0 calc(33.333%);
         padding-right: $padding-capsule;
        text-align: right;
    }
}
.hijriDate{
    font-size: 10px;
}
</style>

