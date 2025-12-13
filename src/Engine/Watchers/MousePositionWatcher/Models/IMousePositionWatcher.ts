import type { AbstractWatcher } from '@Engine/Watchers';
import type { MousePosition } from '@Engine/Models';

export type IMousePositionWatcher = ReturnType<typeof AbstractWatcher<MousePosition>>;
