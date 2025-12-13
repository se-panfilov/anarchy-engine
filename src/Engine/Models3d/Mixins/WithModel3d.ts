import { scalableMixin, withMoveBy3dMixin, withRotationByXyzMixin } from '@/Engine/Mixins';
import type { TModel3d, TWithModel3d, TRawModel } from '@/Engine/Models3d/Models';

export function withModel3d(model3d: TModel3d): TWithModel3d {
  const model3dRaw: TRawModel = model3d.getRawModel3d();

  return {
    model3d: {
      model3d,
      ...withMoveBy3dMixin(model3dRaw),
      ...withRotationByXyzMixin(model3dRaw),
      ...scalableMixin(model3dRaw)
    }
  };
}
