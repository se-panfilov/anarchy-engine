import { AbstractWrapper } from '@Engine/Domains/Abstract';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { isDefined } from '@/Engine/Utils';

import type { IOrbitControlsParams, IOrbitControlsWrapper } from '../Models';

export function OrbitControlsWrapper(params: IOrbitControlsParams): IOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  if (isDefined(params.target)) {
    entity.target.set(params.target.x, params.target.y, params.target.z);
    entity.update();
  }
  return { ...AbstractWrapper(entity, params), entity };
}
