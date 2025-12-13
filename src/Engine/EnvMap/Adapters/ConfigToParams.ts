import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture } from '@/Engine/EnvMap/Models';
import { isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TEnvMapConfig, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapParams | never {
  const texture: TEnvMapTexture | undefined = resourcesRegistry.findByKey(config.texture);
  if (isNotDefined(texture)) throw new Error(`EnvMap creation from config: Texture "${config.texture}" not found`);

  return {
    ...config,
    texture
  };
}
