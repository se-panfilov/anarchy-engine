import type { TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials, textures } = resources;

  //no need to wait for a loading
  const envMapPromise: Promise<ReadonlyArray<TEnvMapWrapperAsync>> = envMapService.createFromConfigAsync(envMaps);

  // textures should be loaded before materials
  await textureService.createFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  materialService.createFromConfig(materials);

  await Promise.all([models3dService.createFromConfigAsync(models3d), envMapPromise]);
}
