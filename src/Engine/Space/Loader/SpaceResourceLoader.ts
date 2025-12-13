import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials } = resources;

  // TODO CWP !!!
  // TODO 8.0.0. MODELS: All materials should be load and waited before the models are created.
  //let materialParams: TMaterialPackParams<TMaterialTexturePack> | undefined;
  //   if (isDefined(material)) {
  //     const { type: materialType, ...restMaterialParams } = materialConfigToParams({ ...material.params, type: material.type });
  //     materialParams = { type: materialType, params: { ...restMaterialParams }, textures: material.textures } satisfies TMaterialPackParams<TMaterialTexturePack>;
  //   }
  //
  //   if (isPrimitive(config) && isNotDefined(materialParams)) throw new Error(`Model3dConfigAdapter: Material must be defined for primitive model, but it is not.`);

  await Promise.all([...models3dService.createFromConfigAsync(models3d), ...envMapService.loadFromConfigAsync(envMaps)]);
}
