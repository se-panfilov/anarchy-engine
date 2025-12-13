<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
// TODO DESKTOP: LEGAL: marked should be lazy loaded
import { marked } from 'marked';

defineProps<{
  content: string | undefined;
}>();

function parseContent(content: string | undefined): string {
  if (isNotDefined(content)) return '';
  // const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  return marked.parse(content, { async: false });
}
</script>

<template>
  <div class="md-renderer" v-html="parseContent(content)" />
</template>
