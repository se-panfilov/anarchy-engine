import type { ITexture } from './ITexture';
import type { ITexturePackKeys } from './ITexturePackKeys';

export type IUploadTexturePromises = Record<ITexturePackKeys, Promise<ITexture>>;
