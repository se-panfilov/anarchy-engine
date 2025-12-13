import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { ITexture, ITextureWrapper } from '@/Engine/Domains/Texture/Models';

export function TextureWrapper(texture: ITexture): ITextureWrapper {
  const entity: ITexture = texture;

  return {
    ...AbstractWrapper(entity, WrapperType.Texture),
    entity
  };
}
