import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';
import type { Loader } from 'three';

import type { LoaderType } from '@/Engine/Abstract/Constants';
import type { TAbstractLoader, TAbstractResourceConfig, TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function AbstractLoader<L extends Loader<any>, R extends TProtectedRegistry<TAbstractSimpleAsyncRegistry<T>>, T, C extends TAbstractResourceConfig>(
  loader: L,
  registry: R,
  type: LoaderType
): TAbstractLoader<T, C> {
  const loaded$: Subject<T> = new Subject<T>();
  const id: string = type + '_' + nanoid();

  function loadFromConfigAsync(configs: ReadonlyArray<C>): Promise<ReadonlyArray<T>> {
    return Promise.all(configs.map((config: C): Promise<T> => loadAsync(config)));
  }

  function loadAsync({ url, isForce, name, params }: C, onLoaded?: (r: TWriteable<T>, params?: Record<string, any>) => T): Promise<T> {
    if (!isForce) {
      const resource: T | undefined = registry.findByKey(name);
      if (isDefined(resource)) return Promise.resolve(resource);
    }

    return loader.loadAsync(url).then((loaded: TWriteable<T>): T => {
      const res: T = isDefined(onLoaded) ? onLoaded(loaded, params) : loaded;
      registry.add(name, res);
      loaded$.next(res);
      return res;
    });
  }

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
  });

  return {
    id,
    type,
    loadAsync,
    loadFromConfigAsync,
    loaded$,
    ...destroyable
  };
}
