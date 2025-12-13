import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { ActorDriver, TActorParams } from '@/Engine/Actor';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics/Models';

// TODO 8.0.0. MODELS: This is a placeholder for PhysicsActorDrive
export function PhysicsActorDriver(params: TActorParams, drive$: BehaviorSubject<ActorDriver>): TPhysicsActorDriver {
  // TODO 8.0.0. MODELS: fix isAutoUpdate
  // let _isAutoUpdate: boolean = (params.physics?.isAutoUpdate && drive$.value === ActorDriver.Physical) ?? false;
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Euler> = new BehaviorSubject<Euler>(params.rotation);
  const scale$: BehaviorSubject<Vector3 | undefined> = new BehaviorSubject<Vector3 | undefined>(params.scale);

  // TODO 8.0.0. MODELS: fix isAutoUpdate
  // const driveSubscription$: Subscription = drive$.subscribe((drive: ActorDriver): void => void (_isAutoUpdate = !!(drive === ActorDriver.Physical && params.physics?.isAutoUpdate)));
  const driveSubscription$: Subscription = drive$.subscribe((drive: ActorDriver): void => console.log('Drive in physical driver is: ', drive));

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();
    driveSubscription$.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  const driver = {
    ...destroyable,
    position$,
    rotation$,
    scale$
  };

  return driver;
}
