import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TPhysicsBodyFacade, TPhysicsPresetParams, TPhysicsPresetRegistry, TWithPhysicsPresetParams } from '@/Engine/Physics';
import type { TMesh } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export async function createActorMesh(params: TActorParams, { materialTextureService }: Pick<TActorDependencies, 'materialTextureService'>): Promise<TMesh> | never {
  // TODO (S.Panfilov) AWAIT: could speed up by not awaiting material loading (return promise of an actor)
  const materialWrapper: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  if (params.type === ActorType.plane) return createPlane(params, materialWrapper.entity);
  if (params.type === ActorType.sphere) return createSphere(params, materialWrapper.entity);
  if (params.type === ActorType.cube) return createCube(params, materialWrapper.entity);

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

export function createPhysicsBody(physics: TWithPhysicsPresetParams, { physicsService }: Pick<TActorDependencies, 'physicsService'>): TPhysicsBodyFacade {
  const { preset, ...rest } = physics;
  let presetFromRegistry: TPhysicsPresetParams | undefined;
  if (isDefined(preset)) {
    const physicsPresetRegistry: TPhysicsPresetRegistry = physicsService.getPresetRegistry();
    // TODO (S.Panfilov) findByKey?
    presetFromRegistry = physicsPresetRegistry.findByKey(preset);
    if (isNotDefined(presetFromRegistry)) throw new Error(`Physics preset not found: ${preset}`);
  }

  let fullParams: TPhysicsPresetParams = { ...rest };
  if (isDefined(presetFromRegistry)) fullParams = { ...fullParams, ...presetFromRegistry };

  // TODO (S.Panfilov) CWP here we build somehow (we need a factory and a registry),
  //  next we have to attach it to the actor and put to physics objects registry
  //  (and so to add to world, and use to update)
  const physicsObject = physicsService.create(fullParams);
  return physicsObject;
}
