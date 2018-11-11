<template>
    <span><span>{{label}}</span> <span>{{value}}</span></span>
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

</style>

