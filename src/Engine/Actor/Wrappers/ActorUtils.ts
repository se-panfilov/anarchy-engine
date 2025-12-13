import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import type { TActorParams } from '@/Engine/Actor/Models';
import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TModel3dPack } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';
import { isDefined } from '@/Engine/Utils';

export function createPrimitiveModel3dPack(type: PrimitiveModel3dType, materialW: TMaterialWrapper, params: TActorParams): TModel3dPack | never {
  const pre: Omit<TModel3dPack, 'model'> = {
    url: '',
    animations: [],
    options: { shouldAddToScene: false, shouldAddToRegistry: true, isForce: false }
  };
  if (type === PrimitiveModel3dType.Plane) return { ...pre, model: createPlane(params, materialW.entity) };
  else if (type === PrimitiveModel3dType.Sphere) return { ...pre, model: createSphere(params, materialW.entity) };
  else if (type === PrimitiveModel3dType.Cube) return { ...pre, model: createCube(params, materialW.entity) };
  throw new Error(`Unknown primitive model type: "${type}"`);
}

function createPlane({ width, height, widthSegments, heightSegments }: TActorParams, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: TActorParams, material: TMaterials): Mesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TActorParams, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
  return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
}
