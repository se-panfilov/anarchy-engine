<script setup lang="ts"></script>

<template>
  <div class="graphics main-menu-view">
    <div class="main-menu-view__title">Graphics settings</div>
    <div class="main-menu-view__group">
      <div class="main-menu-view__group-title">Group 1</div>
      <label class="main-menu-view__setting -fullscreen">
        <span class="main-menu-view__setting-description">Full screen</span>
        <input type="checkbox" class="main-menu-view__setting-value -checkbox" />
      </label>
      <label class="main-menu-view__setting -resolution">
        <span class="main-menu-view__setting-description">Resolution</span>
        <select class="main-menu-view__setting-value -select">
          <option value="1920x1080">1920x1080</option>
          <option value="1280x720">1280x720</option>
          <option value="800x600">800x600</option>
          <option value="640x480">640x480</option>
        </select>
      </label>
    </div>
  </div>
</template>

<style scoped></style>
