import { BoxGeometry, Mesh, PlaneGeometry, SphereGeometry } from 'three';

import type { TActorDependencies, TActorParams } from '@/Engine/Actor/Models';
import type { TMaterials, TMaterialWrapper } from '@/Engine/Material';
import { meters } from '@/Engine/Measurements/Utils';
import type { TModel3dLoadResult } from '@/Engine/Models3d';
import { Model3dType } from '@/Engine/Models3d';
import { isDefined } from '@/Engine/Utils';

export async function createActorModel3d(params: TActorParams, { materialTextureService }: Pick<TActorDependencies, 'materialTextureService'>): Promise<TModel3dLoadResult> | never {
  // TODO AWAIT: could speed up by not awaiting material loading (return promise of an actor)
  const materialWrapper: TMaterialWrapper = await materialTextureService.createAsync(params.material);

  if (!Object.values(Model3dType).includes(params.model3d.url as Model3dType)) throw new Error('Cannot create Actor: unknown actor type');

  let result: TModel3dLoadResult = {
    url: params.model3d.url,
    animations: [],
    model: undefined,
    options: { shouldAddToScene: false, shouldSaveToRegistry: true, isForce: false }
  } as unknown as TModel3dLoadResult;
  if ((params.model3d.url as Model3dType) === Model3dType.Plane) result = { ...result, model: createPlane(params, materialWrapper.entity) };
  else if ((params.model3d.url as Model3dType) === Model3dType.Sphere) result = { ...result, model: createSphere(params, materialWrapper.entity) };
  else if ((params.model3d.url as Model3dType) === Model3dType.Cube) result = { ...result, model: createCube(params, materialWrapper.entity) };
  return result;
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
