<template>
  <li :class="$style.listItem">
    <div :class="$style.info">
      <span v-if="icon"
        ><IconCheck :class="$style.checkIcon" />Exact Match</span
      >
      <span :class="$style.content">{{ content }}</span>
      <span :class="$style.number">#{{ number }}</span>
    </div>
    <div :class="$style.options">
      <span :class="$style.date">{{ time }}</span>
      <IconTrash
        :class="$style.trashIcon"
        @click="$emit('removeList', number)" />
    </div>
  </li>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import IconCheck from './IconCheck.vue';
import IconTrash from './IconTrash.vue';

export default defineComponent({
  name: 'ListItem',
  components: {
    IconCheck,
    IconTrash,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    icon: Boolean,
  },
  emits: ['removeList'],
  /*
  parent -> child - props
  child -> parent - emit
  */
});
</script>
<style lang="scss" module>
@use 'sass/color';
.listItem {
  border-bottom: 1px solid color.$line;
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 10px;
  width: 100%;
  &:hover {
    background: color.$activeItem;
    border-radius: 5px;
    svg {
      display: block;
    }
  }
}
.info {
  display: flex;
  flex-direction: column;
}
.options {
  display: flex;
}
.content {
  font-weight: bold;
}
.date {
  margin-top: 10px;
}
.trashIcon {
  cursor: pointer;
  display: none;
  height: 30px;
  margin: 5px 0 0 10px;
  width: 20px;
}
</style>
