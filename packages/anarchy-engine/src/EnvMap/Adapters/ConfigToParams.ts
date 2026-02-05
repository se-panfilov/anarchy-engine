import type { TEnvMapConfig, TEnvMapConfigToParamsDependencies, TEnvMapParams, TEnvMapTexture } from '@hellpig/anarchy-engine/EnvMap/Models';

export function envMapConfigToParams(config: TEnvMapConfig, { resourcesRegistry }: TEnvMapConfigToParamsDependencies): TEnvMapParams | never {
  const texture: TEnvMapTexture | undefined = resourcesRegistry.getByKey(config.texture);

  return {
    ...config,
    texture
  };
}
