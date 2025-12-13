import type { IActive, IWithActive } from '@/Engine/Mixins/Generic/Models';
import type { IWriteable } from '@/Engine/Utils';

export function adjustWthActive<T>(entity: T, isActive: boolean): T & IWithActive {
  // eslint-disable-next-line functional/immutable-data
  (entity as IWriteable<IActive>).isActive = isActive;

  // eslint-disable-next-line functional/immutable-data
  (entity as { _setActive: any })._setActive = (isActive: boolean, isFromService: boolean = false): void => {
    if (!isFromService) throw new Error('This method should be called only from the service');
    // eslint-disable-next-line functional/immutable-data
    (entity as IWriteable<IActive>).isActive = isActive;
  };

  return entity as IWithActive & T;
}
