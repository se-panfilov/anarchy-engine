import type { TCamera, TCameraWrapper } from '@/Engine/Camera';
import type { TControlsConfig, TControlsServiceDependencies, TControlsWrapper, TFpsControlsConfig, TFpsControlsWrapper, TOrbitControlsConfig, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { isFpsControls, isOrbitControls } from '@/Engine/Controls/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isNotDefined, vector3ToXyz } from '@/Engine/Utils';

export function controlsToConfig(entity: TControlsWrapper, { cameraService }: TControlsServiceDependencies): TControlsConfig {
  const camera: TCamera | undefined = entity.entity.object as TCamera;

  if (isNotDefined(camera)) throw new Error(`[Serialization] Controls: camera not found for entity with name: "${entity.name}", (id: "${entity.id}")`);
  const cameraW: TCameraWrapper | undefined = cameraService.getRegistry().find((cameraWrapper: TCameraWrapper): boolean => cameraWrapper.entity === camera);
  if (isNotDefined(cameraW)) throw new Error(`[Serialization] Controls: camera not found for entity with name: "${entity.name}", (id: "${entity.id}")`);

  const result = filterOutEmptyFields({
    enabled: entity.isEnable(),
    type: entity.getType(),
    isActive: entity.isActive(),
    cameraName: cameraW.name,
    ...extractSerializableRegistrableFields(entity)
  });

  // eslint-disable-next-line functional/immutable-data
  if (isOrbitControls(entity)) Object.assign(result, getOrbitControlsFields(entity as TOrbitControlsWrapper));

  // eslint-disable-next-line functional/immutable-data
  if (isFpsControls(entity)) Object.assign(result, getFpsControlsFields(entity as TFpsControlsWrapper));

  return filterOutEmptyFields(result);
}

function getOrbitControlsFields(entity: TOrbitControlsWrapper): Omit<TOrbitControlsConfig, 'type' | 'isActive' | 'name' | 'cameraName'> {
  return filterOutEmptyFields({
    autoRotate: entity.getAutoRotate(),
    autoRotateSpeed: entity.getAutoRotateSpeed(),
    cursor: vector3ToXyz(entity.entity.cursor.clone()),
    dampingFactor: entity.getDampingFactor(),
    enableDamping: entity.getDamping(),
    enablePan: entity.getEnablePan(),
    enableRotate: entity.getEnableRotate(),
    enableZoom: entity.getEnableZoom(),
    enabled: entity.isEnable(),
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

function getFpsControlsFields(entity: TFpsControlsWrapper): Omit<TFpsControlsConfig, 'type' | 'isActive' | 'name' | 'cameraName'> {
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
