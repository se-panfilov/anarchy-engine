import { ambientContext } from '@/Engine/Context';
import type { IMouseClickWatcher, IMousePositionWatcher, IMouseService } from '@/Engine/Mouse/Models';

export function MouseService(mousePositionWatcher: IMousePositionWatcher, mouseClickWatcher: IMouseClickWatcher): IMouseService {}

export const mouseService: IMouseService = MouseService(ambientContext.mousePositionWatcher, ambientContext.mouseClickWatcher);
