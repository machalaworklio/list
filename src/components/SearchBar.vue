<template>
  <form @submit.prevent="addList">
    <input
      :value="newList"
      name="newList"
      autocomplete="off"
      :class="$style.searchBar" />
  </form>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
  name: 'SearchBar',
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
