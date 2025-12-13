import { BehaviorSubject } from 'rxjs';

import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IWithActiveMixinResult, TRegistrable, TWithActiveMixin } from '@/Engine/Mixins/Generics/Models';
import { setActiveWrappedEntity } from '@/Engine/Utils';

export function withActiveEntityServiceMixin<W extends TWithActiveMixin & TRegistrable>(registry: TProtectedRegistry<TAbstractEntityRegistry<W>>): IWithActiveMixinResult<W> {
  const active$: BehaviorSubject<W | undefined> = new BehaviorSubject<W | undefined>(undefined);

  function setActive(id: string): void {
    const active: W = setActiveWrappedEntity(registry, id);
    active$.next(active);
  }

  const findActive = (): W | undefined => active$.value;

  return {
    setActive,
    findActive,
    active$
  };
}
