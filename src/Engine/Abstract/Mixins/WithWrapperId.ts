import type { IWithUserData, IWithWrapperId } from '@/Engine/Abstract/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function withWrapperId<T extends IWriteable<IWithUserData>>(entity: T): IWithWrapperId {
  function setWrapperId(id: string): void {
    // eslint-disable-next-line functional/immutable-data
    if (isNotDefined(entity.userData)) entity.userData = {};
    // eslint-disable-next-line functional/immutable-data
    entity.userData.wrapperId = id;
  }

  function getWrapperId(): string | undefined {
    return entity?.userData?.wrapperId as string | undefined;
  }

  return {
    setWrapperId,
    getWrapperId
  };
}
