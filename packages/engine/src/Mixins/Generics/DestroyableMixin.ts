import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Mixins/Generics/Models';

export function destroyableMixin(): TDestroyable {
  return {
    destroy$: new Subject<void>()
  };
}
