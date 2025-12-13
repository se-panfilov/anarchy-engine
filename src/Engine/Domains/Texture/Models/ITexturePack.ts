import type { ITexturePackKeys } from './ITexturePackKeys';
import type { ITexturePackParams } from './ITexturePackParams';

export type ITexturePack = { [key in ITexturePackKeys]?: ITexturePackParams };
