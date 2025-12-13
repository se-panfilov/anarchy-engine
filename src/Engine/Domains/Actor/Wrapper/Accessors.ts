import type { IWriteable } from '@Engine/Utils';

import type { IVector3 } from '@/Engine/Wrappers';

import type { IActorAccessors, IMesh } from '../Models';

// eslint-disable-next-line
export function getAccessors(entity: IWriteable<IMesh>): IActorAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.position.y = y);
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { setPosition, setX, setY, setZ, setCastShadow };
}
