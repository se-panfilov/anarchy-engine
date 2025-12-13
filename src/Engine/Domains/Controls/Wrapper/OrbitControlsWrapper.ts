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

  // eslint-disable-next-line functional/immutable-data
  const setDamping = (isEnabled: boolean): void => void (entity.enableDamping = isEnabled);

  if (params.enableDamping) setDamping(params.enableDamping);

  const update = (): boolean => entity.update();

  const getDampingState = (): boolean => entity.enableDamping;

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    entity.update();
  }

  // eslint-disable-next-line functional/immutable-data
  const disable = (): void => void (entity.enabled = false);

  function setTarget(position: IVector3Wrapper): void {
    entity.target.set(position.getX(), position.getY(), position.getZ());
    entity.update();
  }

  // eslint-disable-next-line functional/immutable-data
  const setAutoRotate = (isEnabled: boolean): void => void (entity.autoRotate = isEnabled);

  // eslint-disable-next-line functional/immutable-data
  if (isDefined(params.enableDamping)) entity.enableDamping = params.enableDamping;
  return { ...AbstractWrapper(entity, WrapperType.Controls, params), update, setDamping, getDampingState, enable, disable, setTarget, setAutoRotate, entity };
}
