import type { Observable } from 'rxjs';

import type { LoaderType, TAbstractResourceConfig } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWriteable } from '@/Engine/Utils';

export type TAbstractLoader<T, C extends TAbstractResourceConfig> = Readonly<{
  id: string;
  type: LoaderType;
  loadAsync: (config: C, onLoaded?: (r: TWriteable<T>, params?: Record<string, any>) => T) => Promise<T>;
  loadFromConfigAsync: (configs: ReadonlyArray<C>) => Promise<ReadonlyArray<T>>;
  loaded$: Observable<T>;
}> &
  TDestroyable;
