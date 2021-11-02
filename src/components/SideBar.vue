<template>
  <div :class="$style.sort">
    <div :class="$style.sortBy" @click="$emit('update:newList', 'value')">
      <p :class="$style.content">Sort by</p>
      <i :style="$style.boldText">Value</i>
    </div>
    <div :class="$style.sortBy" @click="$emit('update:newList', 'time')">
      <!--
      1. @event="$emit("název", hodnota)
      2. time -> value, "time" -> string
      --->
      <p :class="$style.content">Sort by</p>
      <i :style="$style.boldText">Added Date</i>
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
  width: 200px;
}
.boldText {
  color: color.$boldText;
  font-style: normal;
}
.content {
  color: color.$lightText;
  margin-right: 5px;
}
.sortBy {
  border-radius: 5px;
  cursor: pointer;
  padding: 10px;
  display: flex;
  &:hover {
    background: color.$activeItem;
  }
}
</style>
