import type { TEnvMapTexture } from '@/Engine/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMapTextures, materials, textures } = resources;

  //no need to wait for a loading here
  const envMapTexturePromise: Promise<ReadonlyArray<TEnvMapTexture>> = envMapService.loadFromConfigAsync(envMapTextures);

  // textures should be loaded before materials
  await textureService.loadFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  materialService.createFromConfig(materials);

  // TODO CWP!!!
  // TODO 9.0.0. RESOURCES: Fix models3d loading (here resources loading only)
  //  Use materials which are already loaded when it's needed)
  await Promise.all([models3dService.loadFromConfigAsync(models3d), envMapTexturePromise]);
}
