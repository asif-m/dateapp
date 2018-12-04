<template>
    <div class="timeline-container">
        <div class="timeline-fall-container">
            <TimelineFallComponent></TimelineFallComponent>
        </div>
        <div class="timeline-filter-container">
            <TimelineFilterComponent></TimelineFilterComponent>
        </div>
    </div>
</template>


<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TimelineFallComponent from './../components/timelinefall.vue';
import TimelineFilterComponent from './../components/timelinefilter.vue';

@Component({
  components: {TimelineFallComponent, TimelineFilterComponent},
})
export default class Timeline extends Vue {
}
</script>

<style lang='scss'>
.timeline{
    &-container{
        display:flex;
        scroll:none;
    }
    &-fall-container{
        
    }
    &-filter-container{
        color: white;
        position: fixed;
        top: 0px;
        right: 0px;
        height: 100%;
        overflow: auto;
    }
}


</style>