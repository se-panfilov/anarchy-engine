import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { ControlsParams } from '@Engine/Models';

type IControlsWrapper = ReturnType<typeof AbstractWrapper<OrbitControls>>;

export function ControlsWrapper({ camera, domElement }: ControlsParams): IControlsWrapper {
  const entity: OrbitControls = new OrbitControls(camera.entity, domElement);
  return { ...AbstractWrapper(entity), entity };
}
