import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TModel3dConfig, TModel3dParams, TModel3dResourceConfig, TRawModel3d } from '@/Engine/Models3d';
import { PrimitiveModel3dType } from '@/Engine/Models3d';
import type { TBoxGeometryProps, TPlaneGeometryProps, TSphereGeometryProps } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function createPrimitiveModel3d(params: TModel3dParams): Mesh | never {
  if (!isPrimitiveModel3dSource(params.model3dSource)) throw new Error(`Model3d source is not a primitive model: "${String(params.model3dSource)}"`);
  const model3dSource: PrimitiveModel3dType = params.model3dSource;
  const materialSource: TMaterialWrapper | undefined = params.materialSource;
  if (isNotDefined(materialSource)) throw new Error(`Primitive model "${model3dSource}" has no material, but primitive models must have one`);

  if (isNotDefined(params.options)) throw new Error(`Primitive model "${model3dSource}" has no options`);

  if (model3dSource === PrimitiveModel3dType.Plane) return createPlane(params.options, materialSource.entity);
  else if (model3dSource === PrimitiveModel3dType.Sphere) return createSphere(params.options, materialSource.entity);
  else if (model3dSource === PrimitiveModel3dType.Cube) return createCube(params.options, materialSource.entity);
  throw new Error(`Unknown primitive model type: "${model3dSource}"`);
}

function createPlane({ width, height, widthSegments, heightSegments }: TPlaneGeometryProps, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: TSphereGeometryProps, material: TMaterials): Mesh {
  const r: number | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TBoxGeometryProps, material: TMaterials): Mesh {
  const w: number | undefined = isDefined(width) ? meters(width) : undefined;
  const h: number | undefined = isDefined(height) ? meters(height) : undefined;
  const d: number | undefined = isDefined(depth) ? meters(depth) : undefined;
  return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
}

export const isPrimitiveModel3dResourceConfig = (params: TModel3dResourceConfig): boolean => isPrimitiveModel3dSource(params.url);
export const isPrimitiveModel3dData = (params: TModel3dConfig | TModel3dParams): boolean => isPrimitiveModel3dSource(params.model3dSource);
export const isPrimitiveModel3dSource = (model3dSource: TRawModel3d | GLTF | PrimitiveModel3dType | string): model3dSource is PrimitiveModel3dType =>
  [...Object.values(PrimitiveModel3dType)].includes(model3dSource as PrimitiveModel3dType);
