<template>
  <li :class="$style.listItem">
    <div :class="$style.info">
      <div :class="$style.checkBox">
        <IconCheck v-if="icon" :class="$style.checkIcon" />
      </div>
      <div>
        <span :class="$style.content">{{ content }}</span>
        <div>
          <span v-if="icon" :class="$style.exact">Exact Match</span>
          <span :class="$style.number">{{ '#' + number }}</span>
        </div>
      </div>
    </div>
    <div :class="$style.options">
      <span :class="$style.date">{{ finalTime }}</span>
      <button
        :class="$style.trashBg"
        title="Delete"
        @click="$emit('remove', number)">
        <IconTrash :class="$style.trashIcon" />
      </button>
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
.trashIcon {
  color: color.$trash;
  height: 30px;
  margin: 3px 0 0 0px;
  width: 20px;
}
.trashBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  height: 40px;
  margin: 7px 10px 0 0;
  width: 40px;
  &:hover {
    background: color.$trash;
    .trashIcon {
      color: color.$activeItem;
    }
  }
}
.listItem {
  border-bottom: 1px solid color.$line;
  display: flex;
  height: 65px;
  justify-content: space-between;
  list-style: none;
  padding: 5px;
  transition: 0.2s;
  width: 100%;
  &:hover {
    background: color.$activeItem;
    border-radius: 5px;
    box-shadow: 1px 1px 20px 1px #d6d6d6;
    transition: 0.33s;
    .trashBg {
      display: block;
    }
  }
}
.info {
  display: flex;
  margin: 8px 0 0 10px;
}
.options {
  color: color.$boldText;
  display: flex;
}
.number {
  color: color.$lightText;
  font-size: 13px;
}
.exact {
  color: color.$true;
  font-size: 13px;
  margin: 0 5px 0 0;
}
.date {
  color: color.$boldText;
  margin: 17px 10px 0 0;
}
.checkIcon {
  color: color.$true;
  height: 25px;
  margin: 8px 20px 0 10px;
  width: 25px;
}
</style>
