import { configToParams as materialConfigToParams } from '@/Engine/Material/Adapters';
import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials, textures } = resources;

  // TODO CWP !!!
  // TODO 9.0.0. RESOURCES: split materials and textures loading.
  // TODO 9.0.0. RESOURCES: Textures should be loaded first and added to registries.
  // TODO 9.0.0. RESOURCES: Implement prevention of loading texture twice.
  // TODO 9.0.0. RESOURCES: Then materials should be created with related textures.
  // materials.forEach((material) => {
  //   // TODO 8.0.0. MODELS: All materials should be load and waited before the models are created.
  //   let materialParams: TMaterialPackParams<TMaterialTexturePack> | undefined;
  //   const { type: materialType, ...restMaterialParams } = materialConfigToParams(material);
  //   materialParams = { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>;
  //
  //   materialTextureService.createAsync(materialParams);
  // });

  // textures should be loaded before materials
  await textureService.createFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  await materialService.createFromConfigAsync(materials);
  // TODO 9.0.0. RESOURCES: envMapService's should be loadFromConfigAsync
  await Promise.all([models3dService.createFromConfigAsync(models3d), envMapService.loadFromConfigAsync(envMaps)]);
}
