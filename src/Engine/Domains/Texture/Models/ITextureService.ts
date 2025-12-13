import type { ITexturePack } from './ITexturePack';
import type { ITextureUploadPromises } from './ITextureUploadPromises';

export type ITextureService = {
  load: (pack: ITexturePack) => ITextureUploadPromises;
};
