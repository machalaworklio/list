<template>
  <div :class="$style.formContainer">
    <form :class="$style.searchBarForm" @submit.prevent="addList">
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
    <div v-if="deleteIcon" :class="$style.searchIcons">
      <div :class="$style.iconRadius">
        <div
          v-if="deleteIcon"
          :class="$style.cancelBg"
          title="Clear"
          @click="$emit('update:newList', '')">
          <IconCancel :class="$style.iconCancel" />
        </div>
        <div v-if="iconAdd" :class="$style.addBg" title="Add" @click="addList">
          <IconAdd :class="$style.iconAdd" />
        </div>
        <div v-if="!iconAdd" :class="$style.addBgFalse">
          <IconAdd :class="$style.iconAddFalse" />
        </div>
      </div>
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
.searchBar {
  background: color.$searchBar;
  border: none;
  height: 60px;
  outline: none;
  padding: 20px;
  width: 100%;
  color: color.$boldText;
  font-size: 15px;
}
::placeholder {
  color: color.$lightText;
}
.searchIcons {
  width: 100px;
  background: color.$searchBar;
}
.searchBarForm {
  width: 100%;
}
.formContainer {
  width: 100%;
  display: flex;
}
.iconRadius {
  width: 80px;
  height: 40px;
  border-radius: 30px;
  margin: 10px 10px 0 0;
  background: color.$searchBarRadius;
  display: flex;
}
.cancelBg {
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: color.$nonVisible;
  border-radius: 50%;
  &:hover {
    background: color.$trash;
    & .iconCancel {
      color: color.$activeItem;
    }
  }
}
.iconCancel {
  height: 25px;
  margin: 7px 0 0 8px;
  width: 25px;
  color: color.$trash;
}
.addBg {
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: color.$nonVisible;
  border-radius: 50%;
  &:hover {
    background: color.$true;
    & .iconAdd {
      color: color.$activeItem;
    }
  }
}
.iconAdd {
  height: 25px;
  margin: 7px 0 0 8px;
  width: 25px;
  color: color.$true;
}

.addBgFalse {
  cursor: not-allowed;
  width: 40px;
  height: 40px;
  background: color.$nonVisible;
  border-radius: 50%;
}
.iconAddFalse {
  height: 25px;
  margin: 7px 0 0 8px;
  width: 25px;
  color: color.$lightText;
}
</style>
