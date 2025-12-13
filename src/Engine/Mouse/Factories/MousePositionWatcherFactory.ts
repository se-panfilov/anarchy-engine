import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { TMousePositionWatcher, TMousePositionWatcherFactory, TMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const factory: TReactiveFactory<TMousePositionWatcher, TMousePositionWatcherParams> = { ...ReactiveFactory(FactoryType.MousePositionWatcher, MousePositionWatcher) };
export const MousePositionWatcherFactory = (): TMousePositionWatcherFactory => ({ ...factory });
