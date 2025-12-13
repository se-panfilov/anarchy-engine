import type { TOrbitControlsParamsOptions, TOrbitControlsWrapper } from '@Anarchy/Engine/Controls/Models';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';

export function applyOrbitControlsParams(wrapper: TOrbitControlsWrapper, options: TOrbitControlsParamsOptions | undefined): void {
  if (isNotDefined(options)) return;

  if (isDefined(options.enableDamping)) wrapper.setDamping(options.enableDamping);
  if (isDefined(options.autoRotate)) wrapper.setAutoRotate(options.autoRotate);
  if (isDefined(options.minDistance)) wrapper.setMinDistance(options.minDistance);
  if (isDefined(options.maxDistance)) wrapper.setMaxDistance(options.maxDistance);
  if (isDefined(options.minZoom)) wrapper.setMinZoom(options.minZoom);
  if (isDefined(options.maxZoom)) wrapper.setMaxZoom(options.maxZoom);
  if (isDefined(options.minTargetRadius)) wrapper.setMinTargetRadius(options.minTargetRadius);
  if (isDefined(options.maxTargetRadius)) wrapper.setMaxTargetRadius(options.maxTargetRadius);
  if (isDefined(options.minPolarAngle)) wrapper.setMinPolarAngle(options.minPolarAngle);
  if (isDefined(options.maxPolarAngle)) wrapper.setMaxPolarAngle(options.maxPolarAngle);
  if (isDefined(options.minAzimuthAngle)) wrapper.setMinAzimuthAngle(options.minAzimuthAngle);
  if (isDefined(options.maxAzimuthAngle)) wrapper.setMaxAzimuthAngle(options.maxAzimuthAngle);
  if (isDefined(options.dampingFactor)) wrapper.setDampingFactor(options.dampingFactor);
  if (isDefined(options.enableZoom)) wrapper.setEnableZoom(options.enableZoom);
  if (isDefined(options.zoomSpeed)) wrapper.setZoomSpeed(options.zoomSpeed);
  if (isDefined(options.zoomToCursor)) wrapper.setZoomToCursor(options.zoomToCursor);
  if (isDefined(options.enableRotate)) wrapper.setEnableRotate(options.enableRotate);
  if (isDefined(options.rotateSpeed)) wrapper.setRotateSpeed(options.rotateSpeed);
  if (isDefined(options.enablePan)) wrapper.setEnablePan(options.enablePan);
  if (isDefined(options.panSpeed)) wrapper.setPanSpeed(options.panSpeed);
  if (isDefined(options.screenSpacePanning)) wrapper.setScreenSpacePanning(options.screenSpacePanning);
  if (isDefined(options.keyPanSpeed)) wrapper.setKeyPanSpeed(options.keyPanSpeed);
  if (isDefined(options.autoRotateSpeed)) wrapper.setAutoRotateSpeed(options.autoRotateSpeed);
}
