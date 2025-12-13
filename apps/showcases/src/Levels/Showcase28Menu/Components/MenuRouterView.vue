<script setup lang="ts">
import { computed } from 'vue';
import { menuRouteMap } from '@/Levels/Showcase28Menu/Constants';
import { useMenuRouterStore } from '@/Levels/Showcase28Menu/Stores/MenuRouterStore';

const router = useMenuRouterStore();

const currentComponent = computed(() => menuRouteMap[router.route]);
</script>

<template>
  <component :is="currentComponent" />
</template>
