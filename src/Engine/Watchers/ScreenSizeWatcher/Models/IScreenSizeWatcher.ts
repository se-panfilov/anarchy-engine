import type { AbstractWatcher } from '@Engine/Watchers';
import type { ScreenParams } from '@Engine/Models';

export type IScreenSizeWatcher = ReturnType<typeof AbstractWatcher<ScreenParams>>;
