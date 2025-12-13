import type { TTexture, TTextureConfig, TTextureConfigToParamsDependencies, TTextureParams } from '@/Engine/Texture/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TTextureConfig, { resourcesRegistry }: TTextureConfigToParamsDependencies): TTextureParams | never {
  const texture: TTexture | undefined = resourcesRegistry.findByKey(config.name);
  if (isNotDefined(texture)) throw new Error(`Texture creation from config: Texture with name "${config.name}" not found`);

  return {
    ...config,
    texture
  };
}
