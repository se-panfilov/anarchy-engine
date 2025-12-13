import type { TCreateEntityFactoryFn, TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { loopService }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, loopService);

const factory: TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams> = {
  ...ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher as TCreateEntityFactoryFn<TMousePositionWatcher, TMousePositionWatcherParams>)
};
export const MousePositionWatcherFactory = (): TMousePositionWatcherFactory => ({ ...factory });
