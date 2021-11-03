<template>
  <div :class="$style.sort">
    <button
      :class="[$style.list, { [$style.active]: newList === 'value' }]"
      @click="$emit('update:newList', 'value')">
      <span :class="$style.content">Sort by</span>
      <span :class="$style.bold">Value</span>
      <div :class="$style.circle" />
    </button>
    <button
      :class="[$style.list, { [$style.active]: newList === 'time' }]"
      @click="$emit('update:newList', 'time')">
      <!--
      1. @event="$emit("název", hodnota)
      2. time -> value, "time" -> string
      --->
      <span :class="$style.content">Sort by</span>
      <span :class="$style.bold">Added Date</span>
      <div :class="$style.circle" />
    </button>
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
.bold {
  color: color.$boldText;
}
.content {
  color: color.$lightText;
  margin-right: 5px;
}
.list {
  background: color.$nonVisible;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  height: 40px;
  line-height: 1.6;
  margin-top: 5px;
  padding: 10px;
  width: 100%;
  &:hover {
    background: color.$activeItem;
  }
}
.circle {
  background: color.$true;
  border-radius: 50%;
  display: none;
  height: 4px;
  margin: 8px 0px 0 auto;
  width: 4px;
}
.active {
  background: color.$activeItem;
  & .circle {
    display: block;
  }
}
</style>
