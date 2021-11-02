<template>
  <div :class="$style.sort">
    <div
      :class="[$style.sortBy, { [$style.active]: newList === 'value' }]"
      @click="$emit('update:newList', 'value')">
      <p :class="$style.content">Sort by</p>
      <i :class="$style.boldText">Value</i>
      <div :class="$style.circle" />
    </div>
    <div
      :class="[$style.sortBy, { [$style.active]: newList === 'time' }]"
      @click="$emit('update:newList', 'time')">
      <!--
      1. @event="$emit("název", hodnota)
      2. time -> value, "time" -> string
      --->
      <p :class="$style.content">Sort by</p>
      <i :class="$style.boldText">Added Date</i>
      <div :class="$style.circle" />
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
  margin-top: 5px;
  &:hover {
    background: color.$activeItem;
  }
}
.circle {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 8px 0px 0 auto;
  background: color.$true;
  display: none;
}
.active {
  background: color.$activeItem;
  & .circle {
    display: block;
  }
}
</style>
