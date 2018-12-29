<template>
      <v-timeline align-top dense>        
            <v-timeline-item v-for="timelinenodedata in this.$store.getters.currenttimeline"
                :key="timelinenodedata.id" color="rgba(138,43,226 ,1 )" small>
                <div class="timelinefall-container">
                    <div class="timelinefall-date">{{timelinenodedata.occuranceDateString}}</div>
                    <div class="timelinefall-card">
                        <TimelinePacketComponent :eventOccurenaces=timelinenodedata.eventOccurenaces></TimelinePacketComponent>
                    </div>
                </div>
            </v-timeline-item>
      </v-timeline>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import TimelinePacketComponent from './../components/timelinepacket.vue';

@Component({
  components: {TimelinePacketComponent},
})
export default class TimelineFallComponent extends Vue {
    public mounted() {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('keyup', this.handleKeyUp);
    }
    public beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('keyup', this.handleKeyUp);
    }
    public handleScroll() {
        // console.log(arguments);
    }
    public handleKeyUp() {
        // console.log(arguments);
    }
}
</script>

<style lang='scss'>
.timelinefall{
    &-container{
        display:flex;
    }
    &-date{
            font-size : 14px;
            text-align: left;
            padding-top: 9px;
            padding-left: 10px;
            width:150px;
            color:white;
        }
    &-card{
        padding-top: 5px;
    }
}
</style>