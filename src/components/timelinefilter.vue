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
import { Component, Vue } from 'vue-property-decorator';
@Component({
    data: function() {
        return {
            date: new Date().toISOString().substr(0, 10),
            showDatePickerMenu: false,
            selectedEvents: this.$store.getters.events.map((event) => event.id),
        };
    },
    watch: {
        date: function(date) {
            this.triggerDateChanged(date);
        },
        selectedEvents: function(selectedEvents) {
            this.triggerEventSelectionChanged(selectedEvents);
        },
    },
})
export default class TimelineFilterComponent extends Vue {
    private triggerDateChanged(date: string) {
    }
    private triggerEventSelectionChanged(selectedEvents: []) {
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

