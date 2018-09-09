<template>
  <div>
    <v-card>
        <v-img height="200px">
            <div>{{eventname}}</div>
            <div>{{date}}</div>
        </v-img>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>create</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class EventSummaryComponent extends Vue {
    @Prop() public eventname: string;
    @Prop() public date: Date;
}
</script>

<style lang='scss'>
</style>

