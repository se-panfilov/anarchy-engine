import { Models3d } from 'three';

import type { TModels3d, TModels3dParams, TModels3dWrapper } from '@/Engine/Models3d/Models';

// TODO don't think we need a wrapper at all, take a look at the materials domain
export function Models3dWrapper(params: TModels3dParams): TModels3dWrapper {
  const entity: TModels3d = new Models3d(params.color, params.near, params.far);

  // const wrapper: TWrapper<TModels3d> = AbstractWrapper(entity, WrapperType.Models3d, params);

  function destroy(): void {
    // TODO DESTROY: implement destroy
    throw new Error('Models3d destroy not implemented');
  }

  return { ...wrapper, entity, destroy };
}
