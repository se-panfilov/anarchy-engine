<script setup lang="ts">
import PageTitle from '@Showcases/Menu/components/PageTitle.vue';

defineProps<{ title: string }>();
</script>

<template>
  <div class="view">
    <PageTitle class="view__title" :title="title" />
    <slot name="default" />
  </div>
</template>

<style scoped lang="scss"></style>
