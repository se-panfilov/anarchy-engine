import { BehaviorSubject } from 'rxjs';

import type { TAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { TRegistrable, TWithActiveMixin, TWithActiveMixinResult } from '@/Engine/Mixins/Generics/Models';
import { setActiveWrappedEntity } from '@/Engine/Utils';

export function withActiveEntityServiceMixin<W extends TWithActiveMixin & TRegistrable>(registry: TAbstractEntityRegistry<W>): TWithActiveMixinResult<W> {
  const active$: BehaviorSubject<W | undefined> = new BehaviorSubject<W | undefined>(undefined);

  function setActive(id: string): void {
    const active: W = setActiveWrappedEntity(registry, id);
    active$.next(active);
  }

  const findActive = (): W | undefined => active$.value;

  return {
    setActive,
    findActive,
    getActive: (): W | never => {
      const active: W | undefined = active$.value;
      if (active === undefined) throw new Error('[withActiveEntityServiceMixin]: No active entity found');
      return active;
    },
    active$
  };
}
