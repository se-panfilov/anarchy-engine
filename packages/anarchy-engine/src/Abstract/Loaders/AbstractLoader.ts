import type { LoaderType } from '@Anarchy/Engine/Abstract/Constants';
import type {
  TAbstractLoadedResourcePack,
  TAbstractLoader,
  TAbstractOnLoadFunction,
  TAbstractResourceAsyncRegistry,
  TAbstractResourceConfig,
  TAbstractSimpleRegistry
} from '@Anarchy/Engine/Abstract/Models';
import type { TDestroyable } from '@Anarchy/Engine/Mixins';
import { destroyableMixin } from '@Anarchy/Engine/Mixins';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import { nanoid } from 'nanoid';
import type { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import type { Loader } from 'three';

export function AbstractLoader<L extends Loader<any>, R extends TAbstractResourceAsyncRegistry<T>, T, M extends TAbstractSimpleRegistry<RC>, RC extends TAbstractResourceConfig>(
  loader: L,
  registry: R,
  metaInfoRegistry: M,
  type: LoaderType
): TAbstractLoader<T, RC, R, M> {
  const loaded$: Subject<TAbstractLoadedResourcePack<T, RC>> = new Subject<TAbstractLoadedResourcePack<T, RC>>();
  const id: string = type + '_' + nanoid();
  let onLoadedFn: TAbstractOnLoadFunction<T> | undefined = undefined;

  const loadFromConfigAsync = (configs: ReadonlyArray<RC>): Promise<ReadonlyArray<T>> => Promise.all(configs.map((config: RC): Promise<T> => loadAsync(config)));

  function loadAsync(config: RC, onProgress?: (event: ProgressEvent) => void): Promise<T> {
    const { url, isForce, name, options } = config;

    if (!isForce) {
      const resource: T | undefined = registry.findByKey(name);
      if (isDefined(resource)) return Promise.resolve(resource);
    }

    return loader.loadAsync(url, onProgress).then((loaded: TWriteable<T>): T => {
      const res: T = isDefined(onLoadedFn) ? onLoadedFn(loaded, options) : loaded;

      const resource: T | undefined = registry.findByKey(name);
      if (isNotDefined(resource)) registry.add(name, res);
      else registry.replace(name, res);

      const metaInfo: RC | undefined = metaInfoRegistry.findByKey(name);
      if (isNotDefined(metaInfo)) metaInfoRegistry.add(name, config);
      else metaInfoRegistry.replace(name, config);

      loaded$.next({ resource: res, options: config });
      return res;
    });
  }

  const loadListAsync = (packs: ReadonlyArray<RC>): Promise<ReadonlyArray<T>> => Promise.all(packs.map((pack: RC): Promise<T> => loadAsync(pack)));

  const setOnLoadedFn = (onLoaded: TAbstractOnLoadFunction<T>): void => void (onLoadedFn = onLoaded);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    (loader as any).clearCache?.();

    destroySub$.unsubscribe();
    loaded$.complete();

    registry.destroy$.next();
    metaInfoRegistry.destroy$.next();
  });

  return {
    id,
    type,
    loadAsync,
    loadListAsync,
    loadFromConfigAsync,
    setOnLoadedFn,
    getRegistry: (): R => registry,
    getMetaInfoRegistry: (): M => metaInfoRegistry,
    loaded$,
    ...destroyable
  };
}
