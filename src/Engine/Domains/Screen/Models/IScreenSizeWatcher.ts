import type { IMultitonWatcherWithState } from '@Engine/Domains/Abstract';

import type { IScreenSizeValues } from '@/Engine/Domains/Screen/Models';

export type IScreenSizeWatcher = IMultitonWatcherWithState<IScreenSizeValues>;
