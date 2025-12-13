import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import { AbstractWatcher } from '@Engine/Domains/Abstract';
import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

import type { IMouseClicksWatcher } from '../Models';

export function MouseClicksWatcher(container: IGlobalContainerDecorator, tags: ReadonlyArray<string> = []): IMouseClicksWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcher<void> = AbstractWatcher('mouse_clicks', tags);
  const onMouseUpListener = (): void => abstractWatcher.value$.next();

  function start(): IMouseClicksWatcher {
    container.startWatch('mouseup', onMouseUpListener);
    return result;
  }

  function stop(): IMouseClicksWatcher {
    container.stopWatch('mouseup', onMouseUpListener);
    return result;
  }

  const result: IMouseClicksWatcher = {
    ...abstractWatcher,
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
