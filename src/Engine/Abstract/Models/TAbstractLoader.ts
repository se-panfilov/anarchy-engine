import type { Observable } from 'rxjs';

import type { LoaderType, TAbstractLoadedResourcePack, TAbstractOnLoadFunction, TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TDestroyable, TWithId } from '@/Engine/Mixins';

export type TAbstractLoader<T, C extends TAbstractResourceConfig> = Readonly<{
  type: LoaderType;
  loadAsync: (config: C) => Promise<T>;
  loadListAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
  loadFromConfigAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
  setOnLoadedFn: (onLoaded: TAbstractOnLoadFunction<T, C['options']>, options?: C['options']) => void;
  loaded$: Observable<TAbstractLoadedResourcePack<T, C>>;
}> &
  TWithId &
  TDestroyable;
