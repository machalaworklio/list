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
      <span :class="$style.date">{{ finalTime }}</span>
      <div :class="$style.trashBg">
        <IconTrash :class="$style.trashIcon" @click="$emit('remove', number)" />
      </div>
    </div>
  </li>
</template>
<script lang="ts">
import { defineComponent, computed } from '@vue/runtime-core';
import { formatDistance, parseISO } from 'date-fns';
import IconCheck from './IconCheck.vue';
import IconTrash from './IconTrash.vue';
import { actualTime } from '../script/actualTime';

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
  emits: ['remove'],
  setup(props) {
    const finalTime = computed(() =>
      formatDistance(parseISO(props.time), actualTime.value, {
        addSuffix: true,
        includeSeconds: true,
      })
    );
    return {
      finalTime,
    };
  },
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
    .trashBg {
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
  height: 30px;
  margin: 0px 0 0 6px;
  width: 20px;
  color: color.$trash;
}
.trashBg {
  cursor: pointer;
  display: none;
  width: 30px;
  height: 30px;
  background: color.$nonVisible;
  border-radius: 50%;
  margin: 5px 0 0 5px;
  &:hover {
    background: color.$trash;
  }
}
</style>
