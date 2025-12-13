import type { IMultitonWatcherWithState } from '@Engine/Domains/Abstract';

import type { IScreenSizeValues } from '../Models';

export type IScreenSizeWatcher = IMultitonWatcherWithState<IScreenSizeValues>;
