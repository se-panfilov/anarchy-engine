import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import type { TMaterials } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TModel3dPack, TModel3dParams } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';
import { isDefined } from '@/Engine/Utils';

export function createPrimitiveModel3dPack(params: TModel3dParams): TModel3dPack | never {
  const { primitiveType, material } = params;
  const pre: Omit<TModel3dPack, 'model'> = {
    url: '',
    animations: [],
    options: { shouldAddToScene: false, shouldAddToRegistry: true, isForce: false }
  };
  if (primitiveType === PrimitiveModel3dType.Plane) return { ...pre, model: createPlane(params, material.entity) };
  else if (primitiveType === PrimitiveModel3dType.Sphere) return { ...pre, model: createSphere(params, material.entity) };
  else if (primitiveType === PrimitiveModel3dType.Cube) return { ...pre, model: createCube(params, material.entity) };
  throw new Error(`Unknown primitive model type: "${primitiveType}"`);
}

function createPlane({ width, height, widthSegments, heightSegments }: TModel3dParams, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: TModel3dParams, material: TMaterials): Mesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TModel3dParams, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
  return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
}
