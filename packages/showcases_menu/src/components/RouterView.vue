<script setup lang="ts">
import { menuRouteMap } from '@Menu/constants';
import { useRouterStore } from '@Menu/stores/RouterStore';
import { computed } from 'vue';

const routerStore = useRouterStore();

const currentComponent = computed(() => menuRouteMap[routerStore.currRoute]);
</script>

<template>
  <component :is="currentComponent" />
</template>
