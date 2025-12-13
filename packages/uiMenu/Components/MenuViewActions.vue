<script setup lang="ts">
defineEmits(['cancel', 'save']);
</script>

<template>
  <div class="menu-view-actions_container">
    <button type="button" class="menu-view-actions_container__action -cancel" @click="$emit('cancel')">Cancel</button>
    <button type="button" class="menu-view-actions_container__action -save" @click="$emit('save')">Save</button>
  </div>
</template>
