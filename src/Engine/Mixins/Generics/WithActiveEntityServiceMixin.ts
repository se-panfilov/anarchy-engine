import { BehaviorSubject } from 'rxjs';

import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract/Models';
import type { IRegistrable, IWithActiveMixin, IWithActiveMixinResult } from '@/Engine/Mixins/Generics/Models';
import { setActiveWrappedEntity } from '@/Engine/Utils';

export function withActiveEntityServiceMixin<W extends IWithActiveMixin & IRegistrable>(registry: IProtectedRegistry<IAbstractEntityRegistry<W>>): IWithActiveMixinResult<W> {
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
