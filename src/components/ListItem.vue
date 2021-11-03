<template>
  <li :class="$style.listItem">
    <div :class="$style.info">
      <div :class="$style.checkBox">
        <IconCheck v-if="icon" :class="$style.checkIcon" />
      </div>
      <div :class="$style.contentBox">
        <span :class="$style.content">{{ content }}</span>
        <div>
          <span v-if="icon" :class="$style.exact">Exact Match</span>
          <span :class="$style.number">{{ '#' + number }}</span>
          <!-- pro text přenášející hodnotu je <p></p>, pro text nesoucí krátké spojení (popsání funkce) je <span></span> -->
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
      <!-- na běžný klikání je <button></button> tomu se pak přizpůsobuje type, na odkazování je <a></a> -->
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
  height: 24px;
  margin: 3px 0 0 0px;
  width: 24px;
}
.trashBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: none;
  height: 46px;
  width: 46px;
  &:hover {
    background: color.$trash;
    .trashIcon {
      color: color.$activeItem;
    }
  }
}
.date {
  color: color.$boldText;
  font-family: inherit;
  font-size: 13px;
  padding: 0 10px;
}
.contentBox {
  padding: 0 10px;
}
.listItem {
  align-items: center;
  display: flex;
  height: 70px;
  justify-content: space-between;
  list-style: none;
  padding: 0 10px;
  transition: 0.2s;
  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid color.$line;
  }
  &:hover {
    background: color.$activeItem;
    border-radius: 6px;
    box-shadow: 0px 0px 40px rgba(#000, 0.05);
    // offsex X, offset Y, blur-radius, color (#hex, alpha - %: [5% = 0.05])
    transition: 0.33s;
    .trashBg {
      display: block;
    }
    .date {
      justify-content: space-between;
    }
  }
}
.info {
  display: flex;
}
.options {
  align-items: center;
  color: color.$boldText;
  display: flex;
}
.number {
  color: color.$lightText;
  font-family: inherit;
  font-size: 12px;
}
.content {
  font-family: inherit;
  font-size: 14px;
}
.exact {
  color: color.$true;
  font-size: 13px;
  margin: 0 5px 0 0;
}
.checkIcon {
  color: color.$true;
  height: 25px;
  margin: 8px 20px 0 10px;
  width: 25px;
}
</style>
