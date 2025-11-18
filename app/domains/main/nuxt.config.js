
export default defineNuxtConfig({
  components: [
    {path: './components', prefix: 'main_'}
  ],
  autoImports: {
    dirs: ['types']
  }
})