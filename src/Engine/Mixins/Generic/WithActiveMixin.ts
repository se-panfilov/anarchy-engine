import type { IWithActive } from '@/Engine/Mixins/Generic/Models';
import type { IWriteable } from '@/Engine/Utils';

// export function adjustWthActive<T extends Record<string, any>>(this: T, isActive: boolean): T & IWithActive {
//   // eslint-disable-next-line functional/immutable-data
//   (this as T & IWriteable<IActive>).isActive = isActive;
//
//   // eslint-disable-next-line functional/immutable-data
//   (this as T & IWriteable<IWithActive>)._setActive = (isActive: boolean, isFromService: boolean = false): void => {
//     if (!isFromService) throw new Error('This method should be called only from the service');
//     // eslint-disable-next-line functional/immutable-data
//     (this as T & IWriteable<IActive>).isActive = isActive;
//   };
//
//   return this as T & IWithActive;
// }

export const withActiveMixin: IWithActive = {
  _isActive: false,
  _setActive: function (isActive: boolean, isFromService: boolean = false): void {
    if (!isFromService) throw new Error('This method should be called only from the service');
    // eslint-disable-next-line functional/immutable-data
    (this as IWriteable<IWithActive>)._isActive = isActive;
  },
  isActive(): boolean {
    return this._isActive;
  }
};
