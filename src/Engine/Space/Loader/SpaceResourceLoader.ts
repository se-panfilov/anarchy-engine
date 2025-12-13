import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials, textures } = resources;
  // textures should be loaded before materials
  await textureService.createFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  materialService.createFromConfig(materials);
  // TODO 9.0.0. RESOURCES: envMapService's should be loadFromConfigAsync
  await Promise.all([models3dService.createFromConfigAsync(models3d), envMapService.loadFromConfigAsync(envMaps)]);
}
