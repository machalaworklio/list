<template>
  <div :class="$style.sort">
    <div :class="$style.sortBy" @click="$emit('value')" @value="sortByValue">
      <p>Sort by <strong :style="$style.boldText">Value</strong></p>
    </div>
    <div :class="$style.sortBy" @click="$emit('time')" @time="sortByTime">
      <p>Sort by <strong :style="$style.boldText">Added Date</strong></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'SideBar',
  emits: ['value', 'time'],
});
</script>

<style lang="scss" module>
@use 'sass/color';
.sort {
  margin: 100px auto 0 30px;
  width: 150px;
}
.boldText {
  color: color.$text;
  margin-left: 5px;
}
.sortBy {
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background: color.$activeItem;
  }
}
</style>
