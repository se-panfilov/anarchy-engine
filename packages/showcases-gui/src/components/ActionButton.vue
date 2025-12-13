<script setup lang="ts">
import { isDefined } from '@Anarchy/Shared/Utils';

defineProps<{
  title: string;
  dataKey?: string | undefined;
}>();
</script>

<template>
  <button type="button" :title="title" class="action-btn" :aria-label="title">
    <span class="action-btn__content">
      <slot />
    </span>
    <span v-if="isDefined(dataKey)" class="action-btn__keybind">{{ dataKey }}</span>
  </button>
</template>

<style scoped lang="scss">
$amber-500: #f59e0b;
$amber-400: #fbbf24;
$amber-300: #fcd34d;
$orange-600: #ea580c;

$slate-300: #cbd5e1;
$slate-400: #94a3b8;
$slate-600: #475569;
$slate-700: #334155;
$slate-800: #1e293b;
$slate-900: #0f172a;

.action-btn {
  position: relative;
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba($slate-600, 0.5);
  background-color: rgba($slate-800, 0.8);
  color: $slate-300;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05) translateY(-2px);
    border-color: $slate-400;
    background-color: rgba($slate-700, 0.8);
    color: white;
  }

  &:active {
    transform: scale(0.95);
    background: linear-gradient(to bottom right, rgba($amber-500, 0.2), rgba($orange-600, 0.2));
    border-color: rgba($amber-500, 0.5);
    color: $amber-400;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__keybind {
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba($slate-900, 0.8);
    padding: 0.125rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    color: $slate-400;
    border: 1px solid $slate-700;
  }
}
</style>
