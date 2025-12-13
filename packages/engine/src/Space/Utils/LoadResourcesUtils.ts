import type { TEnvMapTexture } from '@/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Space/Models';

export async function loadResourcesFromConfig(resources: TSpaceConfigResources, { animationsService, audioService, models3dService, envMapService, textureService }: TSpaceServices): Promise<unknown> {
  const { animations, audio, models3d, envMaps, textures } = resources;

  // EnvMaps could be loaded async, no need to wait
  const envMapTexturePromise: Promise<ReadonlyArray<TEnvMapTexture>> = envMapService.loadFromConfigAsync(envMaps);

  // Textures should be loaded before materials and models
  await textureService.loadFromConfigAsync(textures);

  await animationsService.loadFromConfigAsync(animations);

  return await Promise.all([
    // A "Models3d" has two parts: "entities" and "resources". Here we only load model resources. And create "entities" them lately (in the other place).
    models3dService.loadFromConfigAsync(models3d),
    audioService.loadFromConfigAsync(audio),
    envMapTexturePromise
  ]);
}
