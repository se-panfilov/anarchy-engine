import type { TLegalDocumentType } from './TLegalDocumentType.ts';
import type { TTemplateMessages } from './TTemplateMessages.ts';

export type TAnarchyLegalConfigEntry = Readonly<{
  type: 'GENERIC' | TLegalDocumentType;
  template?: string; // base name without extension, e.g. "DISCLAIMER_COMMERCIAL_TEMPLATE"
  messages?: TTemplateMessages;
}>;
