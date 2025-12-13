<script setup lang="ts">
defineEmits(['reset', 'save']);
</script>

<template>
  <div class="view-actions">
    <button type="button" class="view-actions__btn -reset" @click="$emit('reset')">Reset</button>
    <button type="button" class="view-actions__btn -save" @click="$emit('save')">Save</button>
  </div>
</template>
