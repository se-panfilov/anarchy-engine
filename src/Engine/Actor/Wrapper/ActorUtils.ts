import type { Material } from 'three';
import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { IActorParams, IMesh } from '@/Engine/Actor/Models';
import { materialService } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import { textureService } from '@/Engine/Texture';
import { isDefined } from '@/Engine/Utils';

export async function createActor(params: IActorParams): Promise<IMesh> | never {
  const material: Material = await getMaterial(params);

  if (params.type === ActorType.plane) return createPlane(params, material);
  if (params.type === ActorType.sphere) return createSphere(params, material);
  if (params.type === ActorType.cube) return createCube(params, material);
  throw new Error('Cannot create Actor: unknown actor type');
}

async function getMaterial(params: IActorParams): Promise<Material> {
  let textures;
  if (isDefined(params.material.textures)) textures = await textureService.load(params.material).all();
  const material: Material = materialService.buildMaterial(params.material.type, params.material.params, textures);

  return material;
}

function createPlane({ width, height, widthSegments, heightSegments }: IActorParams, material: Material): IMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: IActorParams, material: Material): IMesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: IActorParams, material: Material): IMesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new BoxGeometry(w, h, depth, widthSegments, heightSegments, depthSegments), material);
}
