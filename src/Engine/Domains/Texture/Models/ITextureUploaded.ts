import type { ITexture } from './ITexture';
import type { ITexturePackKeys } from './ITexturePackKeys';

export type ITextureUploaded = { [key in ITexturePackKeys]?: ITexture };
