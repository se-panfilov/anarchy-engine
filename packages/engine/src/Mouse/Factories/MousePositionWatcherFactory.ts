import { FactoryType, ReactiveFactory } from '@/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Mouse/Models';
import { MousePositionWatcher } from '@/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { mouseLoop }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, mouseLoop);

export function MousePositionWatcherFactory(): TMousePositionWatcherFactory {
  return ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher);
}
