import type { IWriteable } from '@Engine/Utils';

import type { IMousePositionAccessors, IMousePositionWatcher } from '../Models';

export function getAccessors(entity: IWriteable<IMousePositionWatcher>): IMousePositionAccessors {
  function start(): IMousePositionWatcher {
    return entity.start();
  }

  function stop(): IMousePositionWatcher {
    return entity.stop();
  }

  return { start, stop };
}
