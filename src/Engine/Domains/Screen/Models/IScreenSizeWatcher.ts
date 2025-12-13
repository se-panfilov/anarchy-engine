import type { IScreenParams } from '../Models';
import type { IMultitonWatcherWithState } from '@Engine/Domains/Abstract';

export type IScreenSizeWatcher = IMultitonWatcherWithState<IScreenParams>;
