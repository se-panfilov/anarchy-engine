import type { IAbstractEntityWithWrapperId, IWithWrapperId } from '@/Engine/Abstract/Models';
import { isNotDefined } from '@/Engine/Utils';

export function withWrapperId<T extends { userData?: Record<string, any> }>(entity: T): IWithWrapperId {
  function setWrapperId(id: string): void {
    // eslint-disable-next-line functional/immutable-data
    if (isNotDefined(entity.userData)) entity.userData = {} as IAbstractEntityWithWrapperId;
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
