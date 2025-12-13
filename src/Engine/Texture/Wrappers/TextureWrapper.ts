import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { TTexture, TTextureParams, TTextureWrapper } from '@/Engine/Texture/Models';

export function TextureWrapper(params: TTextureParams): TTextureWrapper {
  const { texture } = params;
  const entity: TTexture = texture;

  const result = {
    ...AbstractWrapper(entity, WrapperType.EnvMap),
    entity,
    getName: (): string => params.name
  };

  return result;
}
