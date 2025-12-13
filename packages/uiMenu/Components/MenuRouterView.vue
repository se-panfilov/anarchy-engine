<script setup lang="ts">
import { computed } from 'vue';

import { menuRouteMap } from 'packages/MainMenu/Constants';
import { useMenuRouterStore } from 'packages/MainMenu/Stores/MenuRouterStore';

const router = useMenuRouterStore();

const currentComponent = computed(() => menuRouteMap[router.currRoute]);
</script>

<template>
  <component :is="currentComponent" />
</template>
