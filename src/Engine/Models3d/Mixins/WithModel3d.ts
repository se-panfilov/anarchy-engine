import type { Group, Mesh, Object3D } from 'three';

import { scalableMixin, withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3d, TWithModel3d } from '@/Engine/Models3d/Models';

export function withModel3d(model3d: TModel3d): TWithModel3d {
  const model3dRaw: Group | Mesh | Object3D = model3d.getRawModel3d();

  return {
    model3d: {
      model3d,
      ...withMoveBy3dMixin(model3dRaw),
      ...withRotationByXyzMixin(model3dRaw),
      ...scalableMixin(model3dRaw)
    }
  };
}
