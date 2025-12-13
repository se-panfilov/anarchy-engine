import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3d, TModel3dRawToModel3dConnectionRegistry, TModel3dRawToModel3dConnectionRegistryExtension } from '@/Engine/Models3d/Models';
import type { TWriteable } from '@/Engine/Utils';
import type { TRawModel } from '@/Engine/Models3d';

const registry: Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll'> & TWriteable<TModel3dRawToModel3dConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
  RegistryType.Models3dRawToModels3dToConnection
) as Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll)'> & TWriteable<TModel3dRawToModel3dConnectionRegistryExtension>;

// eslint-disable-next-line functional/immutable-data
registry.addModel3d = (model3dRaw: TRawModel, model3d: TModel3d): void => registry.add(model3dRaw.uuid, model3d.id);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3d = (model3dRaw: TRawModel): string | undefined => registry.findByKey(model3dRaw.uuid);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3d = (model3dRaw: TRawModel, model3d: TModel3d): void => registry.add(model3dRaw.uuid, model3d.id);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3d = (model3dRaw: TRawModel): void => registry.remove(model3dRaw.uuid);
// eslint-disable-next-line functional/immutable-data
registry.getAll = (): Record<string, string> => Object.fromEntries(registry.registry.entries());

export const Model3dRawToModel3dConnectionRegistry = (): TModel3dRawToModel3dConnectionRegistry => RegistryFacade(registry);
