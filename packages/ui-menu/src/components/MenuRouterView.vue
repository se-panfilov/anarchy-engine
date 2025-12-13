<script setup lang="ts">
import { menuRouteMap } from '@Menu/constants';
import { useMenuRouterStore } from '@Menu/stores/MenuRouterStore';
import { computed } from 'vue';

const router = useMenuRouterStore();

const currentComponent = computed(() => menuRouteMap[router.currRoute]);
</script>

<template>
  <component :is="currentComponent" />
</template>
