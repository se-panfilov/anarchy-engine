// import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';
//
// import type { TMaterials } from '@/Engine/Material';
// import { meters } from '@/Engine/Measurements/Utils';
import type { TModel3dPack, TModel3dParams, TModel3dResourceConfig } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';
// import { PrimitiveModel3dType } from '@/Engine/Models3d';
// import { TPrimitiveModel3dProps } from '@/Engine/Models3d/Models/TPrimitiveModel3dProps';
// import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';
// import { isDefined, isNotDefined } from '@/Engine/Utils';

// TODO 9.0.0. RESOURCES: remove this utils or fix?
// TODO CWP !!! more or less fix primitive models creation and fix TS errors
export function createPrimitiveModel3dPack(params: TModel3dParams): TModel3dPack | never {
  throw new Error(`debug ${JSON.stringify(params)}`);
  // const { primitive } = params;
  // if (!isDefined(primitive)) throw new Error(`Primitive model type is not defined`);
  //
  // const pre: Omit<TModel3dPack, 'model'> = {
  //   ...params,
  //   primitive,
  //   options: { shouldAddToScene: false, shouldAddToRegistry: true, isForce: false }
  // };
  //
  // if (isNotDefined(params.material)) throw new Error(`Material is must be defined for primitive models`);
  //
  // if (primitive.url === PrimitiveModel3dType.Plane) return { ...pre, model: createPlane(primitive, params.material.entity) };
  // else if (primitive.url === PrimitiveModel3dType.Sphere) return { ...pre, model: createSphere(primitive, params.material.entity) };
  // else if (primitive.url === PrimitiveModel3dType.Cube) return { ...pre, model: createCube(primitive, params.material.entity) };
  // throw new Error(`Unknown primitive model type: "${primitive.url}"`);
}

// function createPlane({ width, height, widthSegments, heightSegments }: TPlaneGeometryProps, material: TMaterials): Mesh {
//   const w: number | undefined = isDefined(width) ? meters(width) : undefined;
//   const h: number | undefined = isDefined(height) ? meters(height) : undefined;
//   return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
// }
//
// function createSphere({ radius, widthSegments, heightSegments }: TSphereGeometryProps, material: TMaterials): Mesh {
//   const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
//   return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
// }
//
// function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TBoxGeometryProps, material: TMaterials): Mesh {
//   const w: number | undefined = isDefined(width) ? meters(width) : undefined;
//   const h: number | undefined = isDefined(height) ? meters(height) : undefined;
//   const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
//   return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
// }

export const isPrimitiveModel3dConfig = (config: TModel3dResourceConfig): boolean => [...Object.values(PrimitiveModel3dType)].includes(config.url as PrimitiveModel3dType);
