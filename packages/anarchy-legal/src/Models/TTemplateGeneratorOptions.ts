import type { TLegalDocumentType } from '@hellpig/anarchy-legal/Models/TLegalDocumentType.ts';

export type TTemplateGeneratorOptions = Readonly<{
  templateExtension: string;
  defaultTemplateBaseName: (docType: TLegalDocumentType) => string;
}>;
