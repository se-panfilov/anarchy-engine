import { WatcherTag } from '@/Engine/Abstract';
import { ambientContext } from '@/Engine/Context';
import type { IGlobalContainerDecorator } from '@/Engine/Global';
import { MouseClickWatcherFactory, MousePositionWatcherFactory } from '@/Engine/Mouse/Factory';
import type {
  IMouseClickWatcher,
  IMouseClickWatcherFactory,
  IMouseClickWatcherRegistry,
  IMousePositionWatcher,
  IMousePositionWatcherFactory,
  IMousePositionWatcherRegistry,
  IMouseService
} from '@/Engine/Mouse/Models';
import { MouseClickWatcherRegistry, MousePositionWatcherRegistry } from '@/Engine/Mouse/Registry';

export function MouseService(container: IGlobalContainerDecorator): IMouseService {
  const mouseClickWatcherFactory: IMouseClickWatcherFactory = MouseClickWatcherFactory();
  const mouseClickWatcherRegistry: IMouseClickWatcherRegistry = MouseClickWatcherRegistry();
  mouseClickWatcherFactory.entityCreated$.subscribe((watcher: IMouseClickWatcher) => mouseClickWatcherRegistry.add(watcher));
  const mouseClickWatcher: IMouseClickWatcher = mouseClickWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

  const mousePositionWatcherFactory: IMousePositionWatcherFactory = MousePositionWatcherFactory();
  const mousePositionWatcherRegistry: IMousePositionWatcherRegistry = MousePositionWatcherRegistry();

  mousePositionWatcherFactory.entityCreated$.subscribe((watcher: IMousePositionWatcher) => mousePositionWatcherRegistry.add(watcher));
  const mousePositionWatcher: IMousePositionWatcher = mousePositionWatcherFactory.create({ container, tags: [WatcherTag.Initial, WatcherTag.Global] }).start();

  return {
    click$: mouseClickWatcher.value$,
    position$: mousePositionWatcher.value$
    // doubleClick$: mouseClickWatcher.doubleClick$,
    // wheel$: mouseClickWatcher.wheel$,
    // pressed$: mouseClickWatcher.pressed$,
    // drag$: mouseClickWatcher.drag$,
  };
}

export const mouseService: IMouseService = MouseService(ambientContext.container);
