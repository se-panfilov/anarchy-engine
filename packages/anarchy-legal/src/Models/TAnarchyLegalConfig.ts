import type { TLegalDocumentType } from '@Anarchy/Legal/Models/TLegalDocumentType.ts';

import type { TAnarchyLegalConfigEntry } from './TAnarchyLegalConfigEntry';

export type TAnarchyLegalConfig = Partial<Record<'GENERIC' | TLegalDocumentType, TAnarchyLegalConfigEntry>>;
