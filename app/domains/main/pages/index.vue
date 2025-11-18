<script setup lang="ts">
// import { computed, reactive, ref, watchEffect } from 'vue'
import type { IExchangeCouple } from "../types/apiTypes";
import type { IInputSet } from "../types/pickUpGroupTypes";

//SEO
useHead({
  title: "Exchange calculator",
});

//declaration
const inputSets = ref<Record<'AS' | 'DS', IInputSet>>({
  AS: {
    unitTypes: [],
    options: {
      inputCode: "AS",
      title: "You Pay",
      placeholder: "Pay Amount",
    },
    currencyAmount: "",
    unitType: "USD",
  },
  DS: {
    unitTypes: [],
    options: {
      inputCode: "DS",
      title: "You Get",
      placeholder: "Get Amount",
    },
    currencyAmount: "",
    unitType: "EUR",
  },
});

const exchangeRate = ref(0);
const whereFocusIs = ref("AS");
const exchangCouples = ref<IExchangeCouple[]>([])

//income data
exchangCouples.value = await $fetch("/api/exchangeCouples")

//basic initialising
//calculating the unitTypes
watchEffect(() => {
  let currencyTypes: Array<string> = [];

  for (let exchangSet of exchangCouples.value) {
    currencyTypes.push(...exchangSet.currencyPair)
  }

  let pureList: string[] = [...new Set(currencyTypes)];

  for (let keyName of Object.keys(inputSets.value)) {
    inputSets.value[keyName].unitTypes = pureList;
  }
});

//bisness logic
function retrieveFocus(inputCode: string): void {
  whereFocusIs.value = inputCode;
}

watchEffect(() => {
  const secondInputSetName = whereFocusIs.value === "AS" ? "DS" : "AS";
  const { exchengCourse, exchangeOutput } = exchangeCalculator(
    exchangCouples.value,
    inputSets.value,
    whereFocusIs.value,
    secondInputSetName
  );

  inputSets.value[secondInputSetName].currencyAmount = exchangeOutput;
  exchangeRate.value = exchengCourse;
});

function resetCurrencyAmount(): void {
  for (let inputSet of Object.values(inputSets.value)) {
    inputSet.currencyAmount = "";
  }
}
</script>
<template>
  <div class="exchange-wrapper">
    <article>It is!</article>

    <Main_PickUpGroup
      v-for="(inputSet, keyName, ind) of inputSets"
      :key="'pi' + ind"
      :options="inputSet.options"
      :unitTypes="inputSet.unitTypes"
      v-model:currencyAmount="inputSet.currencyAmount"
      v-model:unitType="inputSet.unitType"
      @whereFocusIs="retrieveFocus"
      class="exchange__pick-up-group"
    />

    <div class="exchange__rate-text">exchange rate is {{ exchangeRate }}</div>

    <button @click="resetCurrencyAmount" class="exchange__control">RESET</button>
  </div>
</template>

<style scoped lang="scss">
.exchange-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: $commonGap 0;

  .exchange__pick-up-group {
    width: 100%;
    margin-top: $commonGap;
  }

  .exchange__rate-text {
    margin-top: $commonGap;
    color: $green;
  }

  .exchange__control {
    box-sizing: border-box;
    margin-top: $commonGap;
    display: flex;
    place-items: center;
    padding: rem(2) rem(20);
    opacity: 0.6;
    cursor: pointer;
  }
}
</style>
