import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TPhysicsBodyFacade, TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import { isPhysicsBodyParamsComplete } from '@/Engine/Physics';
import type { TMesh } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function createActorMesh(params: TActorParams, { materialTextureService }: Pick<TActorDependencies, 'materialTextureService'>): Promise<TMesh> | never {
  // TODO (S.Panfilov) AWAIT: could speed up by not awaiting material loading (return promise of an actor)
  const materialWrapper: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  if (params.type === ActorType.Plane) return createPlane(params, materialWrapper.entity);
  if (params.type === ActorType.Sphere) return createSphere(params, materialWrapper.entity);
  if (params.type === ActorType.Cube) return createCube(params, materialWrapper.entity);

  throw new Error('Cannot create Actor: unknown actor type');
}

function createPlane({ width, height, widthSegments, heightSegments }: TActorParams, material: TMaterials): TMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: TActorParams, material: TMaterials): TMesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TActorParams, material: TMaterials): TMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
  return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
}

export function createPhysicsBody(physics: TWithPresetNamePhysicsBodyParams, { physicsBodyService }: Pick<TActorDependencies, 'physicsBodyService'>): TPhysicsBodyFacade {
  const { presetName, ...rest } = physics;
  if (isDefined(presetName)) return physicsBodyService.createWithPresetName(physics, presetName);
  if (!isPhysicsBodyParamsComplete(rest))
    throw new Error('Cannot create physics body: params are lacking of mandatory fields (mandatory fields must be set or a preset with such fields must be provided)');
  return physicsBodyService.create(rest);
}
