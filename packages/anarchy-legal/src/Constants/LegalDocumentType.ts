import type { TLegalDocumentType } from '@hellpig/anarchy-legal/Models';

export const LegalDocumentType: Readonly<Record<TLegalDocumentType, TLegalDocumentType>> = {
  DISCLAIMER: 'DISCLAIMER',
  EULA: 'EULA',
  EU_DECLARATION_OF_CONFORMITY: 'EU_DECLARATION_OF_CONFORMITY',
  INSTRUCTIONS: 'INSTRUCTIONS',
  PRIVACY: 'PRIVACY',
  SECURITY: 'SECURITY',
  SUPPORT: 'SUPPORT',
  TECHNICAL_DOCUMENTATION: 'TECHNICAL_DOCUMENTATION',
  VULN_HANDLING: 'VULN_HANDLING'
};
