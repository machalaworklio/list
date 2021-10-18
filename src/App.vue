<template>
    <div :class="$style.workspace">
        <div :class="$style.container">
            <form @submit.prevent="addList()">
                <input
                    v-model="newList"
                    name="newList"
                    autocomplete="off"
                    :class="$style.searchBar"
                >
            </form>
            <ul :class="$style.list">
                <li
                    v-for="(list, index) in lists"
                    :key="index"
                    :class="$style.listItem"
                >
                <div :class="$style.info">
                    <span :class="$style.content">{{ list.content }}</span>
                    <span :class="$style.number">#{{ list.number }}</span>
                </div>
                <div :class="$style.options">
                    <span :class="$style.date">{{ listDate }}</span>
                    <img src="./assets/trash.svg" @click="removeList(index)" :class="$style.trashIcon">
                </div>
                </li>
            </ul>
            <h4 v-if="lists.length === 0">Empty list</h4>
        </div>
        <div :class="$style.sort">
            <div :class="$style.sortByValue">
                <p>Sort by Value</p>
            </div>
            <div :class="$style.sortByDate">
                <p>Sort by Added Date</p>
            </div>
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
.workspace{
    display: flex;
}
.container{
    width: 400px;
    margin: 70px 0 0 auto;
}
.searchBar{
    width: 100%;
    height: 30px;
    padding: 5px;
    outline: none;
}
.list{
    padding: 0;
    margin: 0;
    width: 100%;
}
.listItem{
    width: 100%;
    list-style: none;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    &:hover{
        img{
            display: block;
        }
    }
}
.info{
    display: flex;
    flex-direction: column;
}
.options{
    display: flex;
}
.content{
    font-weight: bold;
}
.date{
    margin-top: 10px;
}
.trashIcon{
    height: 30px;
    width: 20px;
    margin: 5px 0 0 10px;
    display: none;
}
.sort{
    width: 150px;
    margin: 100px auto 0 30px;
}
</style>
