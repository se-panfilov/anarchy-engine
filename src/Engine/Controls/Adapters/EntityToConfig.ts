import type { TCamera, TCameraWrapper } from '@/Engine/Camera';
import type { TControlsConfig, TControlsServiceDependencies, TControlsWrapper, TFpsControlsConfig, TFpsControlsWrapper, TOrbitControlsConfig, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { isFpsControls, isOrbitControls } from '@/Engine/Controls/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isNotDefined } from '@/Engine/Utils';

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
    maxDistance: entity.getMaxDistance(),
    minDistance: entity.getMinDistance(),
    maxZoom: entity.getMaxZoom(),
    minZoom: entity.getMinZoom(),
    maxTargetRadius: entity.getMaxTargetRadius(),
    minTargetRadius: entity.getMinTargetRadius(),
    maxPolarAngle: entity.getMaxPolarAngle(),
    minPolarAngle: entity.getMinPolarAngle(),
    maxAzimuthAngle: entity.getMaxAzimuthAngle(),
    minAzimuthAngle: entity.getMinAzimuthAngle(),
    enableDamping: entity.getDamping(),
    dampingFactor: entity.getDampingFactor(),
    enableZoom: entity.getEnableZoom(),
    zoomSpeed: entity.getZoomSpeed(),
    zoomToCursor: entity.getZoomToCursor(),
    enableRotate: entity.getEnableRotate(),
    rotateSpeed: entity.getRotateSpeed(),
    enablePan: entity.getEnablePan(),
    panSpeed: entity.getPanSpeed(),
    screenSpacePanning: entity.getScreenSpacePanning(),
    keyPanSpeed: entity.getKeyPanSpeed(),
    autoRotate: entity.getAutoRotate(),
    autoRotateSpeed: entity.getAutoRotateSpeed(),
    target: entity.entity.target.clone(),
    cursor: entity.entity.cursor.clone()
  });
}

function getFpsControlsFields(entity: TFpsControlsWrapper): Omit<TFpsControlsConfig, 'type' | 'isActive' | 'name' | 'cameraName'> {
  return filterOutEmptyFields({
    movementSpeed: entity.getMovementSpeed(),
    lookSpeed: entity.getLookSpeed(),
    lookVertical: entity.getLookVertical(),
    autoForward: entity.getAutoForward(),
    activeLook: entity.getActiveLook(),
    heightSpeed: entity.getHeightSpeed(),
    heightCoef: entity.getHeightCoef(),
    heightMin: entity.getHeightMin(),
    heightMax: entity.getHeightMax(),
    constrainVertical: entity.getConstrainVertical(),
    verticalMin: entity.getVerticalMin(),
    verticalMax: entity.getVerticalMax(),
    mouseDragOn: entity.getMouseDragOn()
  });
}
