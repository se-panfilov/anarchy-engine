import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics/Models';
import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';

// TODO 8.0.0. MODELS: This is a placeholder for PhysicsActorDrive
export function PhysicsActorDriver(params: TActorParams): TPhysicsActorDriver {
  const position$: BehaviorSubject<TReadonlyVector3> = new BehaviorSubject<TReadonlyVector3>(params.position);
  const rotation$: BehaviorSubject<TReadonlyEuler> = new BehaviorSubject<TReadonlyEuler>(params.rotation);
  const scale$: BehaviorSubject<TReadonlyVector3 | undefined> = new BehaviorSubject<TReadonlyVector3 | undefined>(params.scale);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    //Stop subscriptions
    destroySub$.unsubscribe();

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
