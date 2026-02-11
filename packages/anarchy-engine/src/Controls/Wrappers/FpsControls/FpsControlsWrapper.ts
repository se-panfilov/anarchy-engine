import { AbstractWrapper, WrapperType } from '@Anarchy/Engine/Abstract';
import type { TAnyCameraWrapper } from '@Anarchy/Engine/Camera';
import { controlsToConfig } from '@Anarchy/Engine/Controls/Adapters';
import type { ControlsType } from '@Anarchy/Engine/Controls/Constants';
import type { TControlsServiceDependencies, TFpsControlsConfig, TFpsControlsParams, TFpsControlsWrapper } from '@Anarchy/Engine/Controls/Models';
import { makeControlsEvented, updateCameraTransformDriveOnChange } from '@Anarchy/Engine/Controls/Utils';
import { getFpsControlsAccessors } from '@Anarchy/Engine/Controls/Wrappers/FpsControls/FpsControlsAccessors';
import { applyFpsControlsParams } from '@Anarchy/Engine/Controls/Wrappers/FpsControls/FpsControlsWrapperHelper';
import type { TMilliseconds } from '@Anarchy/Engine/Math';
import { withActiveMixin } from '@Anarchy/Engine/Mixins';
import { isEulerLike } from '@Anarchy/Engine/Utils';
import type { Euler } from 'three';
import { MathUtils, Quaternion, Spherical, Vector3 } from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

export function FpsControlsWrapper(params: TFpsControlsParams): TFpsControlsWrapper {
  const entity: FirstPersonControls = new FirstPersonControls(params.camera.entity, params.canvas);

  makeControlsEvented(entity);

  const update = (delta: TMilliseconds): void => entity.update(delta);
  const getType = (): ControlsType => params.type;

  // TODO - add pointer lock
  // params.canvas.addEventListener('click', () => {
  //   params.canvas.requestPointerLock();
  // });

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

  function rotateCameraBy(rotation: Quaternion | Euler): void {
    const currentQuaternion: Quaternion = params.camera.entity.quaternion.clone();

    const deltaQuaternion: Quaternion = rotation instanceof Quaternion ? rotation : new Quaternion().setFromEuler(rotation);

    currentQuaternion.multiply(deltaQuaternion); // order: current * delta

    params.camera.entity.quaternion.copy(currentQuaternion);

    (entity as unknown as any)._setOrientation();

    entity.update(0);
    entity.dispatchEvent({ type: 'end' } as never);
  }

  function rotateCameraTo(rotation: Quaternion | Euler): void {
    const quaternion: Quaternion = isEulerLike(rotation) ? new Quaternion().setFromEuler(rotation) : rotation;

    params.camera.entity.quaternion.copy(quaternion);

    const direction: Vector3 = new Vector3(0, 0, -1).applyQuaternion(quaternion);
    const spherical: Spherical = new Spherical().setFromVector3(direction);

    const latitude: number = 90 - MathUtils.radToDeg(spherical.phi);
    const longitude: number = MathUtils.radToDeg(spherical.theta);

    // eslint-disable-next-line functional/immutable-data
    (entity as unknown as any)._lat = latitude;
    // eslint-disable-next-line functional/immutable-data,spellcheck/spell-checker
    (entity as unknown as any)._lon = longitude;

    entity.update(0);
    entity.dispatchEvent({ type: 'end' } as never);
  }

  const result = Object.assign(AbstractWrapper(entity, WrapperType.Controls, params), {
    update,
    enable,
    disable,
    isEnable,
    getType,
    rotateCameraBy,
    rotateCameraTo,
    getCamera: (): TAnyCameraWrapper => params.camera,
    ...getFpsControlsAccessors(entity),
    ...withActiveMixin(),
    entity,
    serialize: (dependencies: TControlsServiceDependencies): TFpsControlsConfig => controlsToConfig(result, dependencies) as TFpsControlsConfig
  });

  applyFpsControlsParams(result, params.options);
  result.enable();
  result.update(0);
  result._setActive(params.isActive, true);
  updateCameraTransformDriveOnChange(result, params.camera);

  return result;
}
