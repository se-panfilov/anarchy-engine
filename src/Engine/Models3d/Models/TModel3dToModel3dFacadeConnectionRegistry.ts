import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3dFacade } from './TModel3dFacade';

export type TModel3dToModel3dFacadeConnectionRegistryExtension = Readonly<{
  addModel3d: (model3dId: Group | Mesh | Object3D, model3dFacade: TModel3dFacade) => void;
  findByModel3d: (model3dId: Group | Mesh | Object3D) => string | undefined;
  setByModel3d: (model3dId: Group | Mesh | Object3D, model3dFacade: TModel3dFacade) => void;
  removeByModel3d: (model3dId: Group | Mesh | Object3D) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dToModel3dFacadeConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dToModel3dFacadeConnectionRegistryExtension;
