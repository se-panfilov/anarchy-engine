import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { loopService }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, loopService);

const factory: TReactiveFactoryWithDependencies<TMousePositionWatcher, TMousePositionWatcherParams, TMousePositionWatcherDependencies> = ReactiveFactoryWithDependencies(
  FactoryType.MousePositionWatcher,
  createMousePositionWatcher
);
export const MousePositionWatcherFactory = (): TMousePositionWatcherFactory => ({ ...factory });
