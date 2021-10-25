<template>
  <form @submit.prevent="addList">
    <input
      :value="newList"
      name="newList"
      autocomplete="off"
      :class="$style.searchBar" />
    <IconCancel :class="$style.iconCancel" />
    <IconAdd :class="$style.iconAdd" />
  </form>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
import IconCancel from './IconCancel.vue';
import IconAdd from './IconAdd.vue';

export default defineComponent({
  name: 'SearchBar',
  component: {
    IconCancel,
    IconAdd,
  },
  props: {
    newList: {
      type: String,
      required: true,
    },
  },
});
</script>
<style lang="scss" module>
@use 'sass/color';
.searchBar {
  background: color.$search;
  border: none;
  height: 40px;
  outline: none;
  padding: 10px;
  width: 100%;
}
</style>
