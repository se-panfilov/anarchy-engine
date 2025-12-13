import type { LoaderType, TAbstractLoadedResourcePack, TAbstractOnLoadFunction, TAbstractResourceAsyncRegistry, TAbstractResourceConfig, TAbstractSimpleRegistry } from '@Anarchy/Engine/Abstract';
import type { TDestroyable, TNoSpread, TWithId } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

export type TAbstractLoader<T, RC extends TAbstractResourceConfig, R extends TAbstractResourceAsyncRegistry<T>, M extends TAbstractSimpleRegistry<RC>> = Readonly<{
  type: LoaderType;
  loadAsync: (config: RC) => Promise<T>;
  loadListAsync: (configs: ReadonlyArray<RC>) => Promise<ReadonlyArray<T>>;
  loadFromConfigAsync: (configs: ReadonlyArray<RC>) => Promise<ReadonlyArray<T>>;
  setOnLoadedFn: (onLoaded: TAbstractOnLoadFunction<T, RC['options']>, options?: RC['options']) => void;
  loaded$: Observable<TAbstractLoadedResourcePack<T, RC>>;
  getRegistry: () => R;
  getMetaInfoRegistry: () => M;
}> &
  TWithId &
  TDestroyable &
  TNoSpread;
