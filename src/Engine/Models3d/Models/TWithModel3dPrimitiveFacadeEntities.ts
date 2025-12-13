import type { Group, Mesh, Object3D } from 'three';

import type { TModel3dLoadOptions } from './TModel3dLoadOptions';
import type { TPrimitiveProps } from './TPrimitiveProps';

export type TWithModel3dPrimitiveFacadeEntities = Readonly<{
  getPrimitive: () => TPrimitiveProps;
  getModel: () => Group | Mesh | Object3D;
  getOptions: () => TModel3dLoadOptions;
  getClonedFrom: () => string | undefined;
}>;
