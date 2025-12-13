import { AbstractWrapper } from '@Engine/Domains/Abstract';
import { getAccessors } from '@Engine/Domains/Mouse/Wrapper/Accessors';

import type { IMousePositionWatcher, IMousePositionWatcherParams, IMousePositionWatcherWrapper } from '../Models';
import { createMousePositionWatcher } from './MousePositionWatcherUtils';

export function MousePositionWatcherWrapper(params: IMousePositionWatcherParams): IMousePositionWatcherWrapper {
  const entity: IMousePositionWatcher = createMousePositionWatcher(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
