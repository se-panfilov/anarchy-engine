import { BoxGeometry, Mesh, MeshToonMaterial, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Domains/Actor/Constants';
import type { IActorParams, IMesh } from '@/Engine/Domains/Actor/Models';

export function createActor(params: IActorParams): IMesh | never {
  if (params.type === ActorType.plane) return createPlane(params);
  if (params.type === ActorType.sphere) return createSphere(params);
  if (params.type === ActorType.cube) return createCube(params);
  throw new Error('Cannot create Actor: unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments, materialParams, rotation, position, castShadow }: IActorParams): IMesh {
  const plane = new Mesh(new PlaneGeometry(width, height, widthSegments, heightSegments), new MeshToonMaterial(materialParams));
  plane.rotation.set(rotation?.entity.x ?? -Math.PI / 2, rotation?.entity.y ?? 0, rotation?.entity.z ?? 0);
  // eslint-disable-next-line functional/immutable-data
  plane.receiveShadow = true;

  plane.position.set(position.entity.x, position.entity.y, position.entity.z);
  // eslint-disable-next-line functional/immutable-data
  plane.castShadow = castShadow;

  return plane;
}

function createSphere({ radius, widthSegments, heightSegments, materialParams, position, castShadow }: IActorParams): IMesh {
  // const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  const sphere = new Mesh(new SphereGeometry(radius, widthSegments, heightSegments), new MeshToonMaterial(materialParams));
  sphere.position.set(position.entity.x, position.entity.y, position.entity.z);
  // eslint-disable-next-line functional/immutable-data
  sphere.castShadow = castShadow;

  return sphere;
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments, materialParams, position, castShadow }: IActorParams): IMesh {
  // const sphere = new Mesh(new SphereGeometry(1, 32, 32), new MeshToonMaterial({ color: new Color('#5EDCAE') }));
  const sphere = new Mesh(new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments), new MeshToonMaterial(materialParams));
  sphere.position.set(position.entity.x, position.entity.y, position.entity.z);
  // eslint-disable-next-line functional/immutable-data
  sphere.castShadow = castShadow;

  return sphere;
}
