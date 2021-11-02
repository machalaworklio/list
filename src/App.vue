<template>
  <div :class="$style.workspace">
    <div :class="$style.container">
      <SearchBar
        v-model:newList="newList"
        :icon-add="iconAdd"
        @new-value="addList" />
      <!--
        // 1: v-model:prop=":value"
        // 2: používáš prop newList, a potřebuju aby jsi pak na ten search bar
              mohl použít v-model aby to mohlo komunikovat jak parent > child,
              tak child > parent
        // 3: props: definují se camel case, zapisují se kebab case

      -->
      <ul :class="$style.list">
        <ListItem
          v-for="(list, index) in exactContent"
          :key="index"
          :content="list.content"
          :number="list.number"
          :time="list.time"
          :icon="list.icon"
          @remove="removeList" />
      </ul>
      <h4 v-if="lists.length === 0">Empty list</h4>
    </div>
    <SideBar v-model:newList="sortBy" />
    <!--
    // sortValue check
    {{ sortBy }}
    -->
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue';
import { formatISO } from 'date-fns';
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
  emits: ['delete'],
  setup() {
    const newList = ref('');
    const sortBy = ref<'value' | 'time'>('time');
    interface listsType {
      content: string;
      number: number;
      time: string;
    }
    // date-fns: formatDistanceToNow, formatDistanceToNowStrict
    // getNow(), kam dát funkci
    // default
    const lists = ref<listsType[]>([
      {
        content: 'hello',
        number: 3,
        time: formatISO(new Date()),
      },
      {
        content: 'bye',
        number: 4,
        time: formatISO(new Date()),
        // new Date - aktuální čas, formatISO & parseISO
      },
    ]);
    // counter
    const newId = computed(
      () => Math.max(...lists.value.map((obj) => obj.number), 0) + 1
      // Math.max - zjistí max. hodnotu (externí pole ...)
      // .map(vnitřní funkce) - metoda co zavolá funkci pro každou položku v array
    );

    const contentSorted = computed(() =>
      [...contentSearch.value].sort((a, b) => {
        if (sortBy.value === 'value') {
          // alphabet sort
          if (a.content < b.content) {
            return -1;
          }
          if (a.content > b.content) {
            return 1;
          }
          return 0;
        } else {
          // time sort
          return Date.parse(b.time) - Date.parse(a.time);
        }
      })
    );
    // nelze kopírovat přímo ref ale hodnotu z něj
    // copy - ...lists -> musí referovat hodnotu .value
    const searchSame = computed(() =>
      // filter vrací pole
      lists.value.filter(
        (obj) => obj.content.toLowerCase() === newList.value.toLowerCase()
      )
    );
    // searchbar
    const iconAdd = computed(
      () => newList.value !== '' && searchSame.value.length === 0
    );
    // sort
    const contentSearch = computed(
      () =>
        lists.value.filter(
          (obj) =>
            obj.content.toLowerCase().includes(newList.value.toLowerCase()) // boolean
        ) // .includes - line-up ignore, .toLowerCase - capital letters ignore
    );
    const exactContent = computed(() =>
      contentSorted.value.map((obj) => {
        const icon = !!searchSame.value.find(
          // find najde item = není boolean, ale pole
          // 1. ! - neguje (true nebo false) 2. ! vrátí na původní hodnotu (boolean)
          (list) => list.number === obj.number
        );
        return { ...obj, icon };
      })
    );
    // filter
    function addList(addValue: string) {
      // pushne data do pole
      if (searchSame.value.length === 0) {
        lists.value.push({
          content: addValue,
          number: newId.value,
          time: formatISO(new Date()),
        });
      } else {
        return;
      }
    }
    function removeList(id: number) {
      /*
      // kontrola, jestli kliknutí vyhodí number listu
      console.log(id);
      */
      // na kliknutí se mi vyhledá jen to, co má zůstat
      const filtered = lists.value.filter((obj) => obj.number !== id);
      /*
      1: filter dělá to, že vezme pole, na základě nějaké podmínky vynechá určité položky v tom poli a vrátí výsledek
      2: filter prakticky vždycky je určenej k odstraňování prvků z pole
      3: filter ti vrátí nový pole, na co to používáš je tomu filteru uplně jedno
      */
      // přepíšu originální data
      lists.value = filtered;
    }

    return {
      lists,
      newList,
      contentSearch,
      sortBy,
      contentSorted,
      iconAdd,
      exactContent,
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
  margin: 100px 0 0 auto;
  width: 800px;
}
.list {
  margin: 20px 0 0 0;
  padding: 0;
  width: 100%;
}
</style>
