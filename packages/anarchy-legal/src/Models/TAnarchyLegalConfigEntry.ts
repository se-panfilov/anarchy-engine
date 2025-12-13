import type { TTemplateMessages } from './TTemplateMessages.ts';

export type TAnarchyLegalConfigEntry = Readonly<{
  template?: string; // base name without extension, e.g. "DISCLAIMER_COMMERCIAL_TEMPLATE"
  relativeOutput?: string; // If you need to put a file in a sub-folder of the output directory
  messages?: TTemplateMessages;
  outputName?: string; // If you need to override the output file name
}>;
