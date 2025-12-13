import type { TTemplateMessages } from './TTemplateMessages.ts';

export type TAnarchyLegalConfigEntry = Readonly<{
  template?: string; // base name without extension, e.g. "DISCLAIMER_COMMERCIAL_TEMPLATE"
  relativeOutput?: string;
  messages?: TTemplateMessages;
}>;
