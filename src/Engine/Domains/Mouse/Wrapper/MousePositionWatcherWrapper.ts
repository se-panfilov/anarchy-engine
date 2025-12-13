import { AbstractWrapper } from '@Engine/Domains/Abstract';

import type { IMousePositionWatcher, IMousePositionWatcherParams, IMousePositionWatcherWrapper } from '../Models';
import { createMousePositionWatcher } from './MousePositionWatcherUtils';
import { getAccessors } from '@Engine/Domains/Actor/Wrapper/Accessors';

export function MousePositionWatcherWrapper(params: IMousePositionWatcherParams): IMousePositionWatcherWrapper {
  const entity: IMousePositionWatcher = createMousePositionWatcher(params);
  return { ...AbstractWrapper(entity, params), ...getAccessors(entity), entity };
}
