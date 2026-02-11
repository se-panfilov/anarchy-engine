import type { TLegalDocumentType } from '@hellpig/anarchy-legal/Models';

export type TTemplateGeneratorOptions = Readonly<{
  templateExtension: string;
  defaultTemplateBaseName: (docType: TLegalDocumentType) => string;
}>;
