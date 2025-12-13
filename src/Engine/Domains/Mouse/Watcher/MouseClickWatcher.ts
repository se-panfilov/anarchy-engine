import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import { AbstractWatcher } from '@Engine/Domains/Abstract';
import type { IMouseClickWatcher, IMouseClickWatcherParams } from '@Engine/Domains/Mouse/Models';

export function MouseClickWatcher({ container, tags = [] }: IMouseClickWatcherParams): IMouseClickWatcher {
  const containerIdTag: string = `container_id_${container.id}`;
  const abstractWatcher: IAbstractWatcher<void> = AbstractWatcher('mouse_clicks', tags);
  const onMouseUpListener = (): void => abstractWatcher.value$.next();

  function start(): IMouseClickWatcher {
    container.startWatch('mouseup', onMouseUpListener);
    return result;
  }

  function stop(): IMouseClickWatcher {
    container.stopWatch('mouseup', onMouseUpListener);
    return result;
  }

  const result: IMouseClickWatcher = {
    ...abstractWatcher,
    key: containerIdTag,
    start,
    stop
  };

  return result;
}
