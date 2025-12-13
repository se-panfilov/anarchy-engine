import type { IWriteable } from '@Engine/Utils';
import type { IVector3 } from '@Engine/Wrappers/Vector3Wrapper';

import type { ICameraAccessors, IPerspectiveCamera } from '../Models';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<IPerspectiveCamera>): ICameraAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);

  return { setPosition, setCastShadow, setControls };
}
