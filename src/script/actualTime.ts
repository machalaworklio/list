import { ref } from '@vue/runtime-core';
// ready to use in multiple files
export const actualTime = ref(new Date());
window.setInterval(callBack, 500);

function callBack() {
  actualTime.value = new Date();
}
