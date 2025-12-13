import { Subject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsLoopService } from '@/Engine/Physics/Models';

export function PhysicsLoopService(): TPhysicsLoopService {
  const tick$: Subject<number> = new Subject<number>();
  const state: { isLooping: boolean } = { isLooping: false };

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe((): void => {
    tick$.complete();
  });

  return {
    start: (): void => {
      // eslint-disable-next-line functional/immutable-data
      state.isLooping = true;
      // requestAnimationFrame(loopFn);
    },
    stop: (): void => {
      // eslint-disable-next-line functional/immutable-data
      state.isLooping = false;
    },
    tick$: tick$.asObservable(),
    isLooping: (): boolean => state.isLooping,
    ...destroyable
  };
}
