import type { TLegalDocumentType } from '@Anarchy/Legal/Models';

export const LegalDocumentType: Readonly<Record<TLegalDocumentType, TLegalDocumentType>> = {
  DISCLAIMER: 'DISCLAIMER',
  EULA: 'EULA',
  PRIVACY: 'PRIVACY',
  SECURITY: 'SECURITY'
};
