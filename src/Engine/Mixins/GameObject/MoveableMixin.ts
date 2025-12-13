import type { IMovable, IWithPosition } from '@/Engine/Mixins/GameObject/Models';
import type { IVector3Wrapper } from '@/Engine/Wrappers';
import { Vector3Wrapper } from '@/Engine/Wrappers';

export function moveableMixin(entity: IWithPosition): IMovable {
  const setPosition = (x: number, y: number, z: number): IVector3Wrapper => Vector3Wrapper(entity.position.set(x, y, z));
  // eslint-disable-next-line functional/immutable-data
  const setX = (x: number): number => (entity.position.x = x);
  // eslint-disable-next-line functional/immutable-data
  const setY = (y: number): number => (entity.position.y = y);
  // eslint-disable-next-line functional/immutable-data
  const setZ = (z: number): number => (entity.position.z = z);
  // eslint-disable-next-line functional/immutable-data
  const addX = (x: number): number => (entity.position.x += x);
  // eslint-disable-next-line functional/immutable-data
  const addY = (y: number): number => (entity.position.y += y);
  // eslint-disable-next-line functional/immutable-data
  const addZ = (z: number): number => (entity.position.z += z);

  return { setPosition, addX, addY, addZ, setX, setY, setZ };
}
