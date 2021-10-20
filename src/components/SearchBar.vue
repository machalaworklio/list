<template>
  <form @submit.prevent="addList">
    <input
      v-model="newList"
      name="newList"
      autocomplete="off"
      :class="$style.searchBar" />
  </form>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
  name: 'SearchBar',
});
</script>
<style lang="scss" module>
.searchBar {
  background: $search;
  border: none;
  height: 40px;
  outline: none;
  padding: 10px;
  width: 100%;
}
</style>
