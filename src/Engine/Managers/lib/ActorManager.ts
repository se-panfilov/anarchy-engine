import { BehaviorSubject, Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { Manager } from '../Models/Manager';
import { Color, Mesh, MeshToonMaterial, SphereGeometry } from 'three';

export function ActorManager(): Manager {
  const destroyed$ = new Subject<void>();
  const actors$ = new BehaviorSubject<WrappedActor>();

  function addActor() {
    const actor = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
    actor.position.set(0, 2, 0);
    actor.castShadow = true;
  }

  function destroy() {
    actors$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `actor_manager_${nanoid()}`, addActor, destroy, destroyed$ };
}
