import type { TAbstractSimpleRegistry } from '@Anarchy/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TModel3d, TModel3dRawToModel3dConnectionRegistry, TModel3dRawToModel3dConnectionRegistryExtension } from '@Anarchy/Engine/Models3d/Models';
import type { TRawModel3d } from '@Anarchy/Engine/Models3d/Models/TRawModel3d';
import type { TWriteable } from '@Anarchy/Shared/Utils';

export const Model3dRawToModel3dConnectionRegistry = (): TModel3dRawToModel3dConnectionRegistry => {
  const registry: TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dRawToModel3dConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
    RegistryType.Models3dRawToModels3dToConnection
  ) as TWriteable<TAbstractSimpleRegistry<string>> & TWriteable<TModel3dRawToModel3dConnectionRegistryExtension>;

  // eslint-disable-next-line functional/immutable-data
  registry.addModel3d = (model3dRaw: TRawModel3d, model3d: TModel3d): void => registry.add(model3dRaw.uuid, model3d.id);
  // eslint-disable-next-line functional/immutable-data
  registry.findByModel3d = (model3dRaw: TRawModel3d): string | undefined => registry.findByKey(model3dRaw.uuid);
  // eslint-disable-next-line functional/immutable-data
  registry.setByModel3d = (model3dRaw: TRawModel3d, model3d: TModel3d): void => registry.add(model3dRaw.uuid, model3d.id);
  // eslint-disable-next-line functional/immutable-data
  registry.removeByModel3d = (model3dRaw: TRawModel3d, shouldIgnoreRemoved: boolean): void => {
    if (shouldIgnoreRemoved) {
      if (registry.findByModel3d(model3dRaw)) return registry.remove(model3dRaw.uuid);
      return undefined;
    }
    return registry.remove(model3dRaw.uuid);
  };

  return registry;
};
