import type { TDestroyable } from '@hellpig/anarchy-engine/Mixins/Generics/Models';
import { Subject } from 'rxjs';

export function destroyableMixin(): TDestroyable {
  return {
    destroy$: new Subject<void>()
  };
}
