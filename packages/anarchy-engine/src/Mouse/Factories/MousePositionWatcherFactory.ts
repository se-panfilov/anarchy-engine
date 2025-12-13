import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherDependencies, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@Anarchy/Engine/Mouse/Models';
import { MousePositionWatcher } from '@Anarchy/Engine/Mouse/Watchers';

const createMousePositionWatcher = (params: TMousePositionWatcherParams, { mouseLoop }: TMousePositionWatcherDependencies): TMousePositionWatcher => MousePositionWatcher(params, mouseLoop);

export function MousePositionWatcherFactory(): TMousePositionWatcherFactory {
  return ReactiveFactory(FactoryType.MousePositionWatcher, createMousePositionWatcher);
}
