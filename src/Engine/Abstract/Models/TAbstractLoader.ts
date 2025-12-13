import type { Observable } from 'rxjs';

import type { LoaderType, TAbstractOnLoadFunction, TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

export type TAbstractLoader<T, C extends TAbstractResourceConfig> = Readonly<{
  id: string;
  type: LoaderType;
  loadAsync: (config: C) => Promise<T>;
  loadListAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
  loadFromConfigAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
  setOnLoadedFn: (onLoaded: TAbstractOnLoadFunction<T>) => void;
  loaded$: Observable<T>;
}> &
  TDestroyable;
