import type { TLegalDocumentType } from '@Anarchy/Legal/Models/TLegalDocumentType.ts';

export type TTemplateGeneratorOptions = Readonly<{
  templateExtension: string;
  defaultTemplateBaseName: (docType: TLegalDocumentType) => string;
}>;
