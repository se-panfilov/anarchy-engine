import { Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractWrapper, WrapperType } from '@/Engine/Abstract';
import { controlsToConfig } from '@/Engine/Controls/Adapters';
import type { ControlsType } from '@/Engine/Controls/Constants';
import type { TControlsServiceDependencies, TOrbitControlsConfig, TOrbitControlsParams, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { getOrbitControlsAccessors } from '@/Engine/Controls/Wrappers/OrbitControls/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@/Engine/Controls/Wrappers/OrbitControls/OrbitControlsWrapperHelper';
import type { TMilliseconds } from '@/Engine/Math';
import { withActiveMixin } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export function OrbitControlsWrapper(params: TOrbitControlsParams): TOrbitControlsWrapper {
  const entity: OrbitControls = new OrbitControls(params.camera.entity, params.canvas);
  const update = (delta: TMilliseconds): boolean => entity.update(delta);

  if (isDefined(params.target)) {
    entity.target.set(params.target.x, params.target.y, params.target.z);
    update(0);
  }

  const getType = (): ControlsType => params.type;

  function enable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = true;
    update(0);
  }

  function disable(): void {
    // eslint-disable-next-line functional/immutable-data
    entity.enabled = false;
    update(0);
  }

  const isEnable = (): boolean => entity.enabled;

  function moveToTargetSmoothly(position: TReadonlyVector3 | Vector3): void {
    const currentPolarAngle: number = entity.getPolarAngle();
    const currentAzimuthalAngle: number = entity.getAzimuthalAngle();
    const currentDistance: number = entity.getDistance();

    const x: number = currentDistance * Math.sin(currentPolarAngle) * Math.sin(currentAzimuthalAngle);
    const y: number = currentDistance * Math.cos(currentPolarAngle);
    const z: number = currentDistance * Math.sin(currentPolarAngle) * Math.cos(currentAzimuthalAngle);

    params.camera.drive.position$.next(new Vector3(x + position.x, y + position.y, z + position.z));
    result.setTarget(position);
  }

  const result = Object.assign(AbstractWrapper(entity, WrapperType.Controls, { name: params.name, tags: params.tags }), {
    update,
    enable,
    disable,
    isEnable,
    getType,
    ...getOrbitControlsAccessors(entity),
    ...withActiveMixin(),
    moveToTargetSmoothly,
    entity,
    // TODO 15-0-0: add serializer to the service to avoid dependencies passing
    serialize: (dependencies: TControlsServiceDependencies): TOrbitControlsConfig => controlsToConfig(result, dependencies)
  });

  applyOrbitControlsParams(result, params);
  result.enable();
  result.update(0);
  result._setActive(params.isActive, true);

  return result;
}
