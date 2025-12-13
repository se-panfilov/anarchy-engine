import type { TEnvMapWrapper } from '@/Engine/EnvMap/Models';
import type { TSpaceConfigResources, TSpaceServices } from '@/Engine/Space/Models';

export async function loadResources(resources: TSpaceConfigResources, { models3dService, envMapService, materialService, textureService }: TSpaceServices): Promise<void> {
  const { models3d, envMaps, materials, textures } = resources;

  //no need to wait for a loading here
  // TODO CWP!!!
  // TODO 9.0.0. RESOURCES: I'm not happy with this: textures should be loaded here, but the entities should be created in the entities creator
  const envMapPromise: Promise<ReadonlyArray<TEnvMapWrapper>> = envMapService.createFromConfigAsync(envMaps);
  // TODO 9.0.0. RESOURCES: Particles also should load textures here, before the creation

  // textures should be loaded before materials
  await textureService.createFromConfigAsync(textures);
  //materials and textures should be fully loaded before models
  materialService.createFromConfig(materials);

  await Promise.all([models3dService.createFromConfigAsync(models3d), envMapPromise]);
}
