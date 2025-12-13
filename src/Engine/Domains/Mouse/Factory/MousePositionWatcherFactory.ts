import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import { MousePositionWatcher } from '@/Engine/Domains/Mouse/Watcher';

import type { IMousePositionWatcher, IMousePositionWatcherFactory, IMousePositionWatcherParams } from '../Models';

// TODO (S.Panfilov) no more auto-registration
const factory: IReactiveFactory<IMousePositionWatcher, IMousePositionWatcherParams> = { ...ReactiveFactory('mouse_position_watcher', MousePositionWatcher) };
export const MousePositionWatcherFactory = (): IMousePositionWatcherFactory => ({ ...factory });
