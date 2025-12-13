<script setup lang="ts"></script>

<template>
  <div class="audio main-menu-view">
    <div class="main-menu-view__title">Audio settings</div>
    <div class="main-menu-view__group">
      <div class="main-menu-view__group-title">Group 1</div>
      <label class="main-menu-view__setting -masterVolume">
        <span class="main-menu-view__setting-description">MasterVolume</span>
        <input type="range" min="0" max="100" class="main-menu-view__setting-value -range" />
      </label>
    </div>
  </div>
</template>

<style scoped></style>
