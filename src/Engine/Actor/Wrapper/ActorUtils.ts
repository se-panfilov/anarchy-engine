import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { IActorParams } from '@/Engine/Actor/Models';
import type { IMaterialService, IMaterialWrapperAsync } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { IMesh } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function createActor(params: IActorParams, materialService: IMaterialService): Promise<IMesh> | never {
  const materialWrapper: IMaterialWrapperAsync = await materialService.createAsync(params.material);

  if (params.type === ActorType.plane) return createPlane(params, materialWrapper);
  if (params.type === ActorType.sphere) return createSphere(params, materialWrapper);
  if (params.type === ActorType.cube) return createCube(params, materialWrapper);
  throw new Error('Cannot create Actor: unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments }: IActorParams, materialWrapper: IMaterialWrapper): IMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), materialWrapper.entity);
}

function createSphere({ radius, widthSegments, heightSegments }: IActorParams, materialWrapper: IMaterialWrapper): IMesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), materialWrapper.entity);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: IActorParams, materialWrapper: IMaterialWrapper): IMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new BoxGeometry(w, h, depth, widthSegments, heightSegments, depthSegments), materialWrapper.entity);
}
