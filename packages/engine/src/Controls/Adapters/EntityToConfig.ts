import type { TAnyCamera, TAnyCameraWrapper } from '@Engine/Camera';
import type { TAnyControlsWrapper, TControlsConfig, TControlsServiceDependencies, TFpsControlsWrapper, TOrbitControlsConfigOptions, TOrbitControlsWrapper } from '@Engine/Controls/Models';
import type { TFpsControlsConfigOptions } from '@Engine/Controls/Models/TFpsControlsConfigOptions';
import { isFpsControls, isOrbitControls } from '@Engine/Controls/Utils';
import { extractSerializableRegistrableFields } from '@Engine/Mixins';
import type { TWriteable } from '@Engine/Utils';
import { filterOutEmptyFields, isNotDefined, vector3ToXyz } from '@Engine/Utils';

export function controlsToConfig(entity: TAnyControlsWrapper, { cameraService }: TControlsServiceDependencies): TControlsConfig {
  const camera: TAnyCamera | undefined = entity.entity.object as TAnyCamera;
  if (isNotDefined(camera)) throw new Error(`[Serialization] Controls: camera not found for entity with name: "${entity.name}", (id: "${entity.id}")`);

  const cameraW: TAnyCameraWrapper = cameraService.getRegistry().get((cameraWrapper: TAnyCameraWrapper): boolean => cameraWrapper.entity === camera);

  const result: TWriteable<TControlsConfig> = filterOutEmptyFields({
    enabled: entity.isEnable(),
    type: entity.getType(),
    isActive: entity.isActive(),
    cameraName: cameraW.name,
    ...extractSerializableRegistrableFields(entity)
  });

  const options = {};

  // eslint-disable-next-line functional/immutable-data
  if (isOrbitControls(entity)) Object.assign(options, getOrbitControlsFields(entity as TOrbitControlsWrapper));

  // eslint-disable-next-line functional/immutable-data
  if (isFpsControls(entity)) Object.assign(options, getFpsControlsFields(entity as TFpsControlsWrapper));

  // eslint-disable-next-line functional/immutable-data
  result.options = filterOutEmptyFields(options);

  return filterOutEmptyFields(result);
}

function getOrbitControlsFields(entity: TOrbitControlsWrapper): TOrbitControlsConfigOptions {
  return filterOutEmptyFields({
    autoRotate: entity.getAutoRotate(),
    autoRotateSpeed: entity.getAutoRotateSpeed(),
    cursor: vector3ToXyz(entity.entity.cursor.clone()),
    dampingFactor: entity.getDampingFactor(),
    enableDamping: entity.getDamping(),
    enablePan: entity.getEnablePan(),
    enableRotate: entity.getEnableRotate(),
    enableZoom: entity.getEnableZoom(),
    keyPanSpeed: entity.getKeyPanSpeed(),
    maxAzimuthAngle: entity.getMaxAzimuthAngle(),
    maxDistance: entity.getMaxDistance(),
    maxPolarAngle: entity.getMaxPolarAngle(),
    maxTargetRadius: entity.getMaxTargetRadius(),
    maxZoom: entity.getMaxZoom(),
    minAzimuthAngle: entity.getMinAzimuthAngle(),
    minDistance: entity.getMinDistance(),
    minPolarAngle: entity.getMinPolarAngle(),
    minTargetRadius: entity.getMinTargetRadius(),
    minZoom: entity.getMinZoom(),
    panSpeed: entity.getPanSpeed(),
    rotateSpeed: entity.getRotateSpeed(),
    screenSpacePanning: entity.getScreenSpacePanning(),
    target: vector3ToXyz(entity.entity.target.clone()),
    zoomSpeed: entity.getZoomSpeed(),
    zoomToCursor: entity.getZoomToCursor()
  });
}

function getFpsControlsFields(entity: TFpsControlsWrapper): TFpsControlsConfigOptions {
  return filterOutEmptyFields({
    activeLook: entity.getActiveLook(),
    autoForward: entity.getAutoForward(),
    constrainVertical: entity.getConstrainVertical(),
    heightCoef: entity.getHeightCoef(),
    heightMax: entity.getHeightMax(),
    heightMin: entity.getHeightMin(),
    heightSpeed: entity.getHeightSpeed(),
    lookSpeed: entity.getLookSpeed(),
    lookVertical: entity.getLookVertical(),
    mouseDragOn: entity.getMouseDragOn(),
    movementSpeed: entity.getMovementSpeed(),
    verticalMax: entity.getVerticalMax(),
    verticalMin: entity.getVerticalMin()
  });
}
