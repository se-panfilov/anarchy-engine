import type { TControlsConfig, TControlsWrapper, TFpsControlsConfig, TFpsControlsWrapper, TOrbitControlsConfig, TOrbitControlsWrapper } from '@/Engine/Controls/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function controlsToConfig(entity: TControlsWrapper): TControlsConfig {
  console.log('XXX entity', entity);

  return filterOutEmptyFields({
    enabled: entity.isEnable(),
    type: entity.getType(),
    isActive: entity.isActive(),
    cameraName: entity.getCamera(),
    ...getFpsControlsFields(entity as TFpsControlsWrapper),
    ...getOrbitControlsFields(entity as TOrbitControlsWrapper),
    ...extractSerializableRegistrableFields(entity)
  });
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
    target: entity.getTarget(),
    cursor: entity.getCursor()
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
