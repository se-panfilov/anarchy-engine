import type { ITexture } from './ITexture';
import type { ITexturePackKeys } from './ITexturePackKeys';
import type { ITextureUploaded } from './ITextureUploaded';

export type ITextureUploadPromises = { [key in ITexturePackKeys]?: Promise<ITexture> } & Readonly<{
  all: () => Promise<ITextureUploaded>;
}>;
