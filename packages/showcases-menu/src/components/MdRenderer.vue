<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { reactive, watch } from 'vue';

const props = defineProps<{
  content: string | undefined;
}>();

const state = reactive({
  parsedContent: undefined as string | undefined
});

async function parseContent(content: string | undefined): Promise<string> {
  if (isNotDefined(content)) return '';
  const { marked } = await import('marked');
  // const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  return marked.parse(content);
}

watch(
  () => props.content,
  async (newContent) => {
    const parsed = await parseContent(newContent);
    state.parsedContent = parsed;
  },
  { immediate: true }
);
</script>

<template>
  <!--  // eslint-disable-next-line vue/no-v-htm-->
  <div class="md-renderer" v-html="state.parsedContent" />
</template>
