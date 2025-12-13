import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractSimpleRegistry } from '@/Engine/Abstract';
import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3d, TModel3dToModel3dFacadeConnectionRegistry, TModel3dToModel3dFacadeConnectionRegistryExtension } from '@/Engine/Models3d/Models';
import type { TWriteable } from '@/Engine/Utils';

const registry: Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll'> & TWriteable<TModel3dToModel3dFacadeConnectionRegistryExtension> = AbstractSimpleRegistry<string>(
  RegistryType.Models3dToModels3dFacadeToConnection
) as Omit<TWriteable<TAbstractSimpleRegistry<string>>, 'getAll)'> & TWriteable<TModel3dToModel3dFacadeConnectionRegistryExtension>;

// eslint-disable-next-line functional/immutable-data
registry.addModel3d = (model3d: Group | Mesh | Object3D, model3dFacade: TModel3d): void => registry.add(model3d.uuid, model3dFacade.id);
// eslint-disable-next-line functional/immutable-data
registry.findByModel3d = (model3d: Group | Mesh | Object3D): string | undefined => registry.findByKey(model3d.uuid);
// eslint-disable-next-line functional/immutable-data
registry.setByModel3d = (model3d: Group | Mesh | Object3D, model3dFacade: TModel3d): void => registry.add(model3d.uuid, model3dFacade.id);
// eslint-disable-next-line functional/immutable-data
registry.removeByModel3d = (model3d: Group | Mesh | Object3D): void => registry.remove(model3d.uuid);
// eslint-disable-next-line functional/immutable-data
registry.getAll = (): Record<string, string> => Object.fromEntries(registry.registry.entries());

export const Model3dToModel3dFacadeConnectionRegistry = (): TModel3dToModel3dFacadeConnectionRegistry => RegistryFacade(registry);
