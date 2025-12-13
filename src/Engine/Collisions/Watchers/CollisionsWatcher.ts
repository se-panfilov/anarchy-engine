import type { TAbstractWatcher } from '@/Engine/Abstract';
import { AbstractWatcher, WatcherType } from '@/Engine/Abstract';
import type { TActorWrapperAsync } from '@/Engine/Actor';
import type { TCollisionsWatcher } from '@/Engine/Collisions/Models';

export function CollisionsWatcher(actorW: TActorWrapperAsync): TCollisionsWatcher {
  const abstractWatcher: TAbstractWatcher<SomeEvent> = AbstractWatcher<SomeEvent>(WatcherType.CollisionsWatcher, name);

  function start(): TCollisionsWatcher {
    // TODO (S.Panfilov)
    return result;
  }

  function stop(): TCollisionsWatcher {
    // TODO (S.Panfilov)
    return result;
  }

  const result: TCollisionsWatcher = {
    ...abstractWatcher,
    key: actorW.id,
    start,
    stop
  };

  return result;
}
