<script setup>
import Main from './components/Main.vue'
</script>

<template>
  <h1>MLB Trip Finder</h1>
  <header>
    
    <div class="wrapper">
      <Main />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  padding: 50px;
}
h1 {
  display: flex;
  align-content: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
