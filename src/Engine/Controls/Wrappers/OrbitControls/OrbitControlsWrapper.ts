import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Vector3 } from 'three/src/math/Vector3';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TOrbitControlsParams, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { getOrbitControlsAccessors } from '@/Engine/Controls/Wrappers/OrbitControls/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@/Engine/Controls/Wrappers/OrbitControls/OrbitControlsWrapperHelper';
import { withActiveMixin } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

export function OrbitControlsWrapper(params: TOrbitControlsParams): TOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  if (isDefined(params.target)) {
    entity.target.set(params.target.x, params.target.y, params.target.z);
    entity.update();
  }
  const update = (): boolean => entity.update();

  const getType = (): ControlsType => params.type;

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    entity.update();
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
    entity.update();
  }

  const isEnable = (): boolean => entity.enabled;

  function moveToTargetSmoothly(position: Vector3): void {
    const currentPolarAngle: number = entity.getPolarAngle();
    const currentAzimuthalAngle: number = entity.getAzimuthalAngle();
    const currentDistance: number = entity.getDistance();

    const x: number = currentDistance * Math.sin(currentPolarAngle) * Math.sin(currentAzimuthalAngle);
    const y: number = currentDistance * Math.cos(currentPolarAngle);
    const z: number = currentDistance * Math.sin(currentPolarAngle) * Math.cos(currentAzimuthalAngle);

    params.camera.drive.position$.next(new Vector3(x + position.x, y + position.y, z + position.z));
    result.setTarget(position);
  }

  const result = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    update,
    enable,
    disable,
    isEnable,
    getType,
    ...getOrbitControlsAccessors(entity),
    ...withActiveMixin(),
    moveToTargetSmoothly,
    entity
  };

  applyOrbitControlsParams(result, params);
  result.enable();
  result.update();
  result._setActive(params.isActive, true);

  return result;
}
