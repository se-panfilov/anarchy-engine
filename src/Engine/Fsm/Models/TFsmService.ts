import type { TSerializableEntitiesService, TSerializableResourceService } from '@/Engine/Abstract';
import type { FsmEventsStrategy } from '@/Engine/Fsm/Constants';
import type { TFsmConfig, TFsmInstanceRegistry, TFsmParams, TFsmSource, TFsmStates, TFsmWrapper } from '@/Engine/Fsm/Models';
import type { TWithFactoryService } from '@/Engine/Mixins';

import type { TFsmInstanceFactory } from './TFsmInstanceFactory';
import type { TFsmSourceRegistry } from './TFsmSourceRegistry';

export type TFsmServiceWithFactory = TWithFactoryService<TFsmWrapper, TFsmParams, undefined, TFsmInstanceFactory>;

// TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
export type TFsmService = TSerializableEntitiesService<TFsmConfig> &
  // TODO 15-0-0: Return type might be not TFsmConfig, but something else, check it
  TSerializableResourceService<TFsmConfig> &
  TFsmServiceWithFactory &
  Readonly<{
    create: (params: TFsmParams, force?: boolean) => TFsmWrapper | never;
    createFromList: (params: ReadonlyArray<TFsmParams>, force?: boolean) => ReadonlyArray<TFsmWrapper>;
    createInstanceBySourceName: (sourceName: string, currentState?: TFsmStates, strategy?: FsmEventsStrategy) => TFsmWrapper | never;
    createSource: (source: TFsmParams) => TFsmSource;
    createSourceFromList: (source: ReadonlyArray<TFsmParams>) => ReadonlyArray<TFsmSource>;
    createSourceFromConfig: (fsm: ReadonlyArray<TFsmConfig>) => ReadonlyArray<TFsmSource>;
    createInstance: (source: TFsmSource) => TFsmWrapper;
    createInstanceFromList: (source: ReadonlyArray<TFsmSource>) => ReadonlyArray<TFsmWrapper>;
    getSourceRegistry: () => TFsmSourceRegistry;
    getInstanceRegistry: () => TFsmInstanceRegistry;
  }>;
