import type { TWithActiveMixin } from '@/Mixins/Generics/Models';
import type { TWriteable } from '@/Utils';

export function withActiveMixin(): TWithActiveMixin {
  return {
    _isActive: false,
    _setActive: function (isActive: boolean, isFromService: boolean = false): void {
      if (!isFromService) throw new Error('This method should be called only from the service');
      // eslint-disable-next-line functional/immutable-data
      (this as TWriteable<TWithActiveMixin>)._isActive = isActive;
    },
    isActive(): boolean {
      return this._isActive;
    }
  };
}
