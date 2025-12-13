import type { AbstractWatcher } from '@Engine/Watchers';
import type { IScreenParams } from '@Engine/Models';

export type IScreenSizeWatcher = ReturnType<typeof AbstractWatcher<IScreenParams>>;
