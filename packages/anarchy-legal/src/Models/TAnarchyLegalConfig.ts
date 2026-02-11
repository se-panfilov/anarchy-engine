import type { TLegalDocumentType } from '@hellpig/anarchy-legal/Models';

import type { TAnarchyLegalConfigEntry } from './TAnarchyLegalConfigEntry';

export type TAnarchyLegalConfig = Partial<Record<'GENERIC' | TLegalDocumentType, TAnarchyLegalConfigEntry>>;
