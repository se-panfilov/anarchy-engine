import { nanoid } from 'nanoid';
import { Subject } from 'rxjs';
import type { Loader } from 'three';

import type { LoaderType } from '@/Engine/Abstract/Constants';
import type { TAbstractLoadedResourcePack, TAbstractLoader, TAbstractOnLoadFunction, TAbstractResourceConfig, TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined } from '@/Engine/Utils';

export function AbstractLoader<L extends Loader<any>, R extends TProtectedRegistry<TAbstractSimpleAsyncRegistry<T>>, T, C extends TAbstractResourceConfig>(
  loader: L,
  registry: R,
  type: LoaderType
): TAbstractLoader<T, C> {
  const loaded$: Subject<TAbstractLoadedResourcePack<T, C>> = new Subject<TAbstractLoadedResourcePack<T, C>>();
  const id: string = type + '_' + nanoid();
  let onLoadedFn: TAbstractOnLoadFunction<T> | undefined = undefined;

  const loadFromConfigAsync = (configs: ReadonlyArray<C>): Promise<ReadonlyArray<T>> => Promise.all(configs.map((config: C): Promise<T> => loadAsync(config)));

  function loadAsync(config: C): Promise<T> {
    const { url, isForce, name, options } = config;

    if (!isForce) {
      const resource: T | undefined = registry.findByKey(name);
      if (isDefined(resource)) return Promise.resolve(resource);
    }

    return loader.loadAsync(url).then((loaded: TWriteable<T>): T => {
      const res: T = isDefined(onLoadedFn) ? onLoadedFn(loaded, options) : loaded;
      registry.add(name, res);
      loaded$.next({ resource: res, options: config });
      return res;
    });
  }

  const loadListAsync = (packs: ReadonlyArray<C>): Promise<ReadonlyArray<T>> => Promise.all(packs.map((pack: C): Promise<T> => loadAsync(pack)));

  const setOnLoadedFn = (onLoaded: TAbstractOnLoadFunction<T>): void => void (onLoadedFn = onLoaded);

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    registry.destroy();
  });

  return {
    id,
    type,
    loadAsync,
    loadListAsync,
    loadFromConfigAsync,
    setOnLoadedFn,
    loaded$,
    ...destroyable
  };
}
