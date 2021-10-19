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
                    <span :class="$style.date">{{ list.time }}</span>
                    <img src="./assets/trash.svg" @click="removeList(index)" :class="$style.trashIcon">
                </div>
                </li>
            </ul>
            <h4 v-if="lists.length === 0">Empty list</h4>
        </div>
        <div :class="$style.sort">
            <div :class="$style.sortBy" @click="sortByValue()">
                <p>Sort by <strong :style="$style.boldText">Value</strong></p>
            </div>
            <div :class="$style.sortBy" @click="sortByTime()">
                <p>Sort by <strong :style="$style.boldText">Added Date</strong></p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { ref, computed, defineComponent } from 'vue';
import { format, formatDistance, formatRelative, subMinutes } from 'date-fns';

export default defineComponent({
  name: 'App',
  setup () {
      const newList = ref('');
      const newListCount = ref(1);
      const listDate = formatDistance(new Date(), new Date(), { addSuffix: true });

      interface listsType{
            content: string,
            number: number,
            time: string,
       }
       
       const valueSort = computed(() => { 
           return [lists].sort((a, b) => a[lists.number] < b[lists.number] ? -1 : 1);
        });

      //sběr dat
      const listsData = JSON.parse(localStorage.getItem('lists') as any);
      const lists = ref<listsType[]>(listsData);

      function addList () {
          if (newList.value) {
              lists.value.push({
                  content: newList.value,
                  number: newListCount.value,
                  time: listDate,
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
          valueSort,

          addList,
          removeList,
          saveData,
      }
    },
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
    height: 40px;
    padding: 10px;
    outline: none;
    background: gray;
    border: none;
}
.list{
    padding: 0;
    margin: 20px 0 0 0;
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
        background: white;
        border-radius: 5px;
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
    cursor: pointer;
}
.sort{
    width: 150px;
    margin: 100px auto 0 30px;
}
.boldText{
    color: black;
    margin-left: 5px;
}
.sortBy{
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background: white;
    }
}
</style>
