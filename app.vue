<template>
  <div class='exchange-wrapper'>
    <header @click="useRouter().push('/about')" 
            title="about this Demo"
    > 
      Exchange
    </header>

    <NuxtPage/>

  </div>
</template>

<script setup lang="ts">
  useRouter().push('/about')

</script>

<style scoped lang="scss">
.exchange-wrapper {
  position: relative;
  width: 80vw;
  max-width: rem(400); 
  margin: 0 auto;

  header {
    border-bottom: $grey 1px solid;
    box-sizing: border-box;
    padding: $commonGap 0;

    color: $green;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
  }

}
</style>
