import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture } from '@Engine/EnvMap/Models';

export function configToParams(config: TEnvMapConfig, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapParams | never {
  const texture: TEnvMapTexture | undefined = resourcesRegistry.getByKey(config.texture);

  return {
    ...config,
    texture
  };
}
