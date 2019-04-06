<template>
  <div class="dynamic-scroller-demo">
   <DynamicScroller
      :items="this.$store.getters.currenttimeline"
      :min-item-size="54"
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[
            item.occuranceDateString,
          ]"
          :data-index="index"
          :data-active="active"        
        >
          <div>
            {{ item.occuranceDateString }}
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
.dynamic-scroller-demo{
  height: 500px;
  background:white;
}
.scroller {
  height: 100%;
  background:white;
}

.dynamic-scroller-demo {
  overflow: hidden;
}
</style>
