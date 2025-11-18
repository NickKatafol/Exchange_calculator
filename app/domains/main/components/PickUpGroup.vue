<script setup lang="ts">
const props = defineProps<{
  unitTypes: string[]
  options: {
    inputCode: string
    title: string
    placeholder: string
  },
  currencyAmount: string
  unitType: string
}>()

const emit = defineEmits<{
  (e: 'update:currencyAmount', value: string): void,
  (e: 'update:unitType', value: string): void,
  (e: 'whereFocusIs', value: string): void,
}>()

let isDropZonaHidden = ref(false)

function whereFocusIs(): void {
  emit('whereFocusIs', props.options.inputCode)
}

let inputAmountBuffer = ref('')
inputAmountBuffer.value = props.currencyAmount

watch(() => props.currencyAmount, (newVal, oldVal) => {
    inputAmountBuffer.value = newVal
  },
  { immediate: true }
)

const inputAmount = computed<string>({
  get() {
    return inputAmountBuffer.value
  },
  set(val) {
    inputAmountBuffer.value = val
    let clearVal = rankingNumbers(val)

    nextTick(() => inputAmountBuffer.value = clearVal)
    emit('update:currencyAmount', clearVal)
  }
})

function chosenItemHandler(selectedItem: string): void {
  if(props.unitType !== selectedItem)
    emit('update:unitType', selectedItem)

  isDropZonaHidden.value = true
  setTimeout(() => isDropZonaHidden.value = false, 200)
}



</script>

<template>
  <div class="pick-up-input-wrapper">
    <div class="pick-up__title">
      {{ props.options.title }}
    </div>

    <div class="pick-up__body">
      <input v-model="inputAmount" 
            :placeholder="props.options.placeholder" 
            @click="whereFocusIs" 
      />

      <div class="body__unit-btn">
        {{ props.unitType }}
      </div>


      <Main_FilteredSelect :itemNames="props.unitTypes" 
                           placeholder="Filter" 
                           @selectedItem="chosenItemHandler"
                           class="body__filtered-select" 
                           :class="{ 'drop-zona-hidden': isDropZonaHidden }" 
      />
    </div>
  </div>
</template> 

<style scoped lang="scss">
.pick-up-input-wrapper {
  width: 100%;
  height: fit-content;

  .pick-up__title {
    font-weight: 900;
    box-sizing: border-box;
    padding-bottom: calc($commonGap / 2);
  }

  .pick-up__body {
    position: relative;
    width: 100%;
    height: min-content;
    display: flex;

    input {
      width: 66%;
      border: $blue_light 1px solid;
      padding: rem(4);
      z-index: 10;
    }

    .body__unit-btn {
      width: 33%;
      background: $blue;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $white;
      cursor: pointer;
    }

    .body__unit-btn:hover {
      opacity: 0.8;
    }

    .body__filtered-select {
      display: none;
      position: absolute;
      width: 33%;
      height: 100%;
      top: 100%;
      right: 0;
      z-index: 20;
      cursor: pointer;
    }

    .body__unit-btn:hover~.body__filtered-select,
    .body__filtered-select:hover {
      display: block;
    }

    .drop-zona-hidden {
      display: none !important;
    }
  }
}
</style>
