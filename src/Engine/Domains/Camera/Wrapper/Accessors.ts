import type { IWriteable } from '@Engine/Utils';

import type { IEulerWrapper, IVector3Wrapper } from '@/Engine/Wrappers';
import { EulerWrapper, Vector3Wrapper } from '@/Engine/Wrappers';

import type { ICameraAccessors, IPerspectiveCamera } from '../Models';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<IPerspectiveCamera>): ICameraAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));
  const setRotation = (x: number, y: number, z: number): IEulerWrapper => EulerWrapper(entity.rotation.set(x, y, z));
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));

  return { setPosition, setRotation, setCastShadow, setControls };
}
