import type { TFpsControlsAccessors } from '@Anarchy/Engine/Controls/Models';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import type { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';

export function getFpsControlsAccessors(entity: TWriteable<FirstPersonControls>): TFpsControlsAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setMovementSpeed = (speed: number): void => void (entity.movementSpeed = speed);
  const getMovementSpeed = (): number => entity.movementSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setLookSpeed = (speed: number): void => void (entity.lookSpeed = speed);
  const getLookSpeed = (): number => entity.lookSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setLookVertical = (isEnabled: boolean): void => void (entity.lookVertical = isEnabled);
  const getLookVertical = (): boolean => entity.lookVertical;

  // eslint-disable-next-line functional/immutable-data
  const setAutoForward = (isEnabled: boolean): void => void (entity.autoForward = isEnabled);
  const getAutoForward = (): boolean => entity.autoForward;

  // eslint-disable-next-line functional/immutable-data
  const setActiveLook = (isEnabled: boolean): void => void (entity.activeLook = isEnabled);
  const getActiveLook = (): boolean => entity.activeLook;

  // eslint-disable-next-line functional/immutable-data
  const setHeightSpeed = (isEnabled: boolean): void => void (entity.heightSpeed = isEnabled);
  const getHeightSpeed = (): boolean => entity.heightSpeed;

  // eslint-disable-next-line functional/immutable-data
  const setHeightCoef = (height: number): void => void (entity.heightCoef = height);
  const getHeightCoef = (): number => entity.heightCoef;

  // eslint-disable-next-line functional/immutable-data
  const setHeightMin = (height: number): void => void (entity.heightMin = height);
  const getHeightMin = (): number => entity.heightMin;

  // eslint-disable-next-line functional/immutable-data
  const setHeightMax = (height: number): void => void (entity.heightMax = height);
  const getHeightMax = (): number => entity.heightMax;

  // eslint-disable-next-line functional/immutable-data
  const setConstrainVertical = (isEnabled: boolean): void => void (entity.constrainVertical = isEnabled);
  const getConstrainVertical = (): boolean => entity.constrainVertical;

  // eslint-disable-next-line functional/immutable-data
  const setVerticalMin = (angle: number): void => void (entity.verticalMin = angle);
  const getVerticalMin = (): number => entity.verticalMin;

  // eslint-disable-next-line functional/immutable-data
  const setVerticalMax = (angle: number): void => void (entity.verticalMax = angle);
  const getVerticalMax = (): number => entity.verticalMax;

  // eslint-disable-next-line functional/immutable-data
  const setMouseDragOn = (isEnabled: boolean): void => void (entity.mouseDragOn = isEnabled);
  const getMouseDragOn = (): boolean => entity.mouseDragOn;

  return {
    setMovementSpeed,
    getMovementSpeed,
    setLookSpeed,
    getLookSpeed,
    setLookVertical,
    getLookVertical,
    setAutoForward,
    getAutoForward,
    setActiveLook,
    getActiveLook,
    setHeightSpeed,
    getHeightSpeed,
    setHeightCoef,
    getHeightCoef,
    setHeightMin,
    getHeightMin,
    setHeightMax,
    getHeightMax,
    setConstrainVertical,
    getConstrainVertical,
    setVerticalMin,
    getVerticalMin,
    setVerticalMax,
    getVerticalMax,
    setMouseDragOn,
    getMouseDragOn
  };
}
