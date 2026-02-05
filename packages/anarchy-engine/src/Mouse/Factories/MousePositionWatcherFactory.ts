import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@hellpig/anarchy-engine/Mouse/Models';
import { MousePositionWatcher } from '@hellpig/anarchy-engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { mouseLoop }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, mouseLoop);

export function MousePositionWatcherFactory(): TMousePositionWatcherFactory {
  return ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher);
}
