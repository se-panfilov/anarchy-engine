import { AbstractWrapper, WrapperType } from '@Engine/Abstract';
import type { TAnyCameraWrapper } from '@Engine/Camera';
import { controlsToConfig } from '@Engine/Controls/Adapters';
import type { ControlsType } from '@Engine/Controls/Constants';
import type { TControlsServiceDependencies, TOrbitControlsConfig, TOrbitControlsParams, TOrbitControlsWrapper } from '@Engine/Controls/Models';
import { updateCameraTransformDriveOnChange } from '@Engine/Controls/Utils';
import { getOrbitControlsAccessors } from '@Engine/Controls/Wrappers/OrbitControls/OrbitControlsAccessors';
import { applyOrbitControlsParams } from '@Engine/Controls/Wrappers/OrbitControls/OrbitControlsWrapperHelper';
import type { TMilliseconds } from '@Engine/Math';
import { withActiveMixin } from '@Engine/Mixins';
import type { TReadonlyVector3 } from '@Engine/ThreeLib';
import { isEulerLike } from '@Engine/Utils';
import { isDefined } from '@Shared/Utils';
import type { Euler } from 'three';
import { Quaternion, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

  function rotateCameraBy(rotation: Quaternion | Euler): void {
    const quaternion: Quaternion = isEulerLike(rotation) ? new Quaternion().setFromEuler(rotation) : rotation;

    const offset: Vector3 = new Vector3().subVectors(params.camera.entity.position, entity.target);
    offset.applyQuaternion(quaternion);

    params.camera.entity.position.copy(entity.target).add(offset);
    params.camera.entity.quaternion.copy(quaternion);

    entity.update();
    entity.dispatchEvent({ type: 'end' });
  }

  function rotateCameraTo(rotation: Quaternion | Euler): void {
    const quaternion: Quaternion = isEulerLike(rotation) ? new Quaternion().setFromEuler(rotation) : rotation;

    const distance: number = params.camera.entity.position.distanceTo(entity.target);

    const direction: Vector3 = new Vector3(0, 0, 1).applyQuaternion(quaternion).multiplyScalar(distance);

    const newCameraPosition: Vector3 = new Vector3().copy(entity.target).add(direction);

    params.camera.entity.position.copy(newCameraPosition);
    params.camera.entity.quaternion.copy(quaternion);

    entity.update();
    entity.dispatchEvent({ type: 'end' });
  }

  const result = Object.assign(AbstractWrapper(entity, WrapperType.Controls, params), {
    update,
    enable,
    disable,
    isEnable,
    getType,
    ...getOrbitControlsAccessors(entity),
    ...withActiveMixin(),
    moveToTargetSmoothly,
    rotateCameraBy,
    rotateCameraTo,
    getCamera: (): TAnyCameraWrapper => params.camera,
    entity,
    serialize: (dependencies: TControlsServiceDependencies): TOrbitControlsConfig => controlsToConfig(result, dependencies) as TOrbitControlsConfig
  });

  applyOrbitControlsParams(result, params.options);
  result.enable();
  result.update(0);
  result._setActive(params.isActive, true);
  updateCameraTransformDriveOnChange(result, params.camera);

  return result;
}
