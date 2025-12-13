import { AbstractWrapper } from '@Engine/Wrappers';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { IControlsParams } from '@Engine/Models';
import type { IControlsWrapper } from './Models';

export function ControlsWrapper({ camera, domElement }: IControlsParams): IControlsWrapper {
  const entity: OrbitControls = new OrbitControls(camera.entity, domElement);
  return { ...AbstractWrapper(entity), entity };
}
