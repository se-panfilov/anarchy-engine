<script setup lang="ts">
defineEmits(['reset']);
</script>

<template>
  <div class="view-actions">
    <button type="button" class="view-actions__btn -reset" @click="$emit('reset')">Reset</button>
    <button type="submit" class="view-actions__btn -save">Save</button>
  </div>
</template>
