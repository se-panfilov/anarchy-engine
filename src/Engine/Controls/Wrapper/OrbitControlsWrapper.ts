import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import type { IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { getOrbitControlsAccessors } from '@/Engine/Controls/Wrapper/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@/Engine/Controls/Wrapper/OrbitControlsWrapperHelper';
import { adjustWthActive } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';
import type { IVector3Wrapper } from '@/Engine/Vector';
import { Vector3Wrapper } from '@/Engine/Vector';

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
    wrapper.setTarget(position);
  }

  const partialWrapper: Omit<IOrbitControlsWrapper, 'isActive' | '_setActive'> = {
    ...AbstractWrapper(entity, WrapperType.Controls, params),
    update,
    enable,
    disable,
    isEnable,
    ...getOrbitControlsAccessors(entity),
    moveToTargetSmoothly,
    entity
  };

  const wrapper: IOrbitControlsWrapper = adjustWthActive(partialWrapper, params.isActive);

  applyOrbitControlsParams(wrapper, params);
  partialWrapper.enable();
  partialWrapper.update();

  return wrapper;
}
