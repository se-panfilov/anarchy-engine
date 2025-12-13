import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { isDefined } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Wrappers';

export function OrbitControlsWrapper(params: IOrbitControlsParams): IOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  if (isDefined(params.target)) {
    entity.target.set(params.target.x, params.target.y, params.target.z);
    entity.update();
  }

  if (params.enableDamping) setDamping(params.enableDamping);

  function update(): void {
    entity.update();
  }

  function setDamping(isEnabled: boolean): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enableDamping = isEnabled;
  }

  function getDampingState(): boolean {
    return entity.enableDamping;
  }

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    entity.update();
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
  }

  function setTarget(position: IVector3Wrapper): void {
    entity.target.set(position.getX(), position.getY(), position.getZ());
    entity.update();
  }

  function setAutoRotate(isEnabled: boolean): void {
    // eslint-disable-next-line functional/immutable-data
    entity.autoRotate = isEnabled;
  }

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.damping)) entity.enableDamping = params.damping;
  return { ...AbstractWrapper(entity, WrapperType.Controls, params), update, setDamping, getDampingState, enable, disable, setTarget, setAutoRotate, entity };
}
