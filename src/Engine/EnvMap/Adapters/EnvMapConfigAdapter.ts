import type { TEnvMap, TEnvMapConfigPack, TEnvMapConfigToParamsDependencies, TEnvMapParamsPack } from '@/Engine/EnvMap/Models';

export async function configToParamsAsync(config: TEnvMapConfigPack, { envMapLoader }: TEnvMapConfigToParamsDependencies): Promise<TEnvMapParamsPack> | never {
  const texture: TEnvMap = await envMapLoader.loadAsync(config);

  return {
    ...config,
    texture
  };
}
