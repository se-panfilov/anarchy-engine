// import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';
//
// import type { TMaterials } from '@/Engine/Material';
// import { meters } from '@/Engine/Measurements/Utils';
// import type { TModel3dPrimitivePack, TModel3dPrimitiveParams, TPrimitiveProps } from '@/Engine/Models3d';
// import { PrimitiveModel3dType } from '@/Engine/Models3d';
// import { isDefined } from '@/Engine/Utils';

import type { TModel3dPrimitivePack, TModel3dPrimitiveParams } from '@/Engine/Models3d';
import { isDefined } from '@/Engine/Utils';

// TODO MODELS: enable all the commented out code here!
export function createPrimitiveModel3dPack(params: TModel3dPrimitiveParams): TModel3dPrimitivePack | never {
  // const { primitive, material } = params;
  const { primitive } = params;
  if (!isDefined(primitive)) throw new Error(`Primitive model type is not defined`);

  // const pre: Omit<TModel3dPrimitivePack, 'model'> = {
  //   ...params,
  //   primitive,
  //   options: { shouldAddToScene: false, shouldAddToRegistry: true, isForce: false }
  // };
  // TODO MODELS: fix material type
  // if (primitive.type === PrimitiveModel3dType.Plane) return { ...pre, model: createPlane(primitive, material.entity) };
  // else if (primitive.type === PrimitiveModel3dType.Sphere) return { ...pre, model: createSphere(primitive, material.entity) };
  // else if (primitive.type === PrimitiveModel3dType.Cube) return { ...pre, model: createCube(primitive, material.entity) };
  throw new Error(`Unknown primitive model type: "${primitive.type}"`);
}

// function createPlane({ width, height, widthSegments, heightSegments }: TPrimitiveProps, material: TMaterials): Mesh {
//   const w: number | undefined = isDefined(width) ? meters(width) : undefined;
//   const h: number | undefined = isDefined(height) ? meters(height) : undefined;
//   return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
// }
//
// function createSphere({ radius, widthSegments, heightSegments }: TPrimitiveProps, material: TMaterials): Mesh {
//   const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
//   return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
// }
//
// function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TPrimitiveProps, material: TMaterials): Mesh {
//   const w: number | undefined = isDefined(width) ? meters(width) : undefined;
//   const h: number | undefined = isDefined(height) ? meters(height) : undefined;
//   const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
//   return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
// }
