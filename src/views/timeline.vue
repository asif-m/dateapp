<template>
    <div>
        <v-layout row>
            <v-flex>
                <v-card>
                    <v-container fluid grid-list-sm>
                        <v-layout row wrap>
                          Timeline
                            <!-- <v-flex v-for="event in events" :key="event.id" xs4>
                                <div>
                                   Timeline
                                </div>
                            </v-flex> -->
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Timeline extends Vue {}
</script>

<style lang='scss'>
</style>

