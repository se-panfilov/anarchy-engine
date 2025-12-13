import type { IMesh, IVector3 } from '@Engine/Models';
import type { IActorAccessors } from './Models';

export function getAccessors(entity: IMesh): IActorAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { setPosition, setCastShadow };
}
