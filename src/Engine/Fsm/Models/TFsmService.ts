import type { TAbstractService } from '@/Engine/Abstract';
import type { TFsmConfig, TFsmInstanceRegistry, TFsmParams, TFsmSource, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TWithFactoryService } from '@/Engine/Mixins';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmService = TAbstractService &
  TWithFactoryService<TFsmInstanceFactory> &
  Readonly<{
    create: (params: TFsmParams, force?: boolean) => TFsmWrapper | never;
    createInstanceBySourceName: (sourceName: string) => TFsmWrapper | never;
    createSource: (source: TFsmParams) => TFsmSource;
    createSourceFromConfig: (fsm: ReadonlyArray<TFsmConfig>) => ReadonlyArray<TFsmSource>;
    createInstance: (source: TFsmSource) => TFsmWrapper;
    getSourceRegistry: () => TFsmSourceRegistry;
    getInstanceRegistry: () => TFsmInstanceRegistry;
  }>;
