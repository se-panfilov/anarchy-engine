import { Mesh, MeshToonMaterial, PlaneGeometry, SphereGeometry } from 'three';
import { Subject } from 'rxjs';
import { nanoid } from 'nanoid';
import type { WrappedActor } from '@Engine/Actor/Models/WrappedActor';
import type { ActorParams } from '@Engine/Actor/Models/ActorParams';

export function ActorWrapper(params: ActorParams): WrappedActor {
  let actor: Mesh = createActor(params);
  const destroyed$ = new Subject<void>();

  function destroy() {
    actor = undefined as any;
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `actor_wrapper_${nanoid()}`, actor, destroy, destroyed$ };
}

function createActor(params: ActorParams): Mesh {
  if (params.type === 'plane') return createPlane(params);
  if (params.type === 'sphere') return createSphere(params);
  throw new Error('Unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments, materialParams }: ActorParams): Mesh {
  // const plane = new Mesh(new PlaneGeometry(10, 10, 10, 10), new MeshToonMaterial({ color: '#444' }));
  const plane = new Mesh(
    new PlaneGeometry(width, height, widthSegments, heightSegments),
    new MeshToonMaterial(materialParams)
  );
  plane.rotation.set(-Math.PI / 2, 0, 0);
  plane.receiveShadow = true;

  return plane;
}

function createSphere({ radius, widthSegments, heightSegments, materialParams }: ActorParams): Mesh {
  // const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  const sphere = new Mesh(
    new SphereGeometry(radius, widthSegments, heightSegments),
    new MeshToonMaterial(materialParams)
  );
  sphere.position.set(0, 2, 0);
  sphere.castShadow = true;

  return sphere;
}
