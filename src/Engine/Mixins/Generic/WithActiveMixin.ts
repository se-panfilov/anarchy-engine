import type { IWithActiveMixin } from '@/Engine/Mixins/Generic/Models';
import type { IWriteable } from '@/Engine/Utils';

export const withActiveMixin: IWithActiveMixin = {
  _isActive: false,
  _setActive: function (isActive: boolean, isFromService: boolean = false): void {
    if (!isFromService) throw new Error('This method should be called only from the service');
    // eslint-disable-next-line functional/immutable-data
    (this as IWriteable<IWithActiveMixin>)._isActive = isActive;
  },
  isActive(): boolean {
    return this._isActive;
  }
};
