import type { Material } from 'three';

import { materialService } from '@/Engine/Material';
import type { IMesh, IParticlesParams } from '@/Engine/Particles/Models';
import { textureService } from '@/Engine/Texture';
import { isDefined } from '@/Engine/Utils';

export async function createActor(params: IParticlesParams): Promise<IMesh> | never {
  const material: Material = await getMaterial(params);

  // if (params.type === ActorType.plane) return createPlane(params, material);
  // if (params.type === ActorType.sphere) return createSphere(params, material);
  // if (params.type === ActorType.cube) return createCube(params, material);
  throw new Error('Cannot create Particles: unknown particles type');
}

async function getMaterial(params: IParticlesParams): Promise<Material> {
  let textures;
  if (isDefined(params.material.textures)) textures = await textureService.load(params.material).all();
  const material: Material = materialService.buildMaterial(params.material.type, params.material.params, textures);

  return material;
}
