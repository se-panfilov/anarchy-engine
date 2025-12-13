import type { AbstractWatcher } from '@Engine/Watchers';
import type { IMousePosition } from '@Engine/Models';

export type IMousePositionWatcher = ReturnType<typeof AbstractWatcher<IMousePosition>>;
