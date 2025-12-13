import type { ITexture } from './ITexture';
import type { ITexturePackKeys } from './ITexturePackKeys';

export type ITextureUploadPromises = Record<ITexturePackKeys, Promise<ITexture>>;
