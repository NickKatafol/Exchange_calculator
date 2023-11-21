<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import { RouterLink } from 'vue-router'

//SEO
useHead({
  title: 'About the progect'
})

const router = useRouter()
const route = useRoute()

//income data
let { data: aboutText } = await useAsyncData<string>('aboutTextRequest',
  async () => await $fetch('/api/aboutText')
)


</script>


<template>
  <header>
    <h1># ABOUT</h1>
    <div @click="router.push('/')" class="header__cross-btn"></div>
  </header>

  <article v-html="aboutText">
  </article>

  <footer>
    <div @click="$router.push('/')" class="controller_open-space">
      BACK to Main page
    </div>
  </footer>
</template>


<style scoped lang="scss">
header {
  margin-top: $commonGap;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header__cross-btn {
    width: rem(30);
    height: rem(30);
    margin-left: auto;
    cursor: pointer;
    background-image: url("@/domains/about/assets/imgs/adminImgs/close.svg");
    background-size: rem(30) rem(30);
  }
}

article {
  white-space: pre-wrap;
}

footer {
  margin-top: $commonGap;
}
</style>
