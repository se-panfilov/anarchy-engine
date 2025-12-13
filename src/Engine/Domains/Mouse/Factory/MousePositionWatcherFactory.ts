import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { ReactiveFactory } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcherFactory, IMousePositionWatcherParams, IMousePositionWatcherWrapper } from '../Models';
import { MousePositionWatcherWrapper } from '../Wrapper';

// TODO (S.Panfilov) no more auto-registration
const factory: IReactiveFactory<IMousePositionWatcherWrapper, IMousePositionWatcherParams> = { ...ReactiveFactory('mouse_positions_watcher', MousePositionWatcherWrapper) };
export const MousePositionWatcherFactory = (): IMousePositionWatcherFactory => ({ ...factory });
