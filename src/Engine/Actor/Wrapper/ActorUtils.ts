import type { Material } from 'three';
import { BoxGeometry, Mesh, MeshBasicMaterial, PlaneGeometry, SphereGeometry } from 'three';

import { ActorType } from '@/Engine/Actor/Constants';
import type { IActorParams, IMesh } from '@/Engine/Actor/Models';
import { materialService } from '@/Engine/Material';
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
  let material: Material;
  if (isDefined(textures)) material = materialService.buildMaterial(textures);
  else material = new MeshBasicMaterial(params.material.params);

  return material;
}

function createPlane({ width, height, widthSegments, heightSegments }: IActorParams, material: Material): IMesh {
  return new Mesh(new PlaneGeometry(width, height, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: IActorParams, material: Material): IMesh {
  return new Mesh(new SphereGeometry(radius, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: IActorParams, material: Material): IMesh {
  return new Mesh(new BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments), material);
}
