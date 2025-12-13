import type { Subscription } from 'rxjs';

import type {
  TFsmInstanceFactory,
  TFsmInstanceRegistry,
  TFsmInstanceService,
  TFsmService,
  TFsmSource,
  TFsmSourceFactory,
  TFsmSourceRegistry,
  TFsmSourceService,
  TFsmWrapper
} from '@/Engine/Fsm/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { isNotDefined } from '@/Engine/Utils';

import { FsmInstanceService } from './FsmInstanceService';
import { FsmSourceService } from './FsmSourceService';

export function FsmService(instanceFactory: TFsmInstanceFactory, sourceFactory: TFsmSourceFactory, instanceRegistry: TFsmInstanceRegistry, sourceRegistry: TFsmSourceRegistry): TFsmService {
  const sourceService: TFsmSourceService = FsmSourceService(sourceFactory, sourceRegistry);
  const instanceService: TFsmInstanceService = FsmInstanceService(instanceFactory, instanceRegistry);

  function createInstanceBySourceName(sourceName: string): TFsmWrapper | never {
    const source: TFsmSource | undefined = sourceService.getRegistry().findByKey(sourceName);
    if (isNotDefined(source)) throw new Error(`FsmService. Can't create a fsm instance by a source name "${sourceName}": fsm source not found`);
    return instanceService.create(source);
  }

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    sourceService.destroy$.next();
    instanceService.destroy$.next();
  });

  return {
    createInstanceBySourceName,
    createSource: sourceService.create,
    createSourceFromConfig: sourceService.createFromConfig,
    createInstance: instanceService.create,
    getSourceRegistry: (): TFsmSourceRegistry => sourceRegistry,
    getInstanceRegistry: (): TFsmInstanceRegistry => instanceRegistry,
    getFactory: (): TFsmInstanceFactory => instanceFactory,
    ...destroyable
  };
}
