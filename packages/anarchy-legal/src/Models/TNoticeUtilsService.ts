import type { TTemplateParsedEntry } from '@Anarchy/Legal/Models';

export type TNoticeUtilsService = Readonly<{
  collectAllHeadingIds: (md: string) => ReadonlySet<string>;
  parseThirdPartyMarkdown: (md: string) => ReadonlyArray<TTemplateParsedEntry>;
  loadUpstreamNotice: (dir: string, maxBytes: number) => Promise<string | undefined>;
}>;
