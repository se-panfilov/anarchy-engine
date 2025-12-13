import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { TActorDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TPhysicsPresetParams, TPhysicsService, TWithPhysicsPresetParams } from '@/Engine/Physics';
import type { TMesh } from '@/Engine/ThreeLib';
import { isDefined } from '@/Engine/Utils';

export async function createActor(params: TActorParams, { materialTextureService, physicsService }: TActorDependencies): Promise<TMesh> | never {
  const materialWrapper: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  if (params.type === ActorType.plane) return createPlane(params, materialWrapper.entity);
  if (params.type === ActorType.sphere) return createSphere(params, materialWrapper.entity);
  if (params.type === ActorType.cube) return createCube(params, materialWrapper.entity);

  if (isDefined(params.physics) && Object.keys(params.physics).length > 0) buildPhysics(params.physics, physicsService);

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

// TODO (S.Panfilov) CWP use createActor in createAsync and createFromConfig
function buildPhysics(physics: TWithPhysicsPresetParams, physicsService: TPhysicsService): void {
  // TODO (S.Panfilov) build physics presets from Physics domain, add them to the registry.
  // access here those presets and merge with instance physics params
  const presetParams: TPhysicsPresetParams = configToParamsPhysicsPreset(physics);
}
