<script setup lang="ts">
import { computed } from 'vue';
import { menuRouteMap } from '@/Levels/Showcase28Menu/MainMenu/Constants';
import { useMenuRouterStore } from '@/Levels/Showcase28Menu/MainMenu/Stores/MenuRouterStore';

const router = useMenuRouterStore();

const currentComponent = computed(() => menuRouteMap[router.currRoute]);
</script>

<template>
  <component :is="currentComponent" />
</template>
