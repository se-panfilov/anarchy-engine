import type { TEnvMapTexture } from '@/Engine/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials, textures } = resources;

  // EnvMaps could be loaded async, no need to wait
  const envMapTexturePromise: Promise<ReadonlyArray<TEnvMapTexture>> = envMapService.loadFromConfigAsync(envMaps);

  // Textures should be loaded before materials and models
  await textureService.loadFromConfigAsync(textures);

  // Technically, materials are more "entities" rather than "resources":
  //   They are not loaded from anywhere (should be created instead) and depend on textures.
  //   However, materials (and textures) should be fully ready before models.
  materialService.createFromConfig(materials);

  await Promise.all([
    // Models3d contains of "entities" and "resources". Here only load model resources. And create them lately.
    models3dService.loadFromConfigAsync(models3dService.filterLoadableModel3dConfigs(models3d)),
    envMapTexturePromise
  ]);
}
