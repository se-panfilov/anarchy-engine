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
  const DOMPurify = (await import('dompurify')).default;
  const cleanContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
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
  <!--  // eslint-disable-next-line vue/no-v-htm-->
  <div class="md-renderer" v-html="state.parsedContent" />
</template>
