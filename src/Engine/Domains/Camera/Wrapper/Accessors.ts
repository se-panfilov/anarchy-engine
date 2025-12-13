import type { IWriteable } from '@Engine/Utils';

import { moveableMixin, rotatableMixin } from '@/Engine/Domains/Mixins';
import type { IVector3Wrapper } from '@/Engine/Wrappers';
import { Vector3Wrapper } from '@/Engine/Wrappers';

import type { ICameraAccessors, IPerspectiveCamera } from '../Models';

// eslint-disable-next-line functional/prefer-immutable-types
export function getAccessors(entity: IWriteable<IPerspectiveCamera>): ICameraAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);
  const setControls = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));

  return { ...moveableMixin(entity), ...rotatableMixin(entity), setCastShadow, setControls };
}
