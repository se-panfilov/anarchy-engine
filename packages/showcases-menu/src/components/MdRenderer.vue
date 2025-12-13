<script setup lang="ts">
import { isNotDefined } from '@Anarchy/Shared/Utils';
import { sanitizeMarkDown } from '@Showcases/Shared';
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
  const cleanContent: string = await sanitizeMarkDown(content);
  return marked.parse(cleanContent);
}

watch(
  () => props.content,
  async (newContent): Promise<void> => {
    state.parsedContent = await parseContent(newContent);
  },
  { immediate: true }
);
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="md-renderer" v-html="state.parsedContent" />
</template>
