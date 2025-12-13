import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { MousePositionWatcher } from '@/Engine/Domains/Mouse/Watcher';

import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams } from '../Models';

const factory: IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> = { ...ReactiveFactory(FactoryType.MousePositionWatcher, MousePositionWatcher) };
export const MousePositionWatcherFactory = (): IMousePositionWatcherFactory => ({ ...factory });
