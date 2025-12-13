import type { TOrbitControlsAccessors } from '@Engine/Controls/Models';
import type { TReadonlyVector3 } from '@Engine/ThreeLib';
import type { TWriteable } from '@Shared/Utils';
import type { Vector3 } from 'three';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function getOrbitControlsAccessors(entity: TWriteable<OrbitControls>): TOrbitControlsAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setDamping = (isEnabled: boolean): void => void (entity.enableDamping = isEnabled);
  const getDamping = (): boolean => entity.enableDamping;

  function setTarget({ x, y, z }: TReadonlyVector3 | Vector3): void {
    entity.target.set(x, y, z);
    entity.update();
  }

  // eslint-disable-next-line functional/immutable-data
  const setAutoRotate = (isEnabled: boolean): void => void (entity.autoRotate = isEnabled);
  const getAutoRotate = (): boolean => entity.autoRotate;

  // eslint-disable-next-line functional/immutable-data
  const setMinDistance = (minDistance: number): void => void (entity.minDistance = minDistance);
  const getMinDistance = (): number => entity.minDistance;

  // eslint-disable-next-line functional/immutable-data
  const setMaxDistance = (maxDistance: number): void => void (entity.maxDistance = maxDistance);
  const getMaxDistance = (): number => entity.maxDistance;

  // eslint-disable-next-line functional/immutable-data
  const setMinZoom = (minZoom: number): void => void (entity.minZoom = minZoom);
  const getMinZoom = (): number => entity.minZoom;

  // eslint-disable-next-line functional/immutable-data
  const setMaxZoom = (maxZoom: number): void => void (entity.maxZoom = maxZoom);
  const getMaxZoom = (): number => entity.maxZoom;

  // eslint-disable-next-line functional/immutable-data
  const setMinTargetRadius = (minTargetRadius: number): void => void (entity.minPolarAngle = minTargetRadius);
  const getMinTargetRadius = (): number => entity.minPolarAngle;

  // eslint-disable-next-line functional/immutable-data
  const setMaxTargetRadius = (maxTargetRadius: number): void => void (entity.maxPolarAngle = maxTargetRadius);
  const getMaxTargetRadius = (): number => entity.maxPolarAngle;

  // eslint-disable-next-line functional/immutable-data
  const setMinPolarAngle = (minPolarAngle: number): void => void (entity.minPolarAngle = minPolarAngle);
  const getMinPolarAngle = (): number => entity.minPolarAngle;

  // eslint-disable-next-line functional/immutable-data
  const setMaxPolarAngle = (maxPolarAngle: number): void => void (entity.maxPolarAngle = maxPolarAngle);
  const getMaxPolarAngle = (): number => entity.maxPolarAngle;

  // eslint-disable-next-line functional/immutable-data
  const setMinAzimuthAngle = (minAzimuthAngle: number): void => void (entity.minAzimuthAngle = minAzimuthAngle);
  const getMinAzimuthAngle = (): number => entity.minAzimuthAngle;

  // eslint-disable-next-line functional/immutable-data
  const setMaxAzimuthAngle = (maxAzimuthAngle: number): void => void (entity.maxAzimuthAngle = maxAzimuthAngle);
  const getMaxAzimuthAngle = (): number => entity.maxAzimuthAngle;

  // eslint-disable-next-line functional/immutable-data
  const setDampingFactor = (dampingFactor: number): void => void (entity.dampingFactor = dampingFactor);
  const getDampingFactor = (): number => entity.dampingFactor;

  // eslint-disable-next-line functional/immutable-data
  const setEnableZoom = (isEnabled: boolean): void => void (entity.enableZoom = isEnabled);
  const getEnableZoom = (): boolean => entity.enableZoom;

  // eslint-disable-next-line functional/immutable-data
  const setZoomSpeed = (zoomSpeed: number): void => void (entity.zoomSpeed = zoomSpeed);
  const getZoomSpeed = (): number => entity.zoomSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setZoomToCursor = (isEnabled: boolean): void => void (entity.zoomToCursor = isEnabled);
  const getZoomToCursor = (): boolean => entity.zoomToCursor;

  // eslint-disable-next-line functional/immutable-data
  const setEnableRotate = (isEnabled: boolean): void => void (entity.enableRotate = isEnabled);
  const getEnableRotate = (): boolean => entity.enableRotate;

  // eslint-disable-next-line functional/immutable-data
  const setRotateSpeed = (rotateSpeed: number): void => void (entity.rotateSpeed = rotateSpeed);
  const getRotateSpeed = (): number => entity.rotateSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setEnablePan = (isEnabled: boolean): void => void (entity.enablePan = isEnabled);
  const getEnablePan = (): boolean => entity.enablePan;

  // eslint-disable-next-line functional/immutable-data
  const setPanSpeed = (panSpeed: number): void => void (entity.panSpeed = panSpeed);
  const getPanSpeed = (): number => entity.panSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setScreenSpacePanning = (isEnabled: boolean): void => void (entity.screenSpacePanning = isEnabled);
  const getScreenSpacePanning = (): boolean => entity.screenSpacePanning;

  // eslint-disable-next-line functional/immutable-data
  const setKeyPanSpeed = (keyPanSpeed: number): void => void (entity.keyPanSpeed = keyPanSpeed);
  const getKeyPanSpeed = (): number => entity.keyPanSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setAutoRotateSpeed = (autoRotateSpeed: number): void => void (entity.autoRotateSpeed = autoRotateSpeed);
  const getAutoRotateSpeed = (): number => entity.autoRotateSpeed;

  return {
    setDamping,
    getDamping,
    setTarget,
    setAutoRotate,
    getAutoRotate,
    setMinDistance,
    getMinDistance,
    setMaxDistance,
    getMaxDistance,
    setMinZoom,
    getMinZoom,
    setMaxZoom,
    getMaxZoom,
    setMinTargetRadius,
    getMinTargetRadius,
    setMaxTargetRadius,
    getMaxTargetRadius,
    setMinPolarAngle,
    getMinPolarAngle,
    setMaxPolarAngle,
    getMaxPolarAngle,
    setMinAzimuthAngle,
    getMinAzimuthAngle,
    setMaxAzimuthAngle,
    getMaxAzimuthAngle,
    setDampingFactor,
    getDampingFactor,
    setEnableZoom,
    getEnableZoom,
    setZoomSpeed,
    getZoomSpeed,
    setZoomToCursor,
    getZoomToCursor,
    setEnableRotate,
    getEnableRotate,
    setRotateSpeed,
    getRotateSpeed,
    setEnablePan,
    getEnablePan,
    setPanSpeed,
    getPanSpeed,
    setScreenSpacePanning,
    getScreenSpacePanning,
    setKeyPanSpeed,
    getKeyPanSpeed,
    setAutoRotateSpeed,
    getAutoRotateSpeed
  };
}
