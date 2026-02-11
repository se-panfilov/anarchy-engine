import type { TDestroyable } from '@Anarchy/Engine/Mixins/Generics/Models';
import { Subject } from 'rxjs';

export function destroyableMixin(): TDestroyable {
  return {
    destroy$: new Subject<void>()
  };
}
