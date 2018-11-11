<template>
    <div>
        <div v-if="labelFirst">
            <span class ="label">{{label}}</span> 
            <span class ="value">{{(value).toLocaleString()}}</span>
        </div>
        <div v-if="!labelFirst">
            <span class ="valueReversed">{{(value).toLocaleString()}}</span>
            <span class ="labelReversed">{{label}}</span> 
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoCapsuleComponent extends Vue {
    @Prop() private label: string;
    @Prop() private value: string;
    @Prop() private labelFirst = false; 
}
</script>

<style lang='scss'>
.label{
    background: chocolate;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-left-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-left-radius: 15px;
}
.value{
    background: antiquewhite;
    color: black;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-right-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-right-radius: 15px;
}
.valueReversed{
    background: antiquewhite;
    color: black;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-left-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-left-radius: 15px;
}
.labelReversed{
    background: chocolate;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-right-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-right-radius: 15px;
}
</style>

