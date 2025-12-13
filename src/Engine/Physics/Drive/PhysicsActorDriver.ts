import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import type { Vector3 } from 'three';
import { Quaternion } from 'three';

import type { ActorDriver, TActorParams } from '@/Engine/Actor';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TPhysicsActorDriver } from '@/Engine/Physics/Models';

// TODO 8.0.0. MODELS: This is a placeholder for PhysicsActorDrive
export function PhysicsActorDriver(params: TActorParams, drive$: BehaviorSubject<ActorDriver>): TPhysicsActorDriver {
  const position$: BehaviorSubject<Vector3> = new BehaviorSubject<Vector3>(params.position);
  const rotation$: BehaviorSubject<Quaternion> = new BehaviorSubject<Quaternion>(new Quaternion().setFromEuler(params.rotation));
  const scale$: BehaviorSubject<Vector3 | undefined> = new BehaviorSubject<Vector3 | undefined>(params.scale);

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    //Complete subjects
    position$.complete();
    position$.unsubscribe();
    rotation$.complete();
    rotation$.unsubscribe();
    destroyable.destroy$.complete();
    destroyable.destroy$.unsubscribe();
  });

  const result = {
    ...destroyable,
    position$: position$.asObservable(),
    rotation$: rotation$.asObservable(),
    scale$: scale$.asObservable()
  };

  return result;
}
