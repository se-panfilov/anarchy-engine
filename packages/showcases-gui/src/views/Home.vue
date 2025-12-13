<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="panel -bottom">
      <h1>Welcome to Showcases GUI!</h1>
      <p>This is a graphical user interface for managing and showcasing various projects and applications.</p>
      <p>Use the navigation menu to explore different features and functionalities.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: flex;
  min-width: 100%;
  min-height: 100%;
  align-items: center;
  flex-direction: column;
  gap: 14px;

  .panel {
    width: 100%;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #ccc;

    h1 {
      margin-bottom: 16px;
      font-size: 2em;
      color: #333333;
    }

    p {
      margin-bottom: 12px;
      font-size: 1.1em;
      color: #555555;
      line-height: 1.6;
    }

    &.-bottom {
      margin-top: auto;
    }
  }
}
</style>
