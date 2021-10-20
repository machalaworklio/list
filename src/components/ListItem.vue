<template>
  <li :class="$style.listItem">
    <div :class="$style.info">
      <span :class="$style.content">{{ list.content }}</span>
      <span :class="$style.number">#{{ list.number }}</span>
    </div>
    <div :class="$style.options">
      <span :class="$style.date">{{ list.time }}</span>
      <img
        src="./assets/trash.svg"
        :class="$style.trashIcon"
        @click="removeList(index)" />
    </div>
  </li>
</template>
<script>
import { defineComponent } from '@vue/runtime-core';
export default defineComponent({
  name: 'ListItem',
});
</script>
<style lang="scss" module>
.listItem {
  border-bottom: 1px solid $line;
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 10px;
  width: 100%;
  &:hover {
    background: $activeItem;
    border-radius: 5px;
    img {
      display: block;
    }
  }
}
.info {
  display: flex;
  flex-direction: column;
}
.options {
  display: flex;
}
.content {
  font-weight: bold;
}
.date {
  margin-top: 10px;
}
.trashIcon {
  cursor: pointer;
  display: none;
  height: 30px;
  margin: 5px 0 0 10px;
  width: 20px;
}
</style>
