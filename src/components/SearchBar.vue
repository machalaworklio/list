<template>
  <form @submit.prevent="addList">
    <input
      :value="newList"
      name="newList"
      autocomplete="off"
      :class="$style.searchBar"
      @input="$emit('update:newList', $event.target.value)" />
    <!--
      1: $emit("emit") - musí obsahovat update: -> ("update:emit")
      2: $event je ten event kterej se zavolal, $event.target je html element toho eventu, a $event.target.value je hodnota toho inputu
    -->
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
  components: {
    IconCancel,
    IconAdd,
  },
  // prop
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
.searchBar {
  background: color.$search;
  border: none;
  height: 40px;
  outline: none;
  padding: 10px;
  width: 100%;
}
</style>
