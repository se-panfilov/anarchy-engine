import type { ITexturePack } from './ITexturePack';
import type { IUploadTexturePromises } from './IUploadTexturePromises';

export type ITextureService = {
  load: (pack: ITexturePack) => IUploadTexturePromises;
};
