<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  some: 1
});

setInterval(() => {
  state.some += 1;
}, 1000);
</script>

<template>
  <h1>You did it!</h1>
  <p>Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the documentation</p>
  <div>{{ state.some }}</div>
</template>

<style scoped></style>
