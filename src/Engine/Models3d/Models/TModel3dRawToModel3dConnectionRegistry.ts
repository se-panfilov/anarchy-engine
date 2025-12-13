import type { Group, Mesh, Object3D } from 'three';

import type { TAbstractSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TModel3d } from './TModel3d';

export type TModel3dRawToModel3dConnectionRegistryExtension = Readonly<{
  addModel3d: (model3dId: Group | Mesh | Object3D, model3d: TModel3d) => void;
  findByModel3d: (model3dId: Group | Mesh | Object3D) => string | undefined;
  setByModel3d: (model3dId: Group | Mesh | Object3D, model3d: TModel3d) => void;
  removeByModel3d: (model3dId: Group | Mesh | Object3D) => void;
  getAll: () => Record<string, string>;
}>;

export type TModel3dRawToModel3dConnectionRegistry = Omit<TProtectedRegistry<TAbstractSimpleRegistry<string>>, 'getAll'> & TModel3dRawToModel3dConnectionRegistryExtension;
