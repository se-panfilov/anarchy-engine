import type { TEnvMapTexture } from '@/Engine/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMapTextures, materials, textures } = resources;

  //no need to wait for a loading here
  const envMapTexturePromise: Promise<ReadonlyArray<TEnvMapTexture>> = envMapService.loadFromConfigAsync(envMapTextures);

  // TODO 9.0.0. RESOURCES: Particles also should load textures here, before the creation

  // textures should be loaded before materials
  await textureService.createFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  materialService.createFromConfig(materials);

  await Promise.all([models3dService.createFromConfigAsync(models3d), envMapTexturePromise]);
}
