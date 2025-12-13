import type { IActorAccessors, IMesh } from '@/Engine/Domains/Actor/Models';
import { moveableMixin, rotatableMixin } from '@/Engine/Mixins';
import type { IWriteable } from '@/Engine/Utils';

// eslint-disable-next-line
export function getAccessors(entity: IWriteable<IMesh>): IActorAccessors {
  // eslint-disable-next-line functional/immutable-data
  const setCastShadow = (value: boolean): boolean => (entity.castShadow = value);

  return { ...moveableMixin(entity), ...rotatableMixin(entity), setCastShadow };
}
