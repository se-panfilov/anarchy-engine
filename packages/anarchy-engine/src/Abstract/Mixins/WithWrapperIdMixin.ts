import type { TWithUserData, TWithWrapperId } from '@Anarchy/Engine/Abstract/Models';
import type { TWriteable } from '@Shared/Utils';
import { isNotDefined } from '@Shared/Utils';

export function withWrapperIdMixin<T extends TWriteable<TWithUserData>>(entity: T): TWithWrapperId {
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

export function withNoWrapperIdMixin<T extends TWriteable<TWithUserData>>(entity: T): TWithWrapperId {
  function setWrapperId(id: string): void | never {
    throw new Error(`setWrapperId is not allowed for this entity (id: "${(entity as any).id}", wrapperId: "${id}")`);
  }

  function getWrapperId(): string | undefined | never {
    throw new Error(`getWrapperId is not allowed for this entity ("${(entity as any).id}")`);
  }

  return {
    setWrapperId,
    getWrapperId
  };
}
