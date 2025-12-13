import { BoxGeometry, Mesh, MeshToonMaterial, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { IActorParams, IMesh } from '@/Engine/Actor/Models';

export function createActor(params: IActorParams): IMesh | never {
  if (params.type === ActorType.plane) return createPlane(params);
  if (params.type === ActorType.sphere) return createSphere(params);
  if (params.type === ActorType.cube) return createCube(params);
  throw new Error('Cannot create Actor: unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments, materialParams }: IActorParams): IMesh {
  return new Mesh(new PlaneGeometry(width, height, widthSegments, heightSegments), new MeshToonMaterial(materialParams));
}

function createSphere({ radius, widthSegments, heightSegments, materialParams }: IActorParams): IMesh {
  return new Mesh(new SphereGeometry(radius, widthSegments, heightSegments), new MeshToonMaterial(materialParams));
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments, materialParams }: IActorParams): IMesh {
  return new Mesh(new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments), new MeshToonMaterial(materialParams));
}
