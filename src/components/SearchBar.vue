<template>
  <div :class="$style.container">
    <form :class="$style.searchBox" @submit.prevent="addList">
      <!-- event se provede, dál nepokračuje -->
      <input
        :value="newList"
        name="newList"
        autocomplete="off"
        :class="$style.search"
        placeholder="Search or Add..."
        @input="$emit('update:newList', $event.target.value)"
        @keydown.esc="$emit('update:newList', '')" />
      <!--
      1: $emit("emit") - musí obsahovat update: -> ("update:emit")
      2: $event je ten event kterej se zavolal, $event.target je html element toho eventu, a $event.target.value je hodnota toho inputu
    --></form>
    <div v-if="deleteIcon" :class="$style.searchIcons">
      <div :class="$style.iconRadius">
        <button
          v-if="deleteIcon"
          :class="$style.cancelBg"
          title="Clear"
          type="button"
          @click="$emit('update:newList', '')">
          <IconCancel :class="$style.cancelIcon" />
        </button>
        <button
          v-if="iconAdd"
          :class="$style.addBg"
          title="Add"
          type="button"
          @click="addList">
          <IconAdd :class="$style.addIcon" />
        </button>
        <button v-if="!iconAdd" :class="$style.addBgFalse" type="button">
          <IconAdd :class="$style.addIconFalse" />
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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
  /*
  props jsou data komponentu který tomu předáváš z parentu,
  funguje to prakticky stejně jak například klasickej input element,
  taky přijímá nějaký atributy na základě čeho mění chování toho inputu
  */
  emits: ['update:newList', 'newValue'],
  // update - v model
  setup(props, { emit }) {
    const deleteIcon = computed(() => props.newList !== '');
    function addList() {
      if (props.iconAdd && props.newList) {
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
.search {
  background: color.$searchBar;
  border: none;
  color: color.$boldText;
  font-size: 15px;
  height: 60px;
  outline: none;
  padding: 20px;
  width: 100%;
}
::placeholder {
  color: color.$lightText;
}
.searchIcons {
  background: color.$searchBar;
  width: 100px;
}
.searchBox {
  width: 100%;
}
.container {
  display: flex;
  width: 100%;
}
.iconRadius {
  background: color.$searchBarRadius;
  border-radius: 30px;
  display: flex;
  height: 40px;
  margin: 10px 10px 0 0;
  width: 80px;
}
.cancelIcon {
  color: color.$trash;
  height: 25px;
  margin: 4px 0 0 1px;
  width: 25px;
}
.cancelBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
  &:hover {
    background: color.$trash;
    & .cancelIcon {
      color: color.$activeItem;
    }
  }
}
.addIcon {
  color: color.$true;
  height: 25px;
  margin: 4px 0 0 1px;
  width: 25px;
}
.addBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 40px;
  width: 40px;
  &:hover {
    background: color.$true;
    & .addIcon {
      color: color.$activeItem;
    }
  }
}
.addBgFalse {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: not-allowed;
  height: 40px;
  width: 40px;
}
.addIconFalse {
  color: color.$lightText;
  height: 25px;
  margin: 4px 0 0 1px;
  width: 25px;
}
</style>
