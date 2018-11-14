<template>
  <div>
    <div class="cardsize">
        <v-card>
            <v-img>
                <div class="cardcontainer">
                    <div class="cardContentLeft">
                        <div v-if="elapsedDuration" class>
                            <InfoCapsuleComponent :label="'Y'" :value="elapsedDuration.years"/>
                            <InfoCapsuleComponent :label="'M'" :value="elapsedDuration.months"/>
                            <InfoCapsuleComponent :label="'W'" :value="elapsedDuration.weeks"/>
                            <InfoCapsuleComponent :label="'D'" :value="elapsedDuration.days"/>
                            <InfoCapsuleComponent :label="'hh'" :value="elapsedDuration.hours"/>
                            <InfoCapsuleComponent :label="'mm'" :value="elapsedDuration.minutes"/>
                            <InfoCapsuleComponent :label="'ss'" :value="elapsedDuration.seconds"/>
                        </div>
                    </div>
                    <div class="cardContentRight">
                         <div class ="cardEdit">
                            <v-btn icon  v-on:click.native='removeEvent()'>
                                <v-icon>more_horiz</v-icon>
                            </v-btn>
                        </div>
                        <div class="cardIcon">
                             <span  v-if="eventType === 'Birthday'">
                                <v-icon style="color:red">cake</v-icon>
                            </span>
                            <span  v-else-if="eventType === 'Anniversary'">
                                <v-icon style="color:green">people</v-icon>
                            </span>
                            <span  v-else></span>
                        </div>
                         <div class="cardHijriDate">
                            <span class="cardHijriDateContent">{{date | formatDateInHijri}}</span>
                        </div>

                        <div class="cardDate">
                            {{date | formatDateTime}}</div>
                        <div class="cardName">
                            {{name}}
                        </div>
                        
                        
                    </div>
                </div>
            </v-img>
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
.cardcontainer{
    padding :10px;
    display: flex;
    flex-flow: row wrap;
}
.cardContentLeft{
    flex: 1 0 calc(50%);
}
.cardContentRight{
    flex: 1 0 calc(50%);
}
.cardEdit{
    text-align: right;
    height: 33px;
}
.cardIcon{
    text-align: right;
}
.cardName{

    text-align: center;
    font-size: 30px;
    position: absolute;
    bottom: 0;
    right: 8px;
    width: 50%;
    background-color: indianred;
    border-radius: 7px;
}
.cardDate{
    font-size: 20px;
    text-align: right;
    padding-top: 15px;
}
.cardHijriDate{
    font-size: 15px;
    text-align: right;
    
}
.cardHijriDateContent{
    font-size: 15px;
    text-align: right;
    background-color: green;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 18px;
}
</style>

