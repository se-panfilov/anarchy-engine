import type { TFsmInstanceRegistry, TFsmParams, TFsmSource, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TWithFactoryService } from '@/Engine/Space';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmService = TWithFactoryService<TFsmInstanceFactory> &
  Readonly<{
    create: (params: TFsmParams, force?: boolean) => TFsmWrapper | never;
    createInstanceBySourceName: (sourceName: string) => TFsmWrapper | never;
    createSource: (source: TFsmParams) => TFsmSource;
    createSourceFromConfig: (fsm: ReadonlyArray<TFsmParams>) => ReadonlyArray<TFsmSource>;
    createInstance: (source: TFsmSource) => TFsmWrapper;
    getSourceRegistry: () => TFsmSourceRegistry;
    getInstanceRegistry: () => TFsmInstanceRegistry;
  }> &
  TDestroyable;
