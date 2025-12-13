<script setup lang="ts">
defineEmits(['submit']);

defineProps<{
  name: string;
}>();
</script>

<template>
  <form :name="name" class="view-form" @submit.prevent="$emit('submit')">
    <slot name="default" />
  </form>
</template>

<style scoped lang="scss">
.view-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
