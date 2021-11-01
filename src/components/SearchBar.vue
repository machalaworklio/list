<template>
  <div :class="$style.formContainer">
    <form @submit.prevent="addList">
      <!-- event se provede, dál nepokračuje -->
      <input
        :value="newList"
        name="newList"
        autocomplete="off"
        :class="$style.searchBar"
        placeholder="Search or Add..."
        @input="$emit('update:newList', $event.target.value)"
        @keydown.esc="$emit('update:newList', '')" />
      <!--
      1: $emit("emit") - musí obsahovat update: -> ("update:emit")
      2: $event je ten event kterej se zavolal, $event.target je html element toho eventu, a $event.target.value je hodnota toho inputu
    --></form>
    <div :class="$style.searchIcons">
      <IconCancel
        v-if="deleteIcon"
        :class="$style.iconCancel"
        @click="$emit('update:newList', '')" />
      <IconAdd v-if="iconAdd" :class="$style.iconAdd" @click="addList" />
    </div>
  </div>
</template>
<script>
import { computed, defineComponent } from '@vue/runtime-core';
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
    iconAdd: Boolean,
  },
  emits: ['update:newList', 'newValue'],
  // update - v model
  setup(props, { emit }) {
    const deleteIcon = computed(() => props.newList !== '');
    function addList() {
      if (props.newList) {
        // pushne data do pole
        emit('newValue', props.newList);
        // emit, hodnota property
        emit('update:newList', '');
      }
    }
    return {
      deleteIcon,
      addList,
    };
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
  width: 330px;
  color: color.$line;
}
.searchIcons {
  width: 70px;
  background: color.$search;
}
.formContainer {
  width: 100%;
  display: flex;
}
.iconCancel {
  height: 30px;
  margin: 0px 0 0 6px;
  width: 20px;
}
.iconAdd {
  height: 30px;
  margin: 5px 0 0 6px;
  width: 20px;
  color: color.$true;
}
</style>
