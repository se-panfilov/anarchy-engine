import type { IWithUserData, IWithWrapperId } from '@/Engine/Abstract/Models';
import type { IWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function withWrapperIdMixin<T extends IWriteable<IWithUserData>>(entity: T): IWithWrapperId {
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

export function withNoWrapperIdMixin<T extends IWriteable<IWithUserData>>(entity: T): IWithWrapperId {
  function setWrapperId(id: string): void | never {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new Error(`setWrapperId is not allowed for this entity (id: "${(entity as any).id}", wrapperId: "${id}")`);
  }

  function getWrapperId(): string | undefined | never {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    throw new Error(`getWrapperId is not allowed for this entity ("${(entity as any).id}")`);
  }

  return {
    setWrapperId,
    getWrapperId
  };
}
