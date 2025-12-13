import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Domains/Abstract';
import type { IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { getOrbitControlsAccessors } from '@/Engine/Domains/Controls/Wrapper/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@/Engine/Domains/Controls/Wrapper/OrbitControlsWrapperHelper';
import { isDefined } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Wrappers';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function OrbitControlsWrapper(params: IOrbitControlsParams): IOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  if (isDefined(params.target)) {
    entity.target.set(params.target.getX(), params.target.getY(), params.target.getZ());
    entity.update();
  }
  const update = (): boolean => entity.update();

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

  function moveToTargetSmoothly(position: IVector3Wrapper): void {
    const currentPolarAngle: number = entity.getPolarAngle();
    const currentAzimuthalAngle: number = entity.getAzimuthalAngle();
    const currentDistance: number = entity.getDistance();

    const x: number = currentDistance * Math.sin(currentPolarAngle) * Math.sin(currentAzimuthalAngle);
    const y: number = currentDistance * Math.cos(currentPolarAngle);
    const z: number = currentDistance * Math.sin(currentPolarAngle) * Math.cos(currentAzimuthalAngle);
    // camera.entity.position.set(x + position.getX(), y + position.getY(), z + position.getZ());
    params.camera.setPosition(Vector3Wrapper({ x: x + position.getX(), y: y + position.getY(), z: z + position.getZ() }));
    result.setTarget(position);
  }

  const result = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    update,
    enable,
    disable,
    isEnable,
    ...getOrbitControlsAccessors(entity),
    moveToTargetSmoothly,
    entity
  };

  applyOrbitControlsParams(result, params);
  result.enable();
  result.update();

  return result;
}
