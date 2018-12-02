<template>
    <div>
        <div class= "infoContainer">
            <div class ="label">{{label}}</div> 
            <div class ="value">{{(value).toLocaleString()}}</div>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoCapsuleComponent extends Vue {
    @Prop() private label: string;
    @Prop() private value: string;
}
</script>

<style lang='scss'>
.infoContainer{
    padding :4px;
    display: flex;
    flex-flow: row wrap;
}
.label{
    background: chocolate;
    border: 3px;
    padding-right: 10px;
    padding-left: 10px;
    text-align: center;
    border-top-left-radius: 15px;
    /* border-top-right-radius: 15px; */
    border-bottom-left-radius: 15px;
    width: 40px;
    color: white;
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
</style>

