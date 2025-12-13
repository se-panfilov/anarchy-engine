<script setup lang="ts">
defineEmits(['reset', 'save']);
</script>

<template>
  <div class="menu-view-actions_container">
    <button type="button" class="menu-view-actions_container__action -cancel" @click="$emit('reset')">Reset</button>
    <button type="button" class="menu-view-actions_container__action -save" @click="$emit('save')">Save</button>
  </div>
</template>
