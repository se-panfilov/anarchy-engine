import type { IWithActive } from '@/Engine/Mixins/Generic/Models';

export function adjustWthActive<T>(entity: T, isActive: boolean): IWithActive<T> {
  // eslint-disable-next-line functional/immutable-data
  (entity as IWithActive<IWithActive<T>>).isActive = isActive;

  // eslint-disable-next-line functional/immutable-data
  (entity as IWithActive<IWithActive<T>>)._setActive = (isActive: boolean, isFromService: boolean = false): void => {
    if (!isFromService) throw new Error('This method should be called only from the service');
    // eslint-disable-next-line functional/immutable-data
    (entity as IWithActive<IWithActive<T>>).isActive = isActive;
  };

  return entity as IWithActive<T>;
}
