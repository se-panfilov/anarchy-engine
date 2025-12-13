import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IAbstractWatcher, IMouseClicksWatcher } from '@Engine/Watchers';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';

export function MouseClicksWatcher(container: IGlobalContainerDecorator, tags: ReadonlyArray<string> = []): IMouseClicksWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcher<void> = AbstractWatcher('mouse_clicks', [...tags, containerIdTag]);
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
    key: container.id,
    start,
    stop
  };

  return result;
}
