<template>
    <div class ="summary-container">
        <div v-for="event in this.$store.getters.events" :key="event.id" class= "summary-items">
            <EventSummaryComponent :eventData=event>
            </EventSummaryComponent>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import EventSummaryComponent from '../components/eventsummary.vue';

@Component({
  components: {EventSummaryComponent},
})
export default class Summary extends Vue {
}
</script>

<style lang='scss'>
.summary{
    &-container{
        display:flex;        
        flex-wrap: wrap;
    }
    // &-items{
    //     //flex: 1 1 0;
    // }
}
</style>

