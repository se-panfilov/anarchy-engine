import type { LegalDocumentType } from '@Anarchy/Legal/Constants';

import type { TTemplateMessages } from './TTemplateMessages.ts';

export type TAnarchyLegalConfigEntry = Readonly<{
  type: 'GENERIC' | LegalDocumentType;
  template?: string; // base name without extension, e.g. "DISCLAIMER_COMMERCIAL_TEMPLATE"
  messages?: TTemplateMessages;
}>;
