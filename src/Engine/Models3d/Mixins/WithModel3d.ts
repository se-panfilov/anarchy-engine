import type { Group, Mesh, Object3D } from 'three';

import { scalableMixin, withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3d, TWithModel3d } from '@/Engine/Models3d/Models';

export function withModel3d(model3dF: TModel3d): TWithModel3d {
  const model3d: Group | Mesh | Object3D = model3dF.getRawModel3d();

  return {
    model3d: {
      facade: model3dF,
      ...withMoveBy3dMixin(model3d),
      ...withRotationByXyzMixin(model3d),
      ...scalableMixin(model3d)
    }
  };
}
