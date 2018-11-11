<template>
  <div>
    <v-card>
        <v-img height="200px">
            <div>{{name}}</div>
            <div>{{date | formatDateTime}}</div>
            <!-- <div>{{eventType}}</div>
            <div>{{currentTime}}</div> -->
            <div v-if="elapsedDuration">
                <div><span>Y</span> <span>{{elapsedDuration.years}}</span></div>
                <div><span>M</span> <span>{{elapsedDuration.months}}</span></div>
                <div><span>W</span> <span>{{elapsedDuration.weeks}}</span></div>
                <div><span>D</span> <span>{{elapsedDuration.days}}</span></div>
                <div><span>hh</span> <span>{{elapsedDuration.hours}}</span></div>
                <div><span>mm</span> <span>{{elapsedDuration.minutes}}</span></div>
                <div><span>ss</span> <span>{{elapsedDuration.seconds}}</span></div>
            </div>
        </v-img>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon  v-on:click.native='removeEvent()'>
                <v-icon>create</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import TimerUtil from '../utils/timerutil';
import Duration from '../models/duration';

@Component
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
</style>

