<template>
    <div>
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                            <v-flex v-for="event in events" :key="event.id" xs4>
                                <div>
                                    <EventSummaryComponent :id=event.id :name=event.name :date=event.date :eventType = event.eventType>
                                    </EventSummaryComponent>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import EventSummaryComponent from '../components/eventsummary.vue';
import EventDataNode from '../models/eventdatanode';

@Component({
  components: {EventSummaryComponent},
})
export default class Summary extends Vue {
private events: EventDataNode[];
  constructor() {
    super();
    this.events = this.$store.getters.events;
  }
}
</script>

<style lang='scss'>
</style>

