import type { IMesh } from '@Engine/Models';
import type { Writeable } from '@Engine/Utils';
import { IVector3 } from '@/Engine/Wrappers/Vector3Wrapper';

import type { IActorAccessors } from './Models';

// eslint-disable-next-line
export function getAccessors(entity: Writeable<IMesh>): IActorAccessors {
  const setPosition = (x: number, y: number, z: number): IVector3 => entity.position.set(x, y, z);
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { setPosition, setCastShadow };
}
