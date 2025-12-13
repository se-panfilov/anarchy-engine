import type { IReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams } from '@/Engine/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Mouse/Watchers';

const factory: IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> = { ...ReactiveFactory(FactoryType.MousePositionWatcher, MousePositionWatcher) };
export const MousePositionWatcherFactory = (): IMousePositionWatcherFactory => ({ ...factory });
