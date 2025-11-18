<script setup lang="ts">
const { itemNames, placeholder } = defineProps<{
  itemNames: string[]
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'selectedItem', value: string): void,
}>()

let inputVal = ref<string>('')

const filteredItemNames = computed<string[]>(() => {
  if(!inputVal.value)
    return itemNames
  return itemNames.filter((item: string) => item.toLowerCase().includes(inputVal.value.toLowerCase()))
})

function onItemChoice(ev: any) {
  inputVal.value = ''
  emit('selectedItem', ev.target.dataset.chosenItemName)
}

</script>

<template>
  <div class="selected-input-wrapper">
    <input type="text"
           v-model="inputVal"
           :placeholder=placeholder
    >
    <div @click="onItemChoice"
         class="drop-zona"
    >
      <div v-for="(itemName, ind) of filteredItemNames"
           :key="ind"
           :data-chosen-item-name="itemName"
           class="drop-zona__item"
      >
        {{ itemName }}
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.selected-input-wrapper {
  position: relative;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: white;
}

input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  border: none;
  background: #f8f9fb;
}

input::placeholder {
  opacity: 0.8;
  color: darkgray;
}

input:focus-visible {
  outline: none;
}

.drop-zona {
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  height: fit-content;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 2px;
  background: white;

  border: $grey_medium 1px solid;
  box-sizing: border-box;
  cursor: pointer;
}

.drop-zona__item {
  box-sizing: border-box;
  padding: 2px 7px;
}

.drop-zona__item:hover {
  background: #efeff5;
}

input {
  border: 1px solid #dee2e6;
}

input:focus-within {
  border: 1px solid #dee2e6 !important;
}

*:focus {
  outline: unset !important;
  border: unset !important;
  box-shadow: none !important;
}

</style>
