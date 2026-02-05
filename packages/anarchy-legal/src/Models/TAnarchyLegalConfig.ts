import type { TLegalDocumentType } from '@hellpig/anarchy-legal/Models/TLegalDocumentType.ts';

import type { TAnarchyLegalConfigEntry } from './TAnarchyLegalConfigEntry';

export type TAnarchyLegalConfig = Partial<Record<'GENERIC' | TLegalDocumentType, TAnarchyLegalConfigEntry>>;
