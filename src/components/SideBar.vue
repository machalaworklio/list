<template>
  <div :class="$style.sort">
    <div :class="$style.sortBy" @click="$emit('update:newList', 'value')">
      <p>Sort by <strong :style="$style.boldText">Value</strong></p>
    </div>
    <div :class="$style.sortBy" @click="$emit('update:newList', 'time')">
      <!--
      1. @event="$emit("název", hodnota)
      2. time -> value, "time" -> string
      --->
      <p>Sort by <strong :style="$style.boldText">Added Date</strong></p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'SideBar',
  props: {
    newList: {
      type: String,
      required: true,
    },
  },
  emits: ['update:newList'],
});
</script>

<style lang="scss" module>
@use 'sass/color';
.sort {
  margin: 180px auto 0 50px;
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
