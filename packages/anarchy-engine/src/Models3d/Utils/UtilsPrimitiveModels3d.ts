import type { TAnyMaterialWrapper, TMaterials } from '@Anarchy/Engine/Material';
import type { TMeters } from '@Anarchy/Engine/Math';
import { meters } from '@Anarchy/Engine/Measurements/Utils';
import { PrimitiveModel3dType } from '@Anarchy/Engine/Models3d/Constants';
import type { TModel3dConfig, TModel3dParams, TModel3dResourceConfig, TRawModel3d } from '@Anarchy/Engine/Models3d/Models';
import type { TBoxGeometryParams, TPlaneGeometryParams, TSphereGeometryParams } from '@Anarchy/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function createPrimitiveModel3d(params: TModel3dParams): Mesh | never {
  if (!isPrimitiveModel3dSource(params.model3dSource)) throw new Error(`Model3d source is not a primitive model: "${String(params.model3dSource)}"`);
  const model3dSource: PrimitiveModel3dType = params.model3dSource;
  const material: TAnyMaterialWrapper | undefined = params.material;
  if (isNotDefined(material)) throw new Error(`Primitive model "${model3dSource}" has no material, but primitive models must have one`);

  if (isNotDefined(params.options)) throw new Error(`Primitive model "${model3dSource}" has no options`);

  if (model3dSource === PrimitiveModel3dType.Plane) return createPlane(params.options, material.entity);
  else if (model3dSource === PrimitiveModel3dType.Sphere) return createSphere(params.options, material.entity);
  else if (model3dSource === PrimitiveModel3dType.Cube) return createCube(params.options, material.entity);
  throw new Error(`Unknown primitive model type: "${model3dSource}"`);
}

function createPlane({ width, height, widthSegments, heightSegments }: TPlaneGeometryParams, material: TMaterials): Mesh {
  const w: TMeters | undefined = isDefined(width) ? meters(width) : undefined;
  const h: TMeters | undefined = isDefined(height) ? meters(height) : undefined;
  return new Mesh(new PlaneGeometry(w, h, widthSegments, heightSegments), material);
}

function createSphere({ radius, widthSegments, heightSegments }: TSphereGeometryParams, material: TMaterials): Mesh {
  const r: TMeters | undefined = isDefined(radius) ? meters(radius) : undefined;
  return new Mesh(new SphereGeometry(r, widthSegments, heightSegments), material);
}

function createCube({ width, height, depth, widthSegments, heightSegments, depthSegments }: TBoxGeometryParams, material: TMaterials): Mesh {
  const w: TMeters | undefined = isDefined(width) ? meters(width) : undefined;
  const h: TMeters | undefined = isDefined(height) ? meters(height) : undefined;
  const d: TMeters | undefined = isDefined(depth) ? meters(depth) : undefined;
  return new Mesh(new BoxGeometry(w, h, d, widthSegments, heightSegments, depthSegments), material);
}

export const isPrimitiveModel3dResourceConfig = (params: TModel3dResourceConfig): boolean => isPrimitiveModel3dSource(params.url);
export const isPrimitiveModel3dData = (params: TModel3dConfig | TModel3dParams): boolean => isPrimitiveModel3dSource(params.model3dSource);
export const isPrimitiveModel3dSource = (model3dSource: TRawModel3d | GLTF | PrimitiveModel3dType | string): model3dSource is PrimitiveModel3dType =>
  [...Object.values(PrimitiveModel3dType)].includes(model3dSource as PrimitiveModel3dType);
