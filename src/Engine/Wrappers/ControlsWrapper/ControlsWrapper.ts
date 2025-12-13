import type { IControlsParams } from '@Engine/Models';
import { AbstractWrapper } from '@Engine/Wrappers';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { IControlsWrapper } from './Models';

export function ControlsWrapper(params: IControlsParams): IControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  return { ...AbstractWrapper(entity, params), entity };
}
