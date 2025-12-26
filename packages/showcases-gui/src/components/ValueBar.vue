<script setup lang="ts">
defineProps<{
  title: string;
  current: number;
  max: number;
  color?: 'blue' | 'red';
}>();
</script>

<template>
  <div class="value-bar__container">
    <div class="value-bar__bar" :class="`-` + (color || 'blue')">
      <div class="value-bar__header">
        <div class="value-bar__icon">
          <slot />
        </div>
        <span class="value-bar__label">{{ title }}</span>
        <span class="value-bar__value">
          <span class="value-bar__current">{{ current }}</span> / <span class="value-bar__max">{{ max }}</span>
        </span>
      </div>
      <div class="value-bar__bar-container">
        <div class="value-bar__bar-bg" />
        <div class="value-bar__bar-grid" />
        <div class="value-bar__bar-fill" :style="`width: ${current}%`">
          <div class="value-bar__bar-shine" />
        </div>
        <div class="value-bar__bar-text">{{ current }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$blue-500: #3b82f6;
$blue-400: #60a5fa;
$cyan-400: #22d3ee;
$blue-950: #172554;

$red-500: #ef4444;
$red-400: #f87171;
$orange-400: #fb923c;
$red-950: #450a0a;

.value-bar {
  &__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__bar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__label {
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);
  }

  &__value {
    margin-left: auto;
    font-variant-numeric: tabular-nums;
    font-size: 0.875rem;
  }

  // Bar colors
  &__bar {
    &.-blue {
      .value-bar__icon {
        color: $blue-400;
      }

      .value-bar__value {
        color: $blue-400;
      }

      .value-bar__bar-bg {
        background-color: rgba($blue-950, 0.5);
      }

      .value-bar__bar-fill {
        background: linear-gradient(to right, $blue-500, $blue-400, $cyan-400);
        box-shadow: 0 0 20px rgba($blue-500, 0.5);
      }
    }

    &.-red {
      .value-bar__icon {
        color: $red-400;
      }

      .value-bar__value {
        color: $red-400;
      }

      .value-bar__bar-bg {
        background-color: rgba($red-950, 0.5);
      }

      .value-bar__bar-fill {
        background: linear-gradient(to right, $red-500, $red-400, $orange-400);
        box-shadow: 0 0 20px rgba($red-500, 0.5);
      }
    }
  }

  // Bar container
  &__bar-container {
    position: relative;
    height: 2rem;
    border-radius: 9999px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  &__bar-bg {
    position: absolute;
    inset: 0;
  }

  &__bar-grid {
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: repeating-linear-gradient(90deg, transparent, transparent 10px, white 10px, white 11px);
  }

  &__bar-fill {
    position: absolute;
    inset: 0;
    right: auto;
    transition: width 0.5s ease-out;
  }

  &__bar-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
  }

  &__bar-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 0.875rem;
  }
}
</style>
