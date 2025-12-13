<script setup lang="ts">
import { menuRouteMap } from '@Menu/constants';
import { useRouterStore } from '@Menu/stores/MenuRouterStore';
import { computed } from 'vue';

const router = useRouterStore();

const currentComponent = computed(() => menuRouteMap[router.currRoute]);
</script>

<template>
  <component :is="currentComponent" />
</template>
