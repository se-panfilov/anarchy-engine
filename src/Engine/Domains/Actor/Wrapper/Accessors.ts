import type { IActorAccessors, IMesh } from '@Engine/Domains/Actor';
import type { Writeable } from '@Engine/Utils';

import type { IVector3 } from '@/Engine/Wrappers/Vector3Wrapper';

// eslint-disable-next-line
export function getAccessors(entity: Writeable<IMesh>): IActorAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { setPosition, setCastShadow };
}
