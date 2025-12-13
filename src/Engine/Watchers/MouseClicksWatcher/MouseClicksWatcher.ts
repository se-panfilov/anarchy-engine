import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IAbstractWatcher, IMouseClicksWatcher } from '@Engine/Watchers';
import { AbstractWatcher } from '@Engine/Watchers/AbstractWatcher/AbstractWatcher';
import { MouseClicksWatcherRegistry } from '@/Engine/Registries';

export function MouseClicksWatcher(container: IGlobalContainerDecorator, tags: ReadonlyArray<string> = []): IMouseClicksWatcher {
  // TODO (S.Panfilov) this check should be a part of a factory
  const containerIdTag: string = `container_id_${container.id}`;
  if (MouseClicksWatcherRegistry().getUniqByTag(containerIdTag)) throw new Error(`MouseClicksWatcher for container with id "${container.id}" is already existed`);
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
    containerId: container.id,
    start,
    stop
  };

  return result;
}
