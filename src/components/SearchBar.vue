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
  background: color.$nonVisible;
  border: none;
  color: color.$boldText;
  font-family: inherit;
  font-size: 14px;
  height: 60px;
  outline: none;
  padding: 0 20px;
  width: 100%;
  &::placeholder {
    color: color.$searchText;
    opacity: 1;
    /*
    1. pseudo elementy si každej prohlížeč v podstatě styluje sám,
       jsou tam mezi prohlížečema rozdíly, tohle je jeden rozdíl
    2. firefox má světlejší barvu přes opacity, chromium přes rgba
    */
  }
}
.searchIcons {
  align-items: center;
  background: color.$nonVisible;
  display: flex;
  padding: 0 10px;
  width: auto;
}
.searchBox {
  width: 100%;
}
.container {
  background: color.$searchBar;
  border-radius: 6px;
  display: flex;
  margin-bottom: 30px;
  width: 100%;
}
.iconRadius {
  background: color.$searchBarRadius;
  border-radius: 30px;
  display: flex;
  height: 46px;
}
.cancelIcon {
  color: color.$trash;
  height: 24px;
  margin: 3px 0 0 0;
  width: 24px;
}
.cancelBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 46px;
  width: 46px;
  &:hover {
    background: color.$trash;
    .cancelIcon {
      color: color.$activeItem;
    }
  }
}
.addIcon {
  color: color.$searchTrue;
  height: 24px;
  margin: 3px 0 0 0;
  width: 24px;
}
.addBg {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 46px;
  width: 46px;
  &:hover {
    background: color.$searchTrue;
    .addIcon {
      color: color.$activeItem;
    }
  }
}
.addBgFalse {
  background: color.$nonVisible;
  border: none;
  border-radius: 50%;
  cursor: not-allowed;
  height: 46px;
  width: 46px;
}
.addIconFalse {
  color: color.$searchFalse;
  height: 24px;
  margin: 3px 0 0 0;
  width: 24px;
}
</style>
