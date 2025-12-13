import type { AbstractWatcher } from '@Engine/Watchers';
import type { ScreenParams } from '@Engine/Models';

export type IDeviceWatcher = ReturnType<typeof AbstractWatcher<ScreenParams>>;
