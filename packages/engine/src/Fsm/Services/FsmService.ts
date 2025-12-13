import type { TAbstractService } from '@Engine/Abstract';
import { AbstractService } from '@Engine/Abstract';
import type { FsmEventsStrategy } from '@Engine/Fsm/Constants';
import type {
  TFsmConfig,
  TFsmInstanceFactory,
  TFsmInstanceRegistry,
  TFsmInstanceService,
  TFsmParams,
  TFsmService,
  TFsmSource,
  TFsmSourceFactory,
  TFsmSourceRegistry,
  TFsmSourceService,
  TFsmStates,
  TFsmWrapper
} from '@Engine/Fsm/Models';
import type { TDisposable } from '@Engine/Mixins';
import { isDefined } from '@Engine/Utils';
import { isEqual } from 'lodash-es';

import { FsmInstanceService } from './FsmInstanceService';
import { FsmSourceService } from './FsmSourceService';

export function FsmService(instanceFactory: TFsmInstanceFactory, sourceFactory: TFsmSourceFactory, instanceRegistry: TFsmInstanceRegistry, sourceRegistry: TFsmSourceRegistry): TFsmService {
  const sourceService: TFsmSourceService = FsmSourceService(sourceFactory, sourceRegistry);
  const instanceService: TFsmInstanceService = FsmInstanceService(instanceFactory, instanceRegistry);

  const disposable: ReadonlyArray<TDisposable> = [sourceFactory, instanceFactory, instanceRegistry, sourceRegistry, sourceService, instanceService];
  const abstractService: TAbstractService = AbstractService(disposable);

  function create(params: TFsmParams, force: boolean = false): TFsmWrapper | never {
    let source: TFsmSource | undefined = sourceService.getRegistry().findByKey(params.name);
    if (isDefined(source) && !force) {
      if (!isParamsEqualsToSource(params, source))
        throw new Error(
          `[FsmService]. Can't create a fsm instance with name ${params.name}: Source already existed, but params are different. Maybe an accident. (Params should be the same, or use "force" option)`
        );
      return instanceFactory.create(source, undefined);
    }
    source = sourceFactory.create(params, undefined);
    return instanceFactory.create(source, undefined);
  }

  function createFromList(paramsList: ReadonlyArray<TFsmParams>, force: boolean = false): ReadonlyArray<TFsmWrapper> {
    return paramsList.map((params: TFsmParams): TFsmWrapper => create(params, force));
  }

  function isParamsEqualsToSource(params: TFsmParams, source: TFsmSource): boolean {
    // eslint-disable-next-line @Enginetypescript-eslint/no-unused-vars
    const { id, tags, ...sourceParams } = source;
    return isEqual(params, sourceParams);
  }

  function createInstanceBySourceName(sourceName: string, currentState?: TFsmStates, strategy?: FsmEventsStrategy): TFsmWrapper {
    let source: TFsmSource | undefined = sourceService.getRegistry().getByKey(sourceName);
    if (isDefined(currentState)) source = { ...source, currentState };
    if (isDefined(strategy)) source = { ...source, strategy };
    return instanceService.create(source);
  }

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromList,
    createInstance: instanceService.create,
    createInstanceBySourceName,
    createInstanceFromList: instanceService.createFromList,
    createSource: sourceService.create,
    createSourceFromConfig: sourceService.createFromConfig,
    createSourceFromList: sourceService.createFromList,
    getFactory: (): TFsmInstanceFactory => instanceFactory,
    getInstanceRegistry: (): TFsmInstanceRegistry => instanceRegistry,
    getSourceRegistry: (): TFsmSourceRegistry => sourceRegistry,
    serializeAllEntities: (): ReadonlyArray<TFsmConfig> => instanceService.serializeAllEntities(),
    serializeAllResources: (): ReadonlyArray<TFsmConfig> => sourceService.serializeAllEntities(),
    serializeEntity: (entity: TFsmWrapper): TFsmConfig => instanceService.serializeEntity(entity)
  });
}
