import type { IMultitonWatcherWithState } from '@Engine/Domains/Abstract';

import type { IScreenParams } from '../Models';

export type IScreenSizeWatcher = IMultitonWatcherWithState<IScreenParams>;
