import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Abstract';
import type { FsmEventsStrategy } from '@/Fsm/Constants';
import type { TFsmConfig, TFsmInstanceRegistry, TFsmParams, TFsmSource, TFsmStates, TFsmWrapper } from '@/Fsm/Models';
import type { TWithFactoryService } from '@/Mixins';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmServiceWithFactory = TWithFactoryService<TFsmWrapper, TFsmParams, undefined, TFsmInstanceFactory>;

export type TFsmService = TSerializableEntitiesService<TFsmWrapper, TFsmConfig> &
  TSerializableResourceService<TFsmConfig> &
  TFsmServiceWithFactory &
  Readonly<{
    create: (params: TFsmParams, force?: boolean) => TFsmWrapper | never;
    createFromList: (params: ReadonlyArray<TFsmParams>, force?: boolean) => ReadonlyArray<TFsmWrapper>;
    createInstance: (source: TFsmSource) => TFsmWrapper;
    createInstanceBySourceName: (sourceName: string, currentState?: TFsmStates, strategy?: FsmEventsStrategy) => TFsmWrapper;
    createInstanceFromList: (source: ReadonlyArray<TFsmSource>) => ReadonlyArray<TFsmWrapper>;
    createSource: (source: TFsmParams) => TFsmSource;
    createSourceFromConfig: (fsm: ReadonlyArray<TFsmConfig>) => ReadonlyArray<TFsmSource>;
    createSourceFromList: (source: ReadonlyArray<TFsmParams>) => ReadonlyArray<TFsmSource>;
    getInstanceRegistry: () => TFsmInstanceRegistry;
    getSourceRegistry: () => TFsmSourceRegistry;
  }>;
