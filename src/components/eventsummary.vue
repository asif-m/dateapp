<template>
  <div>
    <v-card>
        <v-img height="200px">
            <div>{{name}}</div>
            <div>{{date}}</div>
            <div>{{eventType}}</div>
            <div>{{currentTime}}</div>
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

@Component
export default class EventSummaryComponent extends Vue {
    @Prop() public name: string;
    @Prop() public date: Date;
    @Prop() public id: string;
    @Prop() public eventType: string;
    private currentTime: Date;
    constructor() {
        super();
        this.currentTime = new Date();
        TimerUtil.subscribe({method: this.onTimer, scope: this});
    }
    private onTimer(date: Date) {
        this.currentTime = date;
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

