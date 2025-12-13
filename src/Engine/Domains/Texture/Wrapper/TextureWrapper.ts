import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import { textureService } from '@/Engine/Domains/Texture';
import type { ITexture, ITextureParams, ITextureWrapper } from '@/Engine/Domains/Texture/Models';

export function TextureWrapper(params: ITextureParams): ITextureWrapper {
  const entity: ITexture = textureService.load(params);

  return {
    ...AbstractWrapper(entity, WrapperType.Texture, params),
    entity
  };
}
