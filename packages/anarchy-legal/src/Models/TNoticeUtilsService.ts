import type { TTemplateParsedEntry } from '@hellpig/anarchy-legal/Models';

export type TNoticeUtilsService = Readonly<{
  collectAllHeadingIds: (md: string) => ReadonlySet<string>;
  loadUpstreamNotice: (dir: string, maxBytes: number) => Promise<string | undefined>;
  parseThirdPartyMarkdown: (md: string) => ReadonlyArray<TTemplateParsedEntry>;
}>;
