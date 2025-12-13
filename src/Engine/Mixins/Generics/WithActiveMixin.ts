import type { IWithActiveMixin } from '@/Engine/Mixins/Generics/Models';
import type { IWriteable } from '@/Engine/Utils';

export function withActiveMixin(): IWithActiveMixin {
  return {
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
}
