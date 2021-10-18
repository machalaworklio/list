<template>
    <div>
        <form @submit.prevent="addList()">
            <input
                v-model="newList"
                name="newList"
                autocomplete="off"
            >
        </form>
        <ul>
            <li
                v-for="(list, index) in lists"
                :key="index"
            >
                <span>{{ list.content }}</span>
                <span>{{ list.number }}</span>
                <span>{{ listDate }}</span>
                <img src="./assets/trash.svg" @click="removeList(index)">
            </li>
        </ul>
        <h4 v-if="lists.length === 0">Empty list</h4>
    </div>
    <div>
        <div>
            <p>Sort by Value</p>
        </div>
        <div>
            <p>Sort by Added Date</p>
        </div>
    </div>
</template>

<script lang="ts">

import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup () {
      const newList = ref('');
      const newListCount = ref(1);

      const listDate = Date.now() + "minutes ago";
       
      const defaultData = [{
          content: 'Write a blog post',
          number: 1,
      }]
      //sběr dat
      const listsData = JSON.parse(localStorage.getItem('lists') as any) || defaultData;
      const lists = ref(listsData);

      function addList () {
          if (newList.value) {
              lists.value.push({
                  content: newList.value,
                  number: newListCount.value,
              });
              newList.value = '';
              newListCount.value++;
          }
          saveData();
      }
      function removeList (index: number) {
          lists.value.splice(index, 1);
          newListCount.value--;
          saveData();
      }
      function saveData () {
          const storageData = JSON.stringify(lists.value);
          localStorage.setItem('lists', storageData);
      }
      return {
          lists,

          newList,
          newListCount,
          listDate,

          addList,
          removeList,
          saveData
      }
    }
});
</script>

<style lang="scss" module>
</style>
