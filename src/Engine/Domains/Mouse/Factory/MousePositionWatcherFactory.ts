import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams } from '@/Engine/Domains/Mouse/Models';
import { MousePositionWatcher } from '@/Engine/Domains/Mouse/Watcher';

const factory: IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> = { ...ReactiveFactory(FactoryType.MousePositionWatcher, MousePositionWatcher) };
export const MousePositionWatcherFactory = (): IMousePositionWatcherFactory => ({ ...factory });
