<template>
  <div :class="$style.workspace">
    <div :class="$style.container">
      <SearchBar v-model:newList="newList" />
      <!--
        // 1: v-model:prop=":value"
        // 2: používáš prop newList, a potřebuju aby jsi pak na ten search bar mohl použít v-model aby to mohlo komunikovat jak parent > child, tak child > parent
      -->
      <ul :class="$style.list">
        <ListItem
          v-for="(list, index) in contentSearch"
          :key="index"
          :content="list.content"
          :number="list.number"
          :time="list.time" />
      </ul>
      <h4 v-if="lists.length === 0">Empty list</h4>
    </div>
    <SideBar />
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
// import { formatISO } from 'date-fns';
import SearchBar from './components/SearchBar.vue';
import ListItem from './components/ListItem.vue';
import SideBar from './components/SideBar.vue';
export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
    ListItem,
    SideBar,
  },
  setup() {
    const newList = ref('');
    const sortByValue = ref<'value' | 'time'>('value');
    sortByValue.value = 'value';
    interface listsType {
      content: string;
      number: number;
      time: Date;
    }
    // default
    const lists = ref<listsType[]>([
      {
        content: 'hello',
        number: 3,
        time: new Date(),
      },
      {
        content: 'bye',
        number: 5,
        time: new Date(),
        // new Date - aktální čas, parseISO
      },
    ]);
    // counter
    const newId = computed(
      () => Math.max(...lists.value.map((obj) => obj.number), 0) + 1
      // Math.max - zjistí max. hodnotu (externí pole ...)
      // .map(vnitřní funkce) - metoda co zavolá funkci pro každou položku v array
    );
    /*
    // nelze kopírovat přímo ref ale hodnotu z něj
    const sortValue = computed(
      () => [...lists.value].sort((a, b) => a.number - b.number)
      // copy - ...lists -> musí referovat hodnotu .value
    );
    const sortTime = computed(
      () => [...lists.value].sort((a, b) => a.time < b.time)
      // copy - ...lists -> musí referovat hodnotu .value
    );
    */
    // sort
    const contentSearch = computed(
      () =>
        lists.value.filter((obj) =>
          obj.content.toLowerCase().includes(newList.value.toLowerCase())
        ) // .includes - line-up ignore, .toLowerCase - capital letters ignore
    );
    // filter
    function addList() {
      if (newList.value) {
        lists.value.push({
          content: newList.value,
          number: newId.value,
          time: new Date(),
        });
        newList.value = '';
      }
    }
    function removeList(index: number) {
      lists.value.splice(index, 1);
    }
    return {
      lists,
      newList,
      contentSearch,
      addList,
      removeList,
    };
  },
});
</script>

<style lang="scss" module>
@use 'sass/color';
.workspace {
  display: flex;
}
.container {
  margin: 70px 0 0 auto;
  width: 400px;
}
.list {
  margin: 20px 0 0 0;
  padding: 0;
  width: 100%;
}
</style>
