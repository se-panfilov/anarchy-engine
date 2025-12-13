<script setup lang="ts">
defineEmits(['reset']);
</script>

<template>
  <div class="view-actions">
    <button type="button" class="view-actions__btn -reset" @click="$emit('reset')">Reset</button>
    <button type="submit" class="view-actions__btn -save">Save</button>
  </div>
</template>

<style scoped lang="scss">
.view-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;

  &__btn {
    outline-style: none;
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    border: 1px solid black;
    border-radius: 6px;
    min-height: 42px;
    width: 100%;
    padding: 0 16px;
    cursor: pointer;
  }
}
</style>
