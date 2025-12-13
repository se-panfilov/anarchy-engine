import type { IOrbitControlsParams, IOrbitControlsWrapper } from '@/Engine/Domains/Controls/Models';
import { isDefined } from '@/Engine/Utils';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function applyOrbitControlsParams(wrapper: IOrbitControlsWrapper, params: IOrbitControlsParams): void {
  if (isDefined(params.enableDamping)) wrapper.setDamping(params.enableDamping);
  if (isDefined(params.target)) wrapper.setTarget(Vector3Wrapper(params.target));
  if (isDefined(params.autoRotate)) wrapper.setAutoRotate(params.autoRotate);
  if (isDefined(params.minDistance)) wrapper.setMinDistance(params.minDistance);
  if (isDefined(params.maxDistance)) wrapper.setMaxDistance(params.maxDistance);
  if (isDefined(params.minZoom)) wrapper.setMinZoom(params.minZoom);
  if (isDefined(params.maxZoom)) wrapper.setMaxZoom(params.maxZoom);
  if (isDefined(params.minTargetRadius)) wrapper.setMinTargetRadius(params.minTargetRadius);
  if (isDefined(params.maxTargetRadius)) wrapper.setMaxTargetRadius(params.maxTargetRadius);
  if (isDefined(params.minPolarAngle)) wrapper.setMinPolarAngle(params.minPolarAngle);
  if (isDefined(params.maxPolarAngle)) wrapper.setMaxPolarAngle(params.maxPolarAngle);
  if (isDefined(params.minAzimuthAngle)) wrapper.setMinAzimuthAngle(params.minAzimuthAngle);
  if (isDefined(params.maxAzimuthAngle)) wrapper.setMaxAzimuthAngle(params.maxAzimuthAngle);
  if (isDefined(params.dampingFactor)) wrapper.setDampingFactor(params.dampingFactor);
  if (isDefined(params.enableZoom)) wrapper.setEnableZoom(params.enableZoom);
  if (isDefined(params.zoomSpeed)) wrapper.setZoomSpeed(params.zoomSpeed);
  if (isDefined(params.zoomToCursor)) wrapper.setZoomToCursor(params.zoomToCursor);
  if (isDefined(params.enableRotate)) wrapper.setEnableRotate(params.enableRotate);
  if (isDefined(params.rotateSpeed)) wrapper.setRotateSpeed(params.rotateSpeed);
  if (isDefined(params.enablePan)) wrapper.setEnablePan(params.enablePan);
  if (isDefined(params.panSpeed)) wrapper.setPanSpeed(params.panSpeed);
  if (isDefined(params.screenSpacePanning)) wrapper.setScreenSpacePanning(params.screenSpacePanning);
  if (isDefined(params.keyPanSpeed)) wrapper.setKeyPanSpeed(params.keyPanSpeed);
  if (isDefined(params.autoRotateSpeed)) wrapper.setAutoRotateSpeed(params.autoRotateSpeed);
}
