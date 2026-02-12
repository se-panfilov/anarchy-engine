import type { LoaderType } from '@Anarchy/Engine/Abstract/Constants';
import type { TDestroyable, TNoSpread, TWithId } from '@Anarchy/Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TAbstractLoadedResourcePack } from './TAbstractLoadedResourcePack';
import type { TAbstractOnLoadFunction } from './TAbstractOnLoadFunction';
import type { TAbstractResourceAsyncRegistry } from './TAbstractResourceAsyncRegistry';
import type { TAbstractResourceConfig } from './TAbstractResourceConfig';
import type { TAbstractSimpleRegistry } from './TAbstractSimpleRegistry';

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
