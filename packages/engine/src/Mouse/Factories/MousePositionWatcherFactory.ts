import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { mouseLoop }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, mouseLoop);

export function MousePositionWatcherFactory(): TMousePositionWatcherFactory {
  return ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher);
}
