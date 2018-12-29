<template>
    <div class="timelinefilter-container">                
        <v-menu :close-on-content-click="false" v-model="showDatePickerMenu" :nudge-right="40" lazy 
            transition="scale-transition" offset-y full-width min-width="290px">
            <v-text-field slot="activator" v-model="date" label="Go around date" prepend-icon="event" readonly></v-text-field>
            <v-date-picker v-model="date" @input="showDatePickerMenu = false"></v-date-picker>
        </v-menu>
        <div v-for="event in this.$store.getters.events" :key="event.id">            
            <v-switch v-model="selectedEvents" :label=event.name :value=event.id></v-switch>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import EventDataNode from '@/models/eventdatanode';
@Component
export default class TimelineFilterComponent extends Vue {
    private date: string;
    private showDatePickerMenu: boolean;
    private selectedEvents: any[];
    constructor() {
        super();
        this.date = new Date().toISOString().substr(0, 10);
        this.showDatePickerMenu = false;
        this.selectedEvents = this.$store.getters.events.map((event: EventDataNode) => event.id);
    }
    @Watch('date')
    private triggerDateChanged(date: string) {
        // console.log(date);
    }
    @Watch('selectedEvents')
    private triggerEventSelectionChanged(selectedEvents: string[]) {
        // console.log(selectedEvents);
    }
}
</script>

<style lang='scss'>
.timelinefilter{
    &-container{
        padding-left:20px;
        padding-right:20px;
    }
}
</style>

